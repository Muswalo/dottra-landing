import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const siteRoot = resolve(__dirname, '..')
const publicDir = resolve(siteRoot, 'public')
const outputDir = resolve(publicDir, 'og')
const width = 1200
const height = 630
const blue = '#464bd6'
const white = '#ffffff'

type OgPage = {
  slug: string
  label: string
  headline: string[]
  summary: string[]
}

const pages: OgPage[] = [
  {
    slug: 'home',
    label: 'Dottra',
    headline: ['There when money', 'runs thin.'],
    summary: ['Download on Google Play.', 'Support within reach before salary or sponsorship lands.'],
  },
  {
    slug: 'privacy',
    label: 'Privacy',
    headline: ['Privacy', 'Policy'],
    summary: ['How Dottra handles personal information.', 'Always available at dottra.co/privacy.'],
  },
  {
    slug: 'terms',
    label: 'Legal',
    headline: ['Terms of', 'Service'],
    summary: ['The terms that apply when using Dottra.', 'Always available at dottra.co/terms.'],
  },
  {
    slug: 'cookies',
    label: 'Privacy',
    headline: ['Cookie', 'Policy'],
    summary: ['How Dottra explains cookies and similar tools.', 'Always available at dottra.co/cookies.'],
  },
  {
    slug: 'licences',
    label: 'Legal',
    headline: ['Licences'],
    summary: ['Open-source and product licence information.', 'Always available at dottra.co/licences.'],
  },
  {
    slug: 'about',
    label: 'Company',
    headline: ['About', 'Dottra'],
    summary: ['The company behind support within reach.', 'Built for salaried workers and sponsored students in Zambia.'],
  },
  {
    slug: 'support',
    label: 'Support',
    headline: ['Dottra', 'Support'],
    summary: ['Get help with your account, app access, verification, or activity.', 'Start in the app when you can.'],
  },
  {
    slug: 'contact',
    label: 'Contact',
    headline: ['Contact', 'Dottra'],
    summary: ['Company, legal, partnership, and general enquiries.', 'Reach Dottra at dottra.co/contact.'],
  },
]

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderLines(lines: string[], className: string, x: number, y: number, lineHeight: number) {
  return lines
    .map((line, index) => `<text class="${className}" x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</text>`)
    .join('\n')
}

function renderSvg(page: OgPage) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${blue}"/>
  <rect x="72" y="66" width="118" height="118" rx="24" fill="${white}"/>
  <text x="218" y="113" class="brand">Dottra</text>
  <text x="218" y="151" class="site">dottra.co</text>
  <text x="80" y="256" class="label">${escapeXml(page.label)}</text>
  ${renderLines(page.headline, 'headline', 78, 338, 82)}
  ${renderLines(page.summary, 'summary', 82, 526, 40)}
  <style>
    text {
      font-family: Arial, Helvetica, sans-serif;
      dominant-baseline: alphabetic;
    }

    .brand {
      fill: ${white};
      font-size: 42px;
      font-weight: 800;
    }

    .site {
      fill: ${white};
      font-size: 24px;
      font-weight: 700;
      opacity: 0.82;
    }

    .label {
      fill: ${white};
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 4px;
      text-transform: uppercase;
      opacity: 0.78;
    }

    .headline {
      fill: ${white};
      font-size: 72px;
      font-weight: 900;
    }

    .summary {
      fill: ${white};
      font-size: 28px;
      font-weight: 700;
      opacity: 0.86;
    }
  </style>
</svg>
`
}

function run(command: string, args: string[]) {
  return new Promise<void>((resolvePromise, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'ignore', 'pipe'],
    })
    let stderr = ''

    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString()
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolvePromise()
        return
      }

      reject(new Error(`${command} exited with code ${code}${stderr ? `: ${stderr}` : ''}`))
    })
  })
}

async function main() {
  await mkdir(outputDir, { recursive: true })

  const logoPath = resolve(publicDir, 'dottra-symbol-light.png')

  for (const page of pages) {
    const svgPath = resolve(outputDir, `${page.slug}.svg`)
    const basePngPath = resolve(outputDir, `${page.slug}.base.png`)
    const pngPath = resolve(outputDir, `${page.slug}.png`)

    await writeFile(svgPath, renderSvg(page))
    await run('convert', ['-background', 'none', '-density', '144', svgPath, '-resize', `${width}x${height}!`, basePngPath])
    await run('convert', [
      basePngPath,
      '(',
      logoPath,
      '-resize',
      '74x53',
      ')',
      '-geometry',
      '+94+97',
      '-composite',
      pngPath,
    ])
    await rm(basePngPath, { force: true })
  }

  await copyFile(resolve(outputDir, 'home.png'), resolve(publicDir, 'og-image.png'))
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
