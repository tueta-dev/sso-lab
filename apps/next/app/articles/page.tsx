import type { Article, MicroCmsCategory } from "@/lib/microcms";
import { getArticles, getCategories } from "@/lib/microcms";
import ArticlesListScreen from "@/features/articles/ArticlesListScreen";

export const revalidate = 60;

type ArticlesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { category } = await searchParams;
  let errorMessage: string | null = null;
  let contents: Article[] = [];
  let categoryContents: MicroCmsCategory[] = [];

  try {
    const [articlesResponse, categoriesResponse] = await Promise.all([
      getArticles(),
      getCategories().catch(() => ({ contents: [] })),
    ]);

    contents = articlesResponse.contents;
    categoryContents = categoriesResponse.contents;
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "microCMS との通信に失敗しました。";
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
          <h1 className="text-3xl font-semibold">記事一覧を取得できません</h1>
          <p className="text-sm text-slate-600">
            {errorMessage}{" "}
            <span className="text-slate-500">
              MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を確認してください。
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <ArticlesListScreen
      articles={contents}
      categories={categoryContents}
      selectedCategory={category}
    />
  );
}
