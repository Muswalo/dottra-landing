import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { FiArrowLeft, FiArrowRight, FiMail, FiMenu, FiX } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { Database, Json } from '../src/types/database.types'
import {
  blogPosts,
  fixedChargeRate,
  googlePlayUrl,
  packageTermDays,
  processingFeeRate,
  pricingReviewedAt,
  salariedPackageAmounts,
  standardPages,
  studentPackageAmounts,
  type BlogPost,
  type PageLink,
  type StandardPage,
} from './site-content'

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

type HeadInput = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedAt?: string
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const siteRoot = resolve(__dirname, '..')
const repoRoot = resolve(siteRoot, '..')
const workspaceRoot = resolve(siteRoot, '..', '..')
const publicDir = resolve(siteRoot, 'public')
const pageOutputDir = siteRoot
const siteUrl = readSiteUrl()

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
    fallbackSummary: 'The latest terms of service has not been published yet.',
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

  const values = value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  )

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

function mapPublishedPolicySections(
  sections: PublishedPolicyRow['sections'],
): PublishedPolicySection[] {
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
    updatedAt: readRequiredString(
      row.updated_at ?? row.published_at ?? row.effective_at,
      'updated timestamp',
    ),
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
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatKwacha(value: number): string {
  return `K${new Intl.NumberFormat('en-ZM', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)}`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeXml(value: string): string {
  return escapeHtml(value)
}

function normalizeHtml(value: string): string {
  return `${value.replace(/[\t ]+$/gm, '').trimEnd()}\n`
}

function renderIcon(icon: IconType): string {
  return renderToStaticMarkup(
    createElement(icon, { 'aria-hidden': true, focusable: false }),
  )
}

function absoluteUrl(path = ''): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '')
  return cleanPath ? `${siteUrl}/${cleanPath}/` : `${siteUrl}/`
}

function renderStructuredData(data: HeadInput['structuredData']): string {
  if (!data) {
    return ''
  }

  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return `    <script type="application/ld+json">${json}</script>\n`
}

function ogImageForPath(path: string): string {
  const firstSegment = path.replace(/^\/+|\/+$/g, '').split('/')[0]
  const dedicatedImages = new Set([
    'about',
    'contact',
    'cookies',
    'licences',
    'privacy',
    'support',
    'terms',
  ])
  const imageName = dedicatedImages.has(firstSegment) ? firstSegment : 'home'
  return `${siteUrl}/og/${imageName}.png`
}

function renderHead(input: HeadInput) {
  const pageUrl = absoluteUrl(input.path)
  const ogImage = ogImageForPath(input.path)
  const title = input.title.includes('Dottra') ? input.title : `${input.title} | Dottra`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(input.description)}" />
    <link rel="canonical" href="${pageUrl}" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="alternate" type="application/rss+xml" title="Dottra Blog" href="/feed.xml" />
    <link rel="stylesheet" href="/static-page.css" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:type" content="${input.type ?? 'website'}" />
    <meta property="og:site_name" content="Dottra" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(input.description)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    ${input.publishedAt ? `<meta property="article:published_time" content="${escapeHtml(input.publishedAt)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(input.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
${renderStructuredData(input.structuredData)}    <title>${escapeHtml(title)}</title>
  </head>
  <body>`
}

