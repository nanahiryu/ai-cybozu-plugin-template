#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const packageRoot = path.join(__dirname, "..");
const projectRoot = process.cwd();

// コピーしないもの
const excludes = [
  "node_modules",
  "dist",
  "key",
  "bin",
  ".git",
  ".env",
  "pnpm-lock.yaml",
  "package-lock.json",
];

function copyDir(src, dest, excludeList) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (excludeList.includes(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath, []);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const command = process.argv[2];

if (command === "init") {
  console.log("Initializing kintone plugin template...\n");

  copyDir(packageRoot, projectRoot, excludes);

  console.log("Done! Files copied:\n");

  const entries = fs.readdirSync(packageRoot, { withFileTypes: true });
  entries
    .filter((e) => !excludes.includes(e.name))
    .forEach((e) => {
      const suffix = e.isDirectory() ? "/" : "";
      console.log(`  ${e.name}${suffix}`);
    });

  console.log("\nNext steps:");
  console.log("  1. pnpm install");
  console.log("  2. Edit plugin/manifest.json");
} else {
  console.log("Usage:");
  console.log("  1. pnpm add -D @nanahiryu/create-ai-kintone-plugin");
  console.log("  2. pnpm exec create-ai-kintone-plugin init");
}
