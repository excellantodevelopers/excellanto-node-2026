/**
 * Runs the Sanity CLI with Node 18+, even when `npx`/`npm` is bound to Node 16.
 * Vite 6 needs crypto.getRandomValues, which is missing on Node 16.
 */
const { spawnSync, execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const MIN_MAJOR = 18;

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const parsed = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) parsed[key] = value;
  }
  return parsed;
}

function applyEnvFiles() {
  const parent = readEnvFile(path.join(__dirname, "..", ".env"));
  const local = readEnvFile(path.join(__dirname, ".env"));
  for (const [key, value] of Object.entries({ ...parent, ...local })) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function nodeMajor(bin) {
  try {
    const version = execFileSync(bin, ["-p", "process.versions.node"], {
      encoding: "utf8",
    }).trim();
    return parseInt(version.split(".")[0], 10);
  } catch {
    return 0;
  }
}

function resolveNode() {
  const candidates = [
    process.env.NODE_BINARY,
    "C:\\Program Files\\nodejs\\node.exe",
    process.execPath,
  ].filter(Boolean);

  for (const bin of candidates) {
    if (fs.existsSync(bin) && nodeMajor(bin) >= MIN_MAJOR) {
      return bin;
    }
  }

  return null;
}

const nodeBin = resolveNode();
if (!nodeBin) {
  console.error(
    "Sanity Studio needs Node.js 18+ (20 recommended). This shell is using Node " +
      process.versions.node +
      ".\nUse Node 20 from C:\\Program Files\\nodejs\\node.exe"
  );
  process.exit(1);
}

applyEnvFiles();

const sanityBin = path.join(__dirname, "node_modules", "@sanity", "cli", "bin", "sanity");
const result = spawnSync(nodeBin, [sanityBin, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
  cwd: __dirname,
  windowsHide: true,
});

process.exit(result.status ?? 1);