function renderHeader() {
  return `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="/" aria-label="Dottra home">
          <img src="/dottra-symbol-light.png" alt="" width="34" height="24" />
          <span>Dottra</span>
        </a>
        <nav class="site-nav" aria-label="Main navigation">
          <a href="/product/">Product</a>
          <a href="/how-it-works/">How it works</a>
          <a href="/pricing/">Pricing</a>
          <a href="/eligibility/">Eligibility</a>
          <a href="/blog/">Blog</a>
          <a href="/support/">Help</a>
        </nav>
        <a class="header-action" href="${googlePlayUrl}" target="_blank" rel="noreferrer">Get the app</a>
        <details class="mobile-menu">
          <summary aria-label="Open navigation" title="Menu">
            <span class="menu-icon menu-icon-open">${renderIcon(FiMenu)}</span>
            <span class="menu-icon menu-icon-close">${renderIcon(FiX)}</span>
          </summary>
          <nav class="mobile-menu-panel" aria-label="Mobile navigation">
            <a href="/product/">Product</a>
            <a href="/how-it-works/">How it works</a>
            <a href="/pricing/">Pricing</a>
            <a href="/eligibility/">Eligibility</a>
            <a href="/blog/">Blog</a>
            <a href="/support/">Help</a>
          </nav>
        </details>
      </div>
    </header>`
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand-block">
          <a class="footer-brand" href="/" aria-label="Dottra home">
            <img src="/dottra-symbol-dark.png" alt="" width="34" height="24" />
            <span>Dottra</span>
          </a>
          <p>A reusable digital credit line built for Zambia.</p>
        </div>
        <div class="footer-column">
          <h2>Product</h2>
          <a href="/product/">Overview</a>
          <a href="/how-it-works/">How it works</a>
          <a href="/pricing/">Pricing</a>
          <a href="/eligibility/">Eligibility</a>
        </div>
        <div class="footer-column">
          <h2>Company</h2>
          <a href="/about/">About</a>
          <a href="/blog/">Blog</a>
          <a href="/contact/">Contact</a>
        </div>
        <div class="footer-column">
          <h2>Help and legal</h2>
          <a href="/support/">Support</a>
          <a href="/terms/">Terms</a>
          <a href="/privacy/">Privacy</a>
          <a href="/cookies/">Cookies</a>
        </div>
        <div class="footer-column">
          <h2>Get Dottra</h2>
          <a class="store-badge-link footer-store-badge" href="${googlePlayUrl}" target="_blank" rel="noreferrer" aria-label="Get Dottra on Google Play"><img src="/google-play-badge.png" alt="Get it on Google Play" width="646" height="250" /></a>
          <span>App Store coming soon</span>
          <a href="mailto:support@dottra.co">support@dottra.co</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Dottra Lending Services Limited. Zambia.</span>
        <span>PACRA 120251028871</span>
      </div>
    </footer>
  </body>
</html>`
}

function renderActions(actions?: PageLink[]) {
  if (!actions?.length) {
    return ''
  }

  const hasStoreAction = actions.some((action) => action.href === googlePlayUrl)

  return `<div class="action-row${hasStoreAction ? ' store-action-row' : ''}">${actions
    .map(
      (action, index) => {
        if (action.href === googlePlayUrl) {
          return `<a class="store-badge-link store-badge-action" href="${googlePlayUrl}" target="_blank" rel="noreferrer" aria-label="Get Dottra on Google Play"><img src="/google-play-badge.png" alt="Get it on Google Play" width="646" height="250" /></a>`
        }

        const icon = action.href.startsWith('mailto:') ? FiMail : FiArrowRight
        return `<a class="button${index > 0 ? ' button-secondary' : ''}" href="${escapeHtml(action.href)}"><span>${escapeHtml(action.label)}</span>${renderIcon(icon)}</a>`
      },
    )
    .join('')}</div>`
}

function renderStandardPage(page: StandardPage) {
  const sections = page.sections
    .map(
      (section) => `<section class="content-section">
          <div class="content-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="prose">
            ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n            ')}
            ${
              section.items?.length
                ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
                : ''
            }
          </div>
        </section>`,
    )
    .join('\n')

  return `${renderHead({
    title: page.title,
    description: page.summary,
    path: page.path,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.summary,
      url: absoluteUrl(page.path),
      isPartOf: { '@type': 'WebSite', name: 'Dottra', url: siteUrl },
    },
  })}
${renderHeader()}
    <main class="page-main">
      <section class="page-hero">
        <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.title)}</h1>
        <p class="summary">${escapeHtml(page.summary)}</p>
        ${renderActions(page.actions)}
      </section>
      <div class="content-stack">
        ${sections}
      </div>
    </main>
