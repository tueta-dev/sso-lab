import { getArticles, getCategories } from "@/lib/microcms";
import ArticlesListScreen from "@/features/articles/ArticlesListScreen";

export const revalidate = 60;

type ArticlesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  try {
    const [{ contents }, { contents: categoryContents }] = await Promise.all([
      getArticles(),
      getCategories().catch(() => ({ contents: [] })),
    ]);
    const { category } = await searchParams;

    return (
      <ArticlesListScreen
        articles={contents}
        categories={categoryContents}
        selectedCategory={category}
      />
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "microCMS との通信に失敗しました。";

    return (
      <div className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
          <h1 className="text-3xl font-semibold">記事一覧を取得できません</h1>
          <p className="text-sm text-slate-600">
            {message}
            {" "}
            <span className="text-slate-500">
              MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を確認してください。
            </span>
          </p>
        </div>
      </div>
    );
  }
}
