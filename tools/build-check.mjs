import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = ["index.html", "styles.css", "script.js", ".github/workflows/deploy-pages.yml"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function checkRequiredFiles() {
  requiredFiles.forEach((file) => {
    assert(existsSync(path.join(root, file)), `Missing required file: ${file}`);
  });
}

function checkScriptSyntax() {
  execFileSync("node", ["--check", "script.js"], {
    cwd: root,
    stdio: "inherit",
  });
}

function checkHtmlAssetRefs() {
  const html = readFileSync(path.join(root, "index.html"), "utf8");
  const matches = [...html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)];

  matches.forEach((match) => {
    const assetPath = match[1];
    assert(existsSync(path.join(root, assetPath)), `Missing referenced asset: ${assetPath}`);
  });

  assert(html.includes('href="./styles.css"'), "index.html must keep a relative styles.css path");
  assert(html.includes('src="./script.js"'), "index.html must keep a relative script.js path");
  assert(!html.match(/(?:src|href)="\/(?!\/)/), "index.html should not use root-absolute internal asset paths");
}

function checkScriptAssetRefs() {
  const script = readFileSync(path.join(root, "script.js"), "utf8");
  const matches = [...script.matchAll(/"\.\/([^"]+\.(?:svg|png|jpg|jpeg|webp|mjs|js|css))"/g)];

  matches.forEach((match) => {
    const assetPath = match[1];
    assert(existsSync(path.join(root, assetPath)), `Missing script-referenced asset: ${assetPath}`);
  });
}

function checkCssAssetRefs() {
  const css = readFileSync(path.join(root, "styles.css"), "utf8");
  const matches = [...css.matchAll(/url\("\.\/([^"]+)"\)/g)];

  matches.forEach((match) => {
    const assetPath = match[1];
    assert(existsSync(path.join(root, assetPath)), `Missing CSS-referenced asset: ${assetPath}`);
  });

  assert(!css.match(/url\("\/(?!\/)/), "styles.css should not use root-absolute internal asset paths");
}

function checkPagesWorkflow() {
  const workflow = readFileSync(path.join(root, ".github/workflows/deploy-pages.yml"), "utf8");
  assert(workflow.includes("branches:"), "GitHub Pages workflow should deploy from a branch trigger");
  assert(workflow.includes("path: ."), "GitHub Pages workflow should keep deploying the project root");
}

function checkPagePanels() {
  const html = readFileSync(path.join(root, "index.html"), "utf8");
  const requiredPanels = ["overview", "flights", "stays", "itinerary", "map", "budget", "souvenirs", "notes"];

  requiredPanels.forEach((panel) => {
    assert(html.includes(`data-page-panel="${panel}"`), `Missing page panel: ${panel}`);
    assert(html.includes(`data-page-link="${panel}"`), `Missing page link: ${panel}`);
  });
}

function run() {
  checkRequiredFiles();
  checkScriptSyntax();
  checkHtmlAssetRefs();
  checkScriptAssetRefs();
  checkCssAssetRefs();
  checkPagesWorkflow();
  checkPagePanels();
  console.log("Build check passed.");
}

run();
