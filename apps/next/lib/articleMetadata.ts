import type { Metadata } from "next";
import type { Article } from "@/lib/microcms";

export const buildArticleMetadata = (article: Article | null): Metadata => {
  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  const metaDescription =
    article.metaGroup?.metaDescription ?? article.description;
  const ogImage = article.metaGroup?.ogImage ?? article.eyecatch;
  const noindex = article.metaGroup?.noindex ?? false;

  return {
    title: article.title,
    description: metaDescription,
    robots: noindex ? "noindex, nofollow" : undefined,
    openGraph: ogImage
      ? {
          title: article.title,
          description: metaDescription,
          images: [
            {
              url: ogImage.url,
              width: ogImage.width,
              height: ogImage.height,
              alt: article.title,
            },
          ],
        }
      : undefined,
  };
};
