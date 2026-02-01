import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildArticleMetadata } from "@/lib/articleMetadata";
import { getArticleBySlug } from "@/lib/microcms";
import ArticleDetailScreen from "@/features/articles/ArticleDetailScreen";

export const revalidate = 60;

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return buildArticleMetadata(article);
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailScreen article={article} />;
}
