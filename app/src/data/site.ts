// Facts used across the site. Pricing figures mirror the app's
// pricing_config_versions (v1, identical for students and salaried
// customers). If pricing changes in the app, change it here in the same
// release: this file is the published price list.

export const site = {
  name: 'Dottra',
  legalName: 'Dottra Lending Services Limited',
  url: 'https://dottra.co',
  tagline: 'A reusable credit facility for salaried workers and sponsored students in Zambia.',
  description:
    'Dottra is a reusable credit facility for eligible salaried workers and government-sponsored students in Zambia. Draw to your mobile money, pay back any time, and get a monthly statement.',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.dottra.app',
  email: {
    company: 'hello@dottra.co',
    support: 'support@dottra.co',
    privacy: 'dpo@dottra.co',
  },
  phone: '+260 973 400 223',
  phoneHref: 'tel:+260973400223',
  address: {
    street: 'Chingwere 31651, Chunga East',
    locality: 'Lusaka',
    postalCode: '10101',
    country: 'ZM',
    countryName: 'Zambia',
  },
  pacra: '120251028871',
} as const;

export const pricing = {
  reviewedAt: '2026-10-17',
  processingFeeRate: 0.05,
  processingFeeMinimum: 1,
  monthlyChargeRate: 0.2,
  minimumDraw: 10,
  minimumPayment: 10,
  gracePeriodDays: 7,
  guideLimits: {
    salaried: 3000,
    student: 400,
  },
} as const;

export const supportedUniversities = [
  'Chalimbana University',
  'Copperbelt University',
  'Kapasa Makasa University',
  'Kwame Nkrumah University',
  'Levy Mwanawasa Medical University',
  'Mukuba University',
  'Mulungushi University',
  'University of Zambia',
] as const;

export const mainNav = [
  { href: '/product/', label: 'Product' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/eligibility/', label: 'Eligibility' },
  { href: '/blog/', label: 'Blog' },
  { href: '/support/', label: 'Help' },
] as const;

export const footerNav = [
  {
    title: 'Product',
    links: [
      { href: '/product/', label: 'Overview' },
      { href: '/how-it-works/', label: 'How it works' },
      { href: '/pricing/', label: 'Pricing' },
      { href: '/eligibility/', label: 'Eligibility' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/blog/', label: 'Blog' },
      { href: '/contact/', label: 'Contact' },
      { href: '/credits/', label: 'Photo credits' },
    ],
  },
  {
    title: 'Help and legal',
    links: [
      { href: '/support/', label: 'Support' },
      { href: '/delete-account/', label: 'Delete account' },
      { href: '/terms/', label: 'Terms' },
      { href: '/privacy/', label: 'Privacy' },
      { href: '/cookies/', label: 'Cookies' },
      { href: '/licences/', label: 'Licences' },
    ],
  },
] as const;

/** Kwacha with no trailing ".00" for whole amounts: K500, K25, K0.50. */
export function kwacha(value: number): string {
  const whole = Number.isInteger(value);
  return `K${new Intl.NumberFormat('en-ZM', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
}

/** Round half up to the ngwee, the same rule the app uses. */
function roundNgwee(value: number): number {
  return Math.floor(value * 100 + 0.5 + 1e-9) / 100;
}

export function processingFee(draw: number): number {
  return Math.max(roundNgwee(draw * pricing.processingFeeRate), pricing.processingFeeMinimum);
}

/** Monthly charge for a constant principal held `daysHeld` of `daysInMonth`. */
export function monthlyCharge(principal: number, daysHeld: number, daysInMonth: number): number {
  return roundNgwee((pricing.monthlyChargeRate * principal * daysHeld) / daysInMonth);
}

export function percent(rate: number): string {
  return `${Math.round(rate * 1000) / 10}%`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Lusaka',
  }).format(date);
}