${renderFooter()}`
}

function renderPolicyPage(
  page: (typeof policyPages)[number],
  policy: PublishedPolicy | null,
) {
  const standardPage: StandardPage = {
    path: page.path,
    title: policy?.title ?? page.fallbackTitle,
    eyebrow: policy?.eyebrow ?? 'Policy',
    summary: policy?.summary ?? page.fallbackSummary,
    sections:
      policy?.sections.map((section) => ({
        title: section.title,
        paragraphs: section.body,
      })) ?? [
        {
          title: 'Policy unavailable',
          paragraphs: [
            'This policy has not been published yet. The current version will appear here when it is available.',
          ],
        },
      ],
  }
  const updated = policy ? formatDate(policy.updatedAt) : null
  const rendered = renderStandardPage(standardPage)

  if (!updated && !policy?.footerNote) {
    return rendered
  }

  const note = [updated ? `Last updated ${updated}.` : '', policy?.footerNote ?? '']
    .filter(Boolean)
    .join(' ')

  return rendered.replace(
    '<div class="content-stack">',
    `<p class="document-meta">${escapeHtml(note)}</p><div class="content-stack">`,
  )
}

function renderHomePage() {
  const latestPosts = blogPosts.slice(0, 3)
  const articles = latestPosts
    .map(
      (post) => `<article class="post-row">
          <div class="post-meta"><span>${escapeHtml(post.category)}</span><time datetime="${post.publishedAt}">${escapeHtml(post.displayDate)}</time></div>
          <div>
            <h3><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></h3>
            <p>${escapeHtml(post.summary)}</p>
          </div>
          <a class="text-link text-link-with-icon" href="/blog/${post.slug}/" aria-label="Read ${escapeHtml(post.title)}"><span>Read article</span>${renderIcon(FiArrowRight)}</a>
        </article>`,
    )
    .join('\n')

  return `${renderHead({
    title: 'Dottra | Your reusable credit line',
    description:
      'A reusable digital credit line for eligible salaried workers and government-sponsored students in Zambia.',
    path: '',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Dottra',
        legalName: 'Dottra Lending Services Limited',
        url: siteUrl,
        email: 'hello@dottra.co',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chingwere 31651, Chunga East',
          addressLocality: 'Lusaka',
          postalCode: '10101',
          addressCountry: 'ZM',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Dottra',
        url: siteUrl,
      },
    ],
  })}
${renderHeader()}
    <main>
      <section class="home-hero page-width">
        <div class="home-hero-copy">
          <p class="eyebrow">Now on Google Play</p>
          <h1>Your reusable credit line.</h1>
          <p class="home-lede">Built for eligible salaried workers and government-sponsored students in Zambia. See the complete cost before every draw, repay, and make credit available again.</p>
          <div class="action-row store-action-row">
            <a class="store-badge-link" href="${googlePlayUrl}" target="_blank" rel="noreferrer" aria-label="Get Dottra on Google Play"><img src="/google-play-badge.png" alt="Get it on Google Play" width="646" height="250" /></a>
            <a class="button button-secondary" href="/how-it-works/"><span>See how it works</span>${renderIcon(FiArrowRight)}</a>
          </div>
          <p class="hero-note">Approval and individual limits are subject to verification and affordability review.</p>
        </div>
        <figure class="product-visual">
          <img src="/app-screenshot.png" alt="Dottra account screen showing available credit and recent account activity." width="1046" height="1860" />
        </figure>
      </section>

      <section class="cycle-band" aria-labelledby="cycle-title">
        <div class="cycle-inner page-width">
          <div>
            <p class="section-label">The Dottra account</p>
            <h2 id="cycle-title">Credit that becomes available again.</h2>
          </div>
          <ol class="credit-cycle">
            <li><span>01</span><strong>Available credit</strong></li>
            <li><span>02</span><strong>Draw</strong></li>
            <li><span>03</span><strong>Repay</strong></li>
            <li><span>04</span><strong>Available again</strong></li>
          </ol>
        </div>
      </section>

      <section class="home-section page-width" aria-labelledby="essentials-title">
        <div class="section-intro">
          <p class="section-label">The essentials</p>
          <h2 id="essentials-title">Straightforward from the start.</h2>
        </div>
        <div class="feature-list">
          <article>
            <p class="feature-number">01</p>
            <h3>See the full cost first</h3>
            <p>The amount received, Processing Fee, one-time Fixed Charge, repayment date, and total are shown before confirmation.</p>
          </article>
          <article>
            <p class="feature-number">02</p>
            <h3>No fee to join</h3>
            <p>There is no registration, membership, or subscription fee. Current package pricing is published on its own page.</p>
            <a class="text-link text-link-with-icon" href="/pricing/"><span>View pricing</span>${renderIcon(FiArrowRight)}</a>
          </article>
          <article>
            <p class="feature-number">03</p>
            <h3>Manage it in one app</h3>
            <p>View available credit, package terms, account activity, the scheduled repayment, and support from your Dottra account.</p>
          </article>
        </div>
      </section>

      <section class="link-section page-width" aria-label="Learn about Dottra">
        <a href="/product/"><span>Product</span><strong>Understand the reusable credit line</strong></a>
        <a href="/how-it-works/"><span>Process</span><strong>Follow every step from verification to repayment</strong></a>
        <a href="/eligibility/"><span>Eligibility</span><strong>Check the current customer requirements</strong></a>
      </section>

      <section class="home-section page-width" aria-labelledby="latest-title">
        <div class="section-intro section-intro-row">
          <div>
            <p class="section-label">From the blog</p>
            <h2 id="latest-title">Latest from Dottra.</h2>
          </div>
          <a class="text-link text-link-with-icon" href="/blog/"><span>View all articles</span>${renderIcon(FiArrowRight)}</a>
        </div>
        <div class="post-list">${articles}</div>
      </section>

      <section class="closing-band">
        <div class="closing-inner page-width">
          <div>
            <p class="section-label">Dottra for Android</p>
            <h2>Keep your credit line within reach.</h2>
          </div>
          <a class="store-badge-link store-badge-on-dark" href="${googlePlayUrl}" target="_blank" rel="noreferrer" aria-label="Get Dottra on Google Play"><img src="/google-play-badge.png" alt="Get it on Google Play" width="646" height="250" /></a>
        </div>
      </section>
    </main>
