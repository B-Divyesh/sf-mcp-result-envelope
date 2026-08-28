import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const site = resolve(root, "dist/site");
const downloads = resolve(site, "downloads");
const source = await readFile(resolve(site, "index.html"), "utf8");

const routes = {
  demo: {
    title: "Demo — Result Envelope",
    description: "Inspect 12 sample orders as a bounded result envelope in your browser.",
    path: "/demo"
  },
  inspect: {
    title: "Inspector — Result Envelope",
    description: "Build a bounded result envelope from JSON in your browser.",
    path: "/inspect"
  },
  privacy: {
    title: "Privacy — Result Envelope",
    description: "Read how Result Envelope handles data in the browser, package, and CLI.",
    path: "/privacy"
  },
  terms: {
    title: "Terms — Result Envelope",
    description: "Read the terms for using Result Envelope.",
    path: "/terms"
  }
};

function routeHtml({ title, description, path }) {
  const url = `https://mcp-result-envelope.sociobot.in${path}`;
  return source
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`);
}

for (const [directory, metadata] of Object.entries(routes)) {
  const destination = resolve(site, directory);
  await mkdir(destination, { recursive: true });
  await writeFile(resolve(destination, "index.html"), routeHtml(metadata));
}

await writeFile(resolve(site, "404.html"), routeHtml({
  title: "Page not found — Result Envelope",
  description: "Return to the Result Envelope home page.",
  path: "/404"
}));

await mkdir(downloads, { recursive: true });
execFileSync("npm", ["pack", "--pack-destination", downloads], { cwd: root, stdio: "inherit" });
