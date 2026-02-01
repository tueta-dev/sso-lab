import { notFound } from "next/navigation";
import { getArticlePreviewById } from "@/lib/microcms";
import ArticleDetailScreen from "@/features/articles/ArticleDetailScreen";

type ArticlePreviewPageProps = {
  params: Promise<{ contentId: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

export const dynamic = "force-dynamic";

export default async function ArticlePreviewPage({
  params,
  searchParams,
}: ArticlePreviewPageProps) {
  const { contentId } = await params;
  const { draftKey } = await searchParams;

  const article = await getArticlePreviewById(contentId, draftKey);

  if (!article) {
    notFound();
  }

  return <ArticleDetailScreen article={article} isPreview />;
}