${renderFooter()}`
}

function renderPricingPage() {
  const studentAmounts = new Set(studentPackageAmounts)
  const rows = salariedPackageAmounts
    .map((amount) => {
      const processingFee = amount * processingFeeRate
      const amountReceived = amount - processingFee
      const fixedCharge = amount * fixedChargeRate
      const totalToRepay = amount + fixedCharge
      const audience = studentAmounts.has(amount) ? 'Salaried + student' : 'Salaried only'

      return `<tr>
            <th scope="row">${formatKwacha(amount)}</th>
            <td data-label="Processing Fee">${formatKwacha(processingFee)}</td>
            <td data-label="Amount received">${formatKwacha(amountReceived)}</td>
            <td data-label="Fixed Charge">${formatKwacha(fixedCharge)}</td>
            <td data-label="Total to repay"><strong>${formatKwacha(totalToRepay)}</strong></td>
            <td data-label="Term">${packageTermDays} days</td>
            <td data-label="Available to">${audience}</td>
          </tr>`
    })
    .join('\n')

  return `${renderHead({
    title: 'Current pricing',
    description:
      'Dottra package amounts, Processing Fees, one-time Fixed Charges, amounts received, and totals to repay.',
    path: 'pricing',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dottra current pricing',
      description: 'Current Dottra package pricing and repayment terms.',
      url: absoluteUrl('pricing'),
    },
  })}
${renderHeader()}
    <main class="page-main pricing-page">
      <section class="page-hero">
        <p class="eyebrow">Pricing</p>
        <h1>Current Dottra pricing.</h1>
        <p class="summary">One rate structure across the current package catalogue, with every figure shown before you confirm in the app.</p>
        <p class="document-meta">Catalogue reviewed ${pricingReviewedAt}. The in-app confirmation is the final source of terms for each draw.</p>
      </section>

      <section class="rate-summary" aria-label="Current rate summary">
        <div><span>Processing Fee</span><strong>5%</strong><p>Deducted before the amount is sent.</p></div>
        <div><span>Fixed Charge</span><strong>20%</strong><p>Set once when the draw completes.</p></div>
        <div><span>Term</span><strong>30 days</strong><p>Due on the date shown in the app.</p></div>
      </section>

      <section class="pricing-explanation content-section">
        <div class="content-heading"><h2>How the figures work.</h2></div>
        <div class="prose">
          <p>The 5% Processing Fee is deducted from the selected amount before payout. The 20% Fixed Charge is added to the selected amount to calculate the total to repay.</p>
          <p>For example, select K500, receive K475 in your registered mobile-money wallet, and repay K600 after 30 days.</p>
          <p>The Fixed Charge does not grow day by day or compound. There is no registration, membership, or subscription fee.</p>
        </div>
      </section>

      <section class="pricing-table-section" aria-labelledby="table-title">
        <div class="table-heading">
          <div><p class="section-label">Package table</p><h2 id="table-title">Every current package.</h2></div>
          <p>Salaried: K50 to K3,000. Students: K75 to K400.</p>
        </div>
        <div class="table-scroll" tabindex="0">
          <table>
            <caption>Current Dottra credit packages and complete pricing</caption>
            <thead>
              <tr>
                <th scope="col">Selected amount</th>
                <th scope="col">Processing Fee</th>
                <th scope="col">Amount received</th>
                <th scope="col">Fixed Charge</th>
                <th scope="col">Total to repay</th>
                <th scope="col">Term</th>
                <th scope="col">Available to</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>

      <section class="pricing-notes content-section">
        <div class="content-heading"><h2>Important pricing notes.</h2></div>
        <div class="prose">
          <ul>
            <li>Your approved limit determines which packages are available in your account.</li>
            <li>Every draw is subject to current eligibility, account controls, package availability, and provider processing.</li>
            <li>Rates and packages can change for future draws. A completed draw keeps the terms accepted at confirmation.</li>
            <li>Repayment is scheduled through the registered bank mandate on the date displayed in the app.</li>
          </ul>
          ${renderActions([
            { label: 'See how it works', href: '/how-it-works/' },
            { label: 'Check eligibility', href: '/eligibility/' },
          ])}
        </div>
      </section>
    </main>
