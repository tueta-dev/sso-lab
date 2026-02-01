import DOMPurify from "isomorphic-dompurify";

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
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "colgroup",
  "col",
  "a",
  "img",
  "code",
  "pre",
];

const allowedAttributes = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height", "srcset", "sizes", "loading", "decoding"],
  h1: ["id"],
  h2: ["id"],
  h3: ["id"],
  h4: ["id"],
  p: ["id"],
  code: ["class"],
  pre: ["class"],
  table: ["class"],
  th: ["colspan", "rowspan"],
  td: ["colspan", "rowspan"],
};

const allowedAttributeList = Array.from(
  new Set(Object.values(allowedAttributes).flat()),
);

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

let hooksInitialized = false;

const ensureHooks = () => {
  if (hooksInitialized) {
    return;
  }

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    const tagName = node.tagName?.toLowerCase();
    if (!tagName) {
      return;
    }

    const allowedForTag =
      allowedAttributes[tagName as keyof typeof allowedAttributes];

    if (!allowedForTag || !allowedForTag.includes(data.attrName)) {
      data.keepAttr = false;
    }
  });

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName?.toLowerCase() !== "a") {
      return;
    }

    const href = node.getAttribute("href") ?? undefined;
    const safeHref = sanitizeHref(href);

    if (safeHref) {
      node.setAttribute("href", safeHref);
    } else {
      node.removeAttribute("href");
    }

    node.setAttribute("rel", "noopener noreferrer");
    node.setAttribute("target", "_blank");
  });

  hooksInitialized = true;
};

export const sanitizeRichText = (html: string) => {
  ensureHooks();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributeList,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
};
