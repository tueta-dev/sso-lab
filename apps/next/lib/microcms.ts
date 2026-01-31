type MicroCmsImage = {
  url: string;
  width: number;
  height: number;
};

export type MicroCmsCategory = {
  id: string;
  name: string;
};

type MicroCmsMetaGroup = {
  metaDescription?: string;
  ogImage?: MicroCmsImage;
  noindex?: boolean;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  eyecatch?: MicroCmsImage;
  category?: MicroCmsCategory;
  metaGroup?: MicroCmsMetaGroup;
  publishedAt: string;
};

type MicroCmsListResponse<T> = {
  contents: T[];
  totalCount: number;
  limit: number;
  offset: number;
};

type ArticleSlugIndex = Pick<Article, "id" | "slug">;

const resolveMicroCmsConfig = () => {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const articlesEndpoint =
    process.env.MICROCMS_ARTICLES_ENDPOINT ?? "articles";
  const categoriesEndpoint =
    process.env.MICROCMS_CATEGORIES_ENDPOINT ?? "categories";

  if (!serviceDomain || !apiKey) {
    throw new Error(
      "Missing microCMS config. Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.",
    );
  }

  return { serviceDomain, apiKey, articlesEndpoint, categoriesEndpoint };
};

const buildBaseUrl = (endpoint: string) => {
  const { serviceDomain } = resolveMicroCmsConfig();
  return `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`;
};

const fetchFromMicroCms = async <T>(
  url: URL,
  init?: RequestInit,
): Promise<T> => {
  const { apiKey } = resolveMicroCmsConfig();
  const response = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
    next: { revalidate: 60 },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`microCMS request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getArticles = async () => {
  const { articlesEndpoint } = resolveMicroCmsConfig();
  const url = new URL(buildBaseUrl(articlesEndpoint));

  return fetchFromMicroCms<MicroCmsListResponse<Article>>(url);
};

export const getArticleById = async (id: string) => {
  const { articlesEndpoint } = resolveMicroCmsConfig();
  const url = new URL(`${buildBaseUrl(articlesEndpoint)}/${id}`);
  return fetchFromMicroCms<Article>(url);
};

export const getArticlePreviewById = async (
  id: string,
  draftKey?: string,
) => {
  if (!draftKey) {
    return getArticleById(id);
  }

  const { articlesEndpoint } = resolveMicroCmsConfig();
  const url = new URL(`${buildBaseUrl(articlesEndpoint)}/${id}`);
  url.searchParams.set("draftKey", draftKey);
  return fetchFromMicroCms<Article>(url, { cache: "no-store" });
};

export const getArticleBySlug = async (slug: string) => {
  const { articlesEndpoint } = resolveMicroCmsConfig();
  const url = new URL(buildBaseUrl(articlesEndpoint));
  url.searchParams.set("filters", `slug[equals]${slug}`);
  url.searchParams.set("fields", "id,slug");
  url.searchParams.set("limit", "1");

  const data = await fetchFromMicroCms<MicroCmsListResponse<ArticleSlugIndex>>(
    url,
  );
  const match = data.contents[0];

  if (!match) {
    return null;
  }

  return getArticleById(match.id);
};

export const getCategories = async () => {
  const { categoriesEndpoint } = resolveMicroCmsConfig();
  const url = new URL(buildBaseUrl(categoriesEndpoint));

  return fetchFromMicroCms<MicroCmsListResponse<MicroCmsCategory>>(url);
};
