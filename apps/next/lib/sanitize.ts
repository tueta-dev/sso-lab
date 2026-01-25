import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
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
  img: ["src", "alt", "width", "height"],
};

const allowedSchemes = ["http", "https", "mailto"];

export const sanitizeRichText = (html: string) =>
  sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
