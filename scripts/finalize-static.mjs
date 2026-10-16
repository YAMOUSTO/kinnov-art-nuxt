// Post-generation fixup for the static output.
//
// `nuxt generate` writes two bare SPA fallback shells — 404.html and 200.html —
// that contain no <head> metadata at all: they are the app shell, and the real
// error UI (error.vue) only appears once the client bundle hydrates. That leaves
// a non-existent URL returning HTML with no <title> and no robots directive for
// anything that does not run JavaScript.
//
// This script injects a fallback title + `noindex` into 404.html only. The title
// is French because French is the default locale; once the app hydrates,
// error.vue replaces it with the correctly localized one. 200.html is left alone
// on purpose — it is the SPA fallback a host may serve with a 200 status, so
// marking it noindex could suppress a genuinely valid page.
//
// Idempotent: safe to run repeatedly. Runs as part of `npm run generate`.

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, '.output', 'public', '404.html')

const TITLE = `<title>Page introuvable | Kinnov'art</title>`
const ROBOTS = `<meta name="robots" content="noindex">`
const MARKER = 'data-static-404'

if (!existsSync(target)) {
  // Fail instead of skipping: a silent skip shipped a 404.html without its
  // title/noindex once, and let a build pass whose publish directory did not
  // exist. The expected directory comes from `nitro.preset = 'static'`
  // (nuxt.config.ts), which is what writes `.output/public`.
  console.error(
    '[finalize-static] .output/public/404.html not found — the static output is missing or went to another directory.\n' +
      '  Check `nitro.preset` in nuxt.config.ts (pinned to "static" → .output/public)\n' +
      '  and the `publish` setting in netlify.toml. Refusing to continue.'
  )
  process.exit(1)
}

let html = await readFile(target, 'utf8')

if (html.includes(MARKER)) {
  console.log('[finalize-static] 404.html already finalized.')
  process.exit(0)
}

const head = html.indexOf('<head>')
if (head === -1) {
  console.warn('[finalize-static] 404.html has no <head> - skipping.')
  process.exit(0)
}

const inject = `<head><!-- ${MARKER} -->${TITLE}${ROBOTS}`
html = html.slice(0, head) + inject + html.slice(head + '<head>'.length)

await writeFile(target, html, 'utf8')
console.log('[finalize-static] injected title + noindex into 404.html')
