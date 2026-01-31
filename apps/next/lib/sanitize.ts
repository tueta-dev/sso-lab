import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "code",
  "pre",
];

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height", "srcset", "sizes", "loading", "decoding"],
  h1: ["id"],
  h2: ["id"],
  h3: ["id"],
  h4: ["id"],
  p: ["id"],
  code: ["class"],
  pre: ["class"],
};

const allowedSchemes = ["http", "https", "mailto"];

const sanitizeHref = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim().replace(/[\u0000-\u001F\u007F\s]+/g, "");

  if (trimmed.startsWith("#") || trimmed.startsWith("/")) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:")
  ) {
    return trimmed;
  }

  return undefined;
};

export const sanitizeRichText = (html: string) =>
  sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes,
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const safeHref = sanitizeHref(attribs.href);
        const nextAttribs: Record<string, string> = {
          ...attribs,
          rel: "noopener noreferrer",
          target: "_blank",
        };

        if (safeHref) {
          nextAttribs.href = safeHref;
        } else {
          delete nextAttribs.href;
        }

        return {
          tagName,
          attribs: nextAttribs,
        };
      },
    },
  });
