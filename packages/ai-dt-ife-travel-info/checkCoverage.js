// checkCoverage.js
const fs = require("fs");

const coverageThresholds = {
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
};

const coveragePath = "coverage/coverage-summary.json";

try {
  const coverage = JSON.parse(fs.readFileSync(coveragePath, "utf-8"));

  function checkThreshold(name, value) {
    if (value < coverageThresholds[name]) {
      console.error(
        `Jest: "global" coverage threshold for ${name} (${coverageThresholds[name]}%) not met: ${value}%`
      );
      process.exit(1);
    }
  }

  checkThreshold("statements", coverage.total.statements.pct);
  checkThreshold("branches", coverage.total.branches.pct);
  checkThreshold("lines", coverage.total.lines.pct);
  checkThreshold("functions", coverage.total.functions.pct);
} catch (error) {
  console.error(`Error reading coverage file: ${error.message}`);
  process.exit(1);
}
