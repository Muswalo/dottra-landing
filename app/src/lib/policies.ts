// Build-time fetch of the published legal documents from Supabase
// (published_policies_v, readable with the publishable key). The same text is
// shown in the mobile app, so it is maintained in the admin dashboard, not here.
//
// If Supabase is unreachable or not configured, the page is built with a
// "not published yet" notice instead of failing the build.

export type PolicyKey = 'privacy' | 'terms' | 'cookies' | 'licences';

export type PolicySection = { id: string; title: string; body: string[]; sortOrder: number };

export type Policy = {
  key: PolicyKey;
  title: string;
  eyebrow: string;
  summary: string;
  updatedAt: string;
  effectiveAt: string | null;
  footerNote: string | null;
  sections: PolicySection[];
};

export const policyFallbacks: Record<PolicyKey, { title: string; summary: string }> = {
  privacy: { title: 'Privacy Policy', summary: 'How Dottra collects, uses and protects your personal information.' },
  terms: { title: 'Terms of Service', summary: 'The terms that apply when you use the Dottra app and credit facility.' },
  cookies: { title: 'Cookie Policy', summary: 'How cookies and similar technologies are used on Dottra services.' },
  licences: { title: 'Licences', summary: 'Licences and registrations that apply to Dottra and the software it uses.' },
};

function env(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name] ?? (import.meta.env as Record<string, string | undefined>)[name];
    if (value && value.trim()) return value.trim();
  }
  return undefined;
}

function config() {
  const url = env('SUPABASE_URL', 'VITE_SUPABASE_URL', 'PUBLIC_SUPABASE_URL', 'EXPO_PUBLIC_SUPABASE_URL');
  const key = env(
    'SUPABASE_PUBLISHABLE_KEY',
    'VITE_SUPABASE_PUBLISHABLE_KEY',
    'PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    'EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    'SUPABASE_ANON_KEY',
  );
  return url && key ? { url: url.replace(/\/+$/, ''), key } : null;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : null);

function mapSections(raw: unknown): PolicySection[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(isRecord)
    .map((s, index) => ({
      id: str(s.id) ?? `section-${index + 1}`,
      title: str(s.title) ?? '',
      body: Array.isArray(s.body) ? s.body.filter((p): p is string => typeof p === 'string' && p.trim().length > 0) : [],
      sortOrder: typeof s.sortOrder === 'number' ? s.sortOrder : index,
    }))
    .filter((s) => s.title && s.body.length > 0)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

const cache = new Map<PolicyKey, Promise<Policy | null>>();

export function loadPolicy(key: PolicyKey): Promise<Policy | null> {
  if (!cache.has(key)) cache.set(key, fetchPolicy(key));
  return cache.get(key)!;
}

async function fetchPolicy(key: PolicyKey): Promise<Policy | null> {
  const cfg = config();
  if (!cfg) {
    console.warn(`[policies] ${key}: SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY not set, building fallback page.`);
    return null;
  }

  const query = new URL(`${cfg.url}/rest/v1/published_policies_v`);
  query.searchParams.set('policy_key', `eq.${key}`);
  query.searchParams.set('select', '*');

  try {
    const res = await fetch(query, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      console.warn(`[policies] ${key}: Supabase returned ${res.status}, building fallback page.`);
      return null;
    }
    const rows = (await res.json()) as unknown[];
    const row = rows[0];
    if (!isRecord(row)) {
      console.warn(`[policies] ${key}: no published version, building fallback page.`);
      return null;
    }
    const sections = mapSections(row.sections);
    if (sections.length === 0) return null;
    return {
      key,
      title: str(row.title) ?? policyFallbacks[key].title,
      eyebrow: str(row.eyebrow) ?? 'Legal',
      summary: str(row.summary) ?? policyFallbacks[key].summary,
      updatedAt: str(row.updated_at) ?? str(row.published_at) ?? str(row.effective_at) ?? '',
      effectiveAt: str(row.effective_at),
      footerNote: str(row.footer_note),
      sections,
    };
  } catch (error) {
    console.warn(`[policies] ${key}: fetch failed (${(error as Error).message}), building fallback page.`);
    return null;
  }
}