${renderFooter()}`
}

function renderBlogIndex() {
  const posts = blogPosts
    .map(
      (post) => `<article class="blog-index-row">
          <div class="post-meta"><span>${escapeHtml(post.category)}</span><time datetime="${post.publishedAt}">${escapeHtml(post.displayDate)}</time></div>
          <div>
            <h2><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></h2>
            <p>${escapeHtml(post.summary)}</p>
            <p class="byline">By Emmanuel Muswalo &middot; ${escapeHtml(post.readingTime)}</p>
          </div>
          <a class="text-link text-link-with-icon" href="/blog/${post.slug}/" aria-label="Read ${escapeHtml(post.title)}"><span>Read article</span>${renderIcon(FiArrowRight)}</a>
        </article>`,
    )
    .join('\n')

  return `${renderHead({
    title: 'Blog',
    description:
      'Dottra product updates and practical writing about budgeting, saving, credit, and financial management.',
    path: 'blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Dottra Blog',
      description: 'Product updates and practical financial-management articles from Dottra.',
      url: absoluteUrl('blog'),
      publisher: { '@type': 'Organization', name: 'Dottra', url: siteUrl },
    },
  })}
${renderHeader()}
    <main class="page-main blog-page">
      <section class="page-hero">
        <p class="eyebrow">Blog</p>
        <h1>Useful thinking about money.</h1>
        <p class="summary">Product updates from Dottra and practical financial-management guides written for everyday decisions.</p>
      </section>
      <div class="blog-index">${posts}</div>
    </main>
${renderFooter()}`
}

function renderBlogPost(post: BlogPost) {
  const articleBody = post.sections
    .map(
      (section) => `<section>
          <h2>${escapeHtml(section.title)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n          ')}
          ${
            section.items?.length
              ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
              : ''
          }
        </section>`,
    )
    .join('\n')
  const relatedPosts = blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3)
    .map(
      (candidate) => `<li><a href="/blog/${candidate.slug}/"><span>${escapeHtml(candidate.category)}</span><strong>${escapeHtml(candidate.title)}</strong></a></li>`,
    )
    .join('')
  const articleUrl = absoluteUrl(`blog/${post.slug}`)
  const encodedArticleUrl = encodeURIComponent(articleUrl)
  const encodedShareText = encodeURIComponent(post.title)
  const shareLinks = `<nav class="article-share" aria-label="Share this article">
            <span class="share-label">Share</span>
            <a href="https://wa.me/?text=${encodedShareText}%20${encodedArticleUrl}" target="_blank" rel="noreferrer" aria-label="Share on WhatsApp">${renderIcon(FaWhatsapp)}<span>WhatsApp</span></a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedArticleUrl}" target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">${renderIcon(FaLinkedinIn)}<span>LinkedIn</span></a>
            <a href="https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedArticleUrl}" target="_blank" rel="noreferrer" aria-label="Share on X">${renderIcon(FaXTwitter)}<span>Post</span></a>
          </nav>`
  const hasProductVisual = post.slug === 'introducing-dottra'

  return `${renderHead({
    title: post.title,
    description: post.summary,
    path: `blog/${post.slug}`,
    type: 'article',
    publishedAt: post.publishedAt,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      mainEntityOfPage: absoluteUrl(`blog/${post.slug}`),
      author: { '@type': 'Person', name: 'Emmanuel Muswalo' },
      publisher: { '@type': 'Organization', name: 'Dottra', url: siteUrl },
    },
  })}
