import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { Database, Json } from '../src/types/database.types'

type PolicyKey = Database['public']['Enums']['policy_document_key']
type PublishedPolicyRow = Database['public']['Views']['published_policies_v']['Row']

type PublishedPolicySection = {
  id: string
  title: string
  body: string[]
  sortOrder: number
}

type PublishedPolicy = {
  key: PolicyKey
  title: string
  eyebrow: string
  summary: string
  updatedAt: string
  effectiveAt: string | null
  footerNote: string | null
  sections: PublishedPolicySection[]
}

type PageLink = {
  label: string
  href: string
}

type StaticPage = {
  path: string
  title: string
  eyebrow: string
  summary: string
  sections: Array<{
    title: string
    body: string[]
  }>
  actions?: PageLink[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const siteRoot = resolve(__dirname, '..')
const repoRoot = resolve(siteRoot, '..')
const workspaceRoot = resolve(siteRoot, '..', '..')
const publicDir = resolve(siteRoot, 'public')
const pageOutputDir = siteRoot
const siteUrl = readSiteUrl()
const shareText = encodeURIComponent('Dottra is there when money runs thin.')
const shareUrl = encodeURIComponent(siteUrl)
const socialLinks: Array<{
  label: string
  href: string
  icon: IconType
}> = [
  {
    label: 'Share on X',
    href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    icon: FaXTwitter,
  },
  {
    label: 'Share on WhatsApp',
    href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    icon: FaWhatsapp,
  },
  {
    label: 'Share on LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    icon: FaLinkedinIn,
  },
]

const policyPages: Array<{
  key: PolicyKey
  path: string
  fallbackTitle: string
  fallbackSummary: string
}> = [
  {
    key: 'privacy',
    path: 'privacy',
    fallbackTitle: 'Privacy Policy',
    fallbackSummary: 'The latest privacy policy has not been published yet.',
  },
  {
    key: 'terms',
    path: 'terms',
    fallbackTitle: 'Terms of Service',
    fallbackSummary: 'The latest terms of service have not been published yet.',
  },
  {
    key: 'cookies',
    path: 'cookies',
    fallbackTitle: 'Cookie Policy',
    fallbackSummary: 'The latest cookie policy has not been published yet.',
  },
  {
    key: 'licences',
    path: 'licences',
    fallbackTitle: 'Licences',
    fallbackSummary: 'The latest licence information has not been published yet.',
  },
]

const staticPages: StaticPage[] = [
  {
    path: 'about',
    title: 'About Dottra',
    eyebrow: 'Company',
    summary:
      'Dottra Lending Services Limited builds practical financial access tools for salaried workers and government-sponsored students in Zambia.',
    sections: [
      {
        title: 'The company behind the app',
        body: [
          'Dottra is built around a simple idea: when money runs thin before salary or sponsorship lands, people should have a clear place to turn.',
          'The product focuses on transparency, account visibility, and mobile access, so users can see what is available and understand what comes next.',
        ],
      },
      {
        title: 'Who Dottra serves',
        body: [
          'Dottra is designed for salaried workers and government-sponsored students in Zambia whose income or sponsorship arrives in cycles.',
          'The app helps users manage tight moments between those cycles without having to start from zero every time.',
        ],
      },
    ],
    actions: [
      { label: 'Download the app', href: 'https://play.google.com/store/apps/details?id=com.dottra.app' },
      { label: 'Get support', href: '/support/' },
    ],
  },
  {
    path: 'support',
    title: 'Dottra Support',
    eyebrow: 'Support',
    summary:
      'Get help with your Dottra account, app access, verification, activity, or anything that does not look right.',
    sections: [
      {
        title: 'Start in the app when you can',
        body: [
          'For account-specific help, open Dottra and use the support option from your account. That is the best route because it connects your request to the account you are asking about.',
          'Use app support for questions about your balance, account activity, verification, access, or anything that does not look right.',
        ],
      },
      {
        title: 'If you cannot access the app',
        body: [
          'Email support@dottra.co with a short description of the issue and the phone number or email address connected to your Dottra account.',
          'Do not send your password, transaction PIN, one-time code, card details, or full identity documents by email.',
        ],
      },
      {
        title: 'What to include',
        body: [
          'Tell us what you were trying to do, what happened, and when it happened. Screenshots can help if they do not reveal private codes or sensitive documents.',
          'If the issue is urgent because you believe your account is being accessed by someone else, say that clearly at the start of the message.',
        ],
      },
      {
        title: 'Stay safe',
        body: [
          'Dottra will not ask you to share your password, transaction PIN, or one-time code by email, social media, or phone call.',
          'Only use Dottra through the official app and the links on this website.',
        ],
      },
    ],
    actions: [
      { label: 'Email support', href: 'mailto:support@dottra.co' },
      { label: 'Download the app', href: 'https://play.google.com/store/apps/details?id=com.dottra.app' },
    ],
  },
  {
    path: 'contact',
    title: 'Contact Dottra',
    eyebrow: 'Company contact',
    summary:
      'For company, legal, partnership, and general enquiries about Dottra Lending Services Limited.',
    sections: [
      {
        title: 'Company enquiries',
        body: [
          'For business, partnership, media, legal, or general company enquiries, email hello@dottra.co.',
          'If your question is about your personal Dottra account, use the support page or the support option inside the app instead.',
        ],
      },
      {
        title: 'Account support goes through support',
        body: [
          'The contact inbox is not the fastest place for account-specific help. For account access, verification, balance, activity, or security issues, start from the support page.',
          'Never include your password, transaction PIN, one-time code, or full identity documents in a general contact email.',
        ],
      },
      {
        title: 'Company details',
        body: [
          'Dottra is operated by Dottra Lending Services Limited in Zambia.',
          'The Dottra app is currently available on Google Play. Dottra is not yet available on the Apple App Store.',
        ],
      },
    ],
    actions: [
      { label: 'Email Dottra', href: 'mailto:hello@dottra.co' },
      { label: 'Get account support', href: '/support/' },
    ],
  },
]

function readSiteUrl() {
  return (
    process.env.SITE_URL ||
    process.env.VITE_SITE_URL ||
    process.env.EXPO_PUBLIC_SITE_URL ||
    'https://dottra.co'
  ).replace(/\/+$/, '')
}

async function loadEnvFiles() {
  const envPaths = [
    resolve(workspaceRoot, '.env'),
    resolve(workspaceRoot, '.env.local'),
    resolve(repoRoot, '.env'),
    resolve(repoRoot, '.env.local'),
    resolve(siteRoot, '.env'),
    resolve(siteRoot, '.env.local'),
  ]

  for (const envPath of envPaths) {
    try {
      const contents = await readFile(envPath, 'utf8')
      parseEnv(contents)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
    }
  }
}

function parseEnv(contents: string) {
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()
    const value = rawValue.replace(/^['"]|['"]$/g, '')

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

function getSupabaseConfig() {
  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY

  return url && key ? { url: url.replace(/\/+$/, ''), key } : null
}

async function fetchPublishedPolicy(key: PolicyKey): Promise<PublishedPolicy | null> {
  const config = getSupabaseConfig()

  if (!config) {
    console.warn(`Skipping ${key}: Supabase URL or publishable key is not configured.`)
    return null
  }

  const query = new URL(`${config.url}/rest/v1/published_policies_v`)
  query.searchParams.set('policy_key', `eq.${key}`)
  query.searchParams.set('select', '*')

  const response = await fetch(query, {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
    },
  })

  if (!response.ok) {
    console.warn(`Skipping ${key}: Supabase returned ${response.status}.`)
    return null
  }

  const rows = (await response.json()) as PublishedPolicyRow[]
  const row = rows[0]

  return row ? mapPublishedPolicyRow(row) : null
}

function isRecord(value: Json | null | undefined): value is Record<string, Json | undefined> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readRequiredString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Published policy ${fieldName} is missing`)
  }

  return value
}

function readOptionalString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}

function readRequiredNumber(value: unknown, fieldName: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Published policy ${fieldName} is missing`)
  }

  return value
}

function readStringArray(value: unknown, fieldName: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Published policy ${fieldName} is malformed`)
  }

  const values = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)

  if (values.length !== value.length || values.length === 0) {
    throw new Error(`Published policy ${fieldName} is malformed`)
  }

  return values
}

function mapPublishedPolicySection(value: Json): PublishedPolicySection {
  if (!isRecord(value)) {
    throw new Error('Published policy section is malformed')
  }

  return {
    id: readRequiredString(value.id, 'section id'),
    title: readRequiredString(value.title, 'section title'),
    body: readStringArray(value.body, 'section body'),
    sortOrder: readRequiredNumber(value.sortOrder, 'section sort order'),
  }
}

function mapPublishedPolicySections(sections: PublishedPolicyRow['sections']): PublishedPolicySection[] {
  if (!Array.isArray(sections)) {
    throw new Error('Published policy sections are unavailable')
  }

  return sections
    .map(mapPublishedPolicySection)
    .sort((first, second) => first.sortOrder - second.sortOrder)
}

function mapPublishedPolicyRow(row: PublishedPolicyRow): PublishedPolicy {
  return {
    key: readRequiredString(row.policy_key, 'key') as PolicyKey,
    title: readRequiredString(row.title, 'title'),
    eyebrow: readRequiredString(row.eyebrow, 'eyebrow'),
    summary: readRequiredString(row.summary, 'summary'),
    updatedAt: readRequiredString(row.updated_at ?? row.published_at ?? row.effective_at, 'updated timestamp'),
    effectiveAt: readOptionalString(row.effective_at),
    footerNote: readOptionalString(row.footer_note),
    sections: mapPublishedPolicySections(row.sections),
  }
}

function formatDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function absoluteUrl(path: string): string {
  return `${siteUrl}/${path.replace(/^\/+|\/+$/g, '')}/`
}

function renderHead(input: {
  title: string
  description: string
  path: string
}) {
  const pageUrl = absoluteUrl(input.path)
  const ogImage = `${siteUrl}/og/${input.path.replace(/^\/+|\/+$/g, '')}.png`
  const title = `${input.title} | Dottra`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(input.description)}" />
    <link rel="canonical" href="${pageUrl}" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="apple-touch-icon" href="/apple-icon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <link rel="stylesheet" href="/static-page.css" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Dottra" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(input.description)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:secure_url" content="${ogImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(input.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body>`
}

function renderHeader() {
  return `<main class="page-shell">
      <header class="site-header">
        <a class="brand" href="/">
          <img src="/dottra-symbol-light.png" alt="" />
          <span>Dottra</span>
        </a>
      </header>`
}

function renderIcon(icon: IconType): string {
  return renderToStaticMarkup(createElement(icon, { 'aria-hidden': true }))
}

function renderSocialLinks(): string {
  return socialLinks
    .map((item) => `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(item.label)}">${renderIcon(item.icon)}</a>`)
    .join('')
}

function renderFooter() {
  return `    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand-block">
          <a class="footer-brand" href="/">
            <img src="/dottra-symbol-dark.png" alt="" />
            <span>Dottra</span>
          </a>
          <p class="footer-copy">Support within reach before salary or sponsorship lands.</p>
        </div>
        <div class="footer-column">
          <h2>Download</h2>
          <div class="footer-store-links">
            <a href="https://play.google.com/store/apps/details?id=com.dottra.app">Google Play</a>
            <span>App Store coming soon</span>
          </div>
          <span>Not yet available on the Apple App Store.</span>
        </div>
        <div class="footer-column">
          <h2>Share</h2>
          <div class="social-links" aria-label="Share Dottra">
            ${renderSocialLinks()}
          </div>
        </div>
        <div class="footer-column">
          <h2>Legal</h2>
          <a href="/terms/">Terms</a>
          <a href="/privacy/">Privacy</a>
          <a href="/cookies/">Cookies</a>
        </div>
        <div class="footer-column">
          <h2>Company</h2>
          <a href="/about/">About</a>
          <a href="/support/">Support</a>
          <a href="/contact/">Contact</a>
          <span>Dottra Lending Services Limited</span>
          <span>Zambia</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Dottra Lending Services Limited.</span>
      </div>
    </footer>
  </body>
</html>`
}

function renderPolicyPage(
  page: (typeof policyPages)[number],
  policy: PublishedPolicy | null,
) {
  const title = policy?.title ?? page.fallbackTitle
  const summary = policy?.summary ?? page.fallbackSummary
  const eyebrow = policy?.eyebrow ?? 'Policy'
  const updatedAt = policy ? formatDate(policy.updatedAt) : null
  const sections = policy?.sections.map((section) => ({
    title: section.title,
    body: section.body,
  })) ?? [
    {
      title: 'Policy unavailable',
      body: [
        'This policy has not been published yet. Once a published version exists in Dottra policy records, this static page will be generated with that content.',
      ],
    },
  ]

  return renderPage({
    path: page.path,
    title,
    eyebrow,
    summary,
    updatedAt,
    sections,
    footerNote: policy?.footerNote ?? null,
  })
}

function renderPage(input: {
  path: string
  title: string
  eyebrow: string
  summary: string
  updatedAt?: string | null
  sections: Array<{ title: string; body: string[] }>
  footerNote?: string | null
  actions?: PageLink[]
}) {
  const sectionsHtml = input.sections
    .map((section) => `<section class="section">
          <h2>${escapeHtml(section.title)}</h2>
          <div class="copy">
            ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n            ')}
          </div>
        </section>`)
    .join('\n')
  const actionsHtml = input.actions?.length
    ? `<div class="action-row">${input.actions
        .map((action, index) => `<a class="button${index > 0 ? ' button-secondary' : ''}" href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>`)
        .join('')}</div>`
    : ''
  const footerNoteHtml = input.footerNote
    ? `<section class="section"><div class="copy"><p>${escapeHtml(input.footerNote)}</p></div></section>`
    : ''

  return `${renderHead({
    title: input.title,
    description: input.summary,
    path: input.path,
  })}
    ${renderHeader()}
      <section class="hero">
        <p class="eyebrow">${escapeHtml(input.eyebrow)}</p>
        <h1>${escapeHtml(input.title)}</h1>
        <p class="summary">${escapeHtml(input.summary)}</p>
        ${input.updatedAt ? `<p class="updated">Last updated ${escapeHtml(input.updatedAt)}</p>` : ''}
        ${actionsHtml}
      </section>
      <div class="content">
        ${sectionsHtml}
        ${footerNoteHtml}
      </div>
${renderFooter()}`
}

async function writePage(path: string, html: string) {
  const outputDir = resolve(pageOutputDir, path)
  await mkdir(outputDir, { recursive: true })
  await writeFile(resolve(outputDir, 'index.html'), html)
}

async function pageExists(path: string) {
  try {
    await access(resolve(pageOutputDir, path, 'index.html'))
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false
    }

    throw error
  }
}

async function writeTextFile(path: string, contents: string) {
  await writeFile(resolve(publicDir, path), contents)
}

async function main() {
  await loadEnvFiles()

  for (const page of policyPages) {
    let policy: PublishedPolicy | null = null

    try {
      policy = await fetchPublishedPolicy(page.key)
    } catch (error) {
      console.warn(`Skipping ${page.key}: ${(error as Error).message}`)
    }

    if (policy) {
      await writePage(page.path, renderPolicyPage(page, policy))
      continue
    }

    if (await pageExists(page.path)) {
      console.warn(`Keeping existing ${page.key} page because no published policy was fetched.`)
      continue
    }

    await writePage(page.path, renderPolicyPage(page, null))
  }

  for (const page of staticPages) {
    await writePage(page.path, renderPage(page))
  }

  const sitemapUrls = [
    '',
    ...policyPages.map((page) => page.path),
    ...staticPages.map((page) => page.path),
  ].map((path) => `  <url><loc>${path ? absoluteUrl(path) : `${siteUrl}/`}</loc></url>`)

  await writeTextFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>
`)

  await writeTextFile('robots.txt', `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
