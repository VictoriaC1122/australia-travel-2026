import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = ["index.html", "styles.css", "script.js", "robots.txt", "sitemap.xml", ".github/workflows/deploy-pages.yml"];

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
  const matches = [...html.matchAll(/(?:src|href)="\.\/([^"?]+)(?:\?[^"]*)?"/g)];

  matches.forEach((match) => {
    const assetPath = match[1];
    assert(existsSync(path.join(root, assetPath)), `Missing referenced asset: ${assetPath}`);
  });

  assert(html.includes('href="./styles.css?v='), "index.html must keep a relative styles.css path with a cache-busting query");
  assert(html.includes('src="./script.js?v='), "index.html must keep a relative script.js path with a cache-busting query");
  assert(!html.match(/(?:src|href)="\/(?!\/)/), "index.html should not use root-absolute internal asset paths");
  assert(html.includes('rel="canonical" href="https://victoriac1122.github.io/australia-travel-2026/"'), "index.html should keep the canonical GitHub Pages URL");
  assert(html.includes('property="og:image" content="https://victoriac1122.github.io/australia-travel-2026/assets/opera-house-harbour.jpg"'), "index.html should define an absolute og:image");
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

function checkSeoSupportFiles() {
  const robots = readFileSync(path.join(root, "robots.txt"), "utf8");
  const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");

  assert(robots.includes("Sitemap: https://victoriac1122.github.io/australia-travel-2026/sitemap.xml"), "robots.txt should reference the GitHub Pages sitemap");
  assert(sitemap.includes("<loc>https://victoriac1122.github.io/australia-travel-2026/</loc>"), "sitemap.xml should include the production site URL");
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
  checkSeoSupportFiles();
  console.log("Build check passed.");
}

run();
