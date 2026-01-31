type TocItem = {
  id: string;
  text: string;
  level: 1 | 2;
};

const headingRegex = /<h([12])([^>]*)>([\s\S]*?)<\/h\1>/gi;
const idRegex = /id\s*=\s*(['"])(.*?)\1/i;

const stripTags = (value: string) => value.replace(/<[^>]*>/g, "");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ensureUniqueId = (base: string, counts: Map<string, number>) => {
  const current = counts.get(base) ?? 0;
  const next = current + 1;
  counts.set(base, next);

  if (next === 1) {
    return base;
  }

  return `${base}-${next}`;
};

export const buildTocFromHtml = (html: string) => {
  const counts = new Map<string, number>();
  let fallbackIndex = 0;
  const items: TocItem[] = [];

  const withIds = html.replace(
    headingRegex,
    (match, levelRaw: string, attrs: string, inner: string) => {
      const level = Number(levelRaw) as 1 | 2;
      const text = stripTags(inner).trim();
      const existingIdMatch = attrs.match(idRegex);
      const existingId = existingIdMatch?.[2];

      let baseId = existingId ?? slugify(text);
      if (!baseId) {
        fallbackIndex += 1;
        baseId = `section-${fallbackIndex}`;
      }

      const id = ensureUniqueId(baseId, counts);
      items.push({ id, text: text || `Section ${items.length + 1}`, level });

      const cleanAttrs = attrs.replace(idRegex, "").trim();
      const nextAttrs = cleanAttrs ? ` ${cleanAttrs}` : "";

      return `<h${level}${nextAttrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: withIds, items };
};
