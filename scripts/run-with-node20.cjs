/**
 * Runs Next.js (or any CLI) with Node 18+, even when `npm` is bound to Node 16.
 */
const { spawnSync, execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const MIN_MAJOR = 18;

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
    "Next.js needs Node.js 18.18+ (or 20+). This shell is using Node " +
      process.versions.node +
      ".\nInstall or use Node 20 from C:\\Program Files\\nodejs\\node.exe"
  );
  process.exit(1);
}

const [relBin, ...rest] = process.argv.slice(2);
const cli = path.isAbsolute(relBin)
  ? relBin
  : path.join(__dirname, "..", "node_modules", relBin);

const result = spawnSync(nodeBin, [cli, ...rest], {
  stdio: "inherit",
  env: process.env,
  windowsHide: true,
});

process.exit(result.status ?? 1);
