type MicroCmsImage = {
  url: string;
  width: number;
  height: number;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  eyecatch?: MicroCmsImage;
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
  const endpoint = process.env.MICROCMS_ARTICLES_ENDPOINT ?? "articles";

  if (!serviceDomain || !apiKey) {
    throw new Error(
      "Missing microCMS config. Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.",
    );
  }

  return { serviceDomain, apiKey, endpoint };
};

const buildBaseUrl = () => {
  const { serviceDomain, endpoint } = resolveMicroCmsConfig();
  return `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`;
};

const fetchFromMicroCms = async <T>(url: URL): Promise<T> => {
  const { apiKey } = resolveMicroCmsConfig();
  const response = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`microCMS request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getArticles = async () => {
  const url = new URL(buildBaseUrl());

  return fetchFromMicroCms<MicroCmsListResponse<Article>>(url);
};

export const getArticleById = async (id: string) => {
  const url = new URL(`${buildBaseUrl()}/${id}`);
  return fetchFromMicroCms<Article>(url);
};

export const getArticlePreviewById = async (
  id: string,
  draftKey?: string,
) => {
  if (!draftKey) {
    return getArticleById(id);
  }

  const url = new URL(`${buildBaseUrl()}/${id}`);
  url.searchParams.set("draftKey", draftKey);
  return fetchFromMicroCms<Article>(url);
};

export const getArticleBySlug = async (slug: string) => {
  const url = new URL(buildBaseUrl());
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
