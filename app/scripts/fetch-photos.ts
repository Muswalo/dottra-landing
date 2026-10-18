// Downloads the site's photographs from Wikimedia Commons and records their
// attribution. Commons allows automated downloads when the client sends a
// descriptive User-Agent with contact details, which this script does.
//
// Every photo here is a real photograph of Zambia under a free licence
// (CC BY / CC BY-SA / public domain). Attribution is written to
// src/data/photos.json and shown under each photo and on /credits/.
//
// Run: bun scripts/fetch-photos.ts

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'src/assets/photos');
const dataFile = resolve(root, 'src/data/photos.json');
const UA = 'DottraSiteBuild/1.0 (https://dottra.co; hello@dottra.co) photo-fetch';
const WIDTH = 1600;

type Wanted = { key: string; title: string; alt: string };

const wanted: Wanted[] = [
  {
    key: 'cairo-road-mobile-money',
    title: 'File:Cairo Road, Lusaka, Zambia, February 2022.jpg',
    alt: 'Traders on Cairo Road in Lusaka, with Airtel Money and mobile money kiosks behind them.',
  },
  {
    key: 'lusaka-market',
    title: 'File:Market (5268484861).jpg',
    alt: 'Women selling beans, maize and household goods at an open market in Lusaka.',
  },
  {
    key: 'tomato-stall',
    title: 'File:Selling Tomato and Unions.jpg',
    alt: 'A roadside stall in Zambia with tomatoes and onions stacked in buckets under a grass shade.',
  },
  {
    key: 'copperbelt-university',
    title: 'File:ZM-Copperbelt-University.JPG',
    alt: 'Students walking along the road at the entrance to Copperbelt University in Kitwe.',
  },
  {
    key: 'university-of-zambia',
    title: 'File:University of Zambia in 2024 1.jpg',
    alt: 'The sign at the main campus entrance of the University of Zambia in Lusaka.',
  },
  {
    key: 'lusaka-city',
    title: 'File:Lusaka City Transport.jpg',
    alt: 'A view over central Lusaka with shops, offices and traffic on a cloudy day.',
  },
];

type Credit = {
  key: string;
  file: string;
  alt: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  width: number;
  height: number;
};

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

async function lookup(title: string) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: String(WIDTH),
    iiextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|UsageTerms',
  }).toString();

  const res = await fetch(api, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons API ${res.status} for ${title}`);
  const json = (await res.json()) as {
    query: { pages: Record<string, { imageinfo?: Array<Record<string, any>> }> };
  };
  const page = Object.values(json.query.pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) throw new Error(`No image info for ${title}`);
  return info;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const credits: Credit[] = [];

  for (const item of wanted) {
    const info = await lookup(item.title);
    const meta = info.extmetadata ?? {};
    const license: string = meta.LicenseShortName?.value ?? 'See source';
    const licenseUrl: string =
      meta.LicenseUrl?.value ??
      (license === 'Public domain' ? 'https://creativecommons.org/publicdomain/mark/1.0/' : info.descriptionurl);
    const author = stripTags(meta.Artist?.value ?? 'Unknown author');

    const imageUrl: string = info.thumburl ?? info.url;
    const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': UA } });
    if (!imgRes.ok) throw new Error(`Download ${imgRes.status} for ${item.title}`);
    const bytes = new Uint8Array(await imgRes.arrayBuffer());
    const file = `${item.key}.jpg`;
    await writeFile(resolve(outDir, file), bytes);

    credits.push({
      key: item.key,
      file,
      alt: item.alt,
      title: item.title.replace(/^File:/, '').replace(/\.(jpe?g|png)$/i, ''),
      author,
      license,
      licenseUrl,
      sourceUrl: info.descriptionurl,
      width: info.thumbwidth ?? info.width,
      height: info.thumbheight ?? info.height,
    });

    console.log(`saved ${file} (${Math.round(bytes.length / 1024)} KB) - ${license}, ${author}`);
    // Be polite to the API.
    await new Promise((r) => setTimeout(r, 400));
  }

  await writeFile(dataFile, `${JSON.stringify(credits, null, 2)}\n`);
  console.log(`wrote ${credits.length} credits to src/data/photos.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
