/**
 * Production server for Render and local `npm start`.
 * Binds all interfaces and uses Render's PORT when present.
 */
const { spawnSync } = require("child_process");
const path = require("path");

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";
const runner = path.join(__dirname, "run-with-node20.cjs");
const nextBin = "next/dist/bin/next";

const result = spawnSync(
  process.execPath,
  [runner, nextBin, "start", "--hostname", hostname, "--port", String(port)],
  {
    stdio: "inherit",
    env: { ...process.env, PORT: String(port) },
    windowsHide: true,
  }
);

process.exit(result.status ?? 1);