${renderHeader()}
    <main class="article-main">
      <article class="article${hasProductVisual ? ' article-with-visual' : ''}">
        <header class="article-header">
          <a class="back-link" href="/blog/">${renderIcon(FiArrowLeft)}<span>Blog</span></a>
          <p class="eyebrow">${escapeHtml(post.category)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p class="article-summary">${escapeHtml(post.summary)}</p>
          <p class="article-byline">By <strong>Emmanuel Muswalo</strong> <span>&middot;</span> <time datetime="${post.publishedAt}">${escapeHtml(post.displayDate)}</time> <span>&middot;</span> ${escapeHtml(post.readingTime)}</p>
          ${shareLinks}
        </header>
        ${
          hasProductVisual
            ? `<figure class="article-product-visual"><img src="/app-screenshot.png" alt="Dottra app account screen showing available credit." width="1046" height="1860" /></figure>`
            : ''
        }
        <div class="article-body">${articleBody}</div>
      </article>
      <aside class="related-reading" aria-labelledby="related-title">
        <p class="section-label">Continue reading</p>
        <h2 id="related-title">More from Dottra.</h2>
        <ul>${relatedPosts}</ul>
      </aside>
    </main>
${renderFooter()}`
}

async function writePage(path: string, html: string) {
  const outputDir = resolve(pageOutputDir, path)
  await mkdir(outputDir, { recursive: true })
  await writeFile(resolve(outputDir, 'index.html'), normalizeHtml(html))
}

async function writeHomePage(html: string) {
  await writeFile(resolve(pageOutputDir, 'index.html'), normalizeHtml(html))
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

async function writePublicFile(path: string, contents: string) {
  await writeFile(resolve(publicDir, path), contents)
}

function renderFeed() {
  const items = blogPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(`blog/${post.slug}`)}</link>
      <guid>${absoluteUrl(`blog/${post.slug}`)}</guid>
      <pubDate>${new Date(`${post.publishedAt}T08:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>Emmanuel Muswalo</dc:creator>
      <description>${escapeXml(post.summary)}</description>
    </item>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Dottra Blog</title>
    <link>${siteUrl}/blog/</link>
    <description>Dottra product updates and practical financial-management articles.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
}

function renderLlmsText() {
  const articleLinks = blogPosts
    .map((post) => `- [${post.title}](${absoluteUrl(`blog/${post.slug}`)}): ${post.summary}`)
    .join('\n')

  return `# Dottra

> Dottra is a reusable digital credit line for eligible salaried workers and government-sponsored students in Zambia.

## Product

- [Product overview](${absoluteUrl('product')})
- [How it works](${absoluteUrl('how-it-works')})
- [Current pricing](${absoluteUrl('pricing')})
- [Eligibility](${absoluteUrl('eligibility')})

## Company and help

- [About Dottra](${absoluteUrl('about')})
- [Support](${absoluteUrl('support')})
- [Contact](${absoluteUrl('contact')})
- [Terms](${absoluteUrl('terms')})
- [Privacy](${absoluteUrl('privacy')})

## Blog

${articleLinks}
`
}

async function main() {
  await loadEnvFiles()
  await writeHomePage(renderHomePage())

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

  for (const page of standardPages) {
    await writePage(page.path, renderStandardPage(page))
  }

  await writePage('pricing', renderPricingPage())
  await writePage('blog', renderBlogIndex())

  for (const post of blogPosts) {
    await writePage(`blog/${post.slug}`, renderBlogPost(post))
  }

  const paths = [
    '',
    ...policyPages.map((page) => page.path),
    ...standardPages.map((page) => page.path),
    'pricing',
    'blog',
    ...blogPosts.map((post) => `blog/${post.slug}`),
  ]
  const sitemapUrls = paths
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
    .join('\n')

  await writePublicFile(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`,
  )

  await writePublicFile(
    'robots.txt',
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  )
  await writePublicFile('feed.xml', renderFeed())
  await writePublicFile('llms.txt', renderLlmsText())
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
