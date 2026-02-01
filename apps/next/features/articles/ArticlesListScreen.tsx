import Image from "next/image";
import Link from "next/link";
import type { Article, MicroCmsCategory } from "@/lib/microcms";
import { formatArticleDate } from "@/features/articles/format";

type ArticlesListScreenProps = {
  articles: Article[];
  categories: MicroCmsCategory[];
  selectedCategory?: string;
};

export default function ArticlesListScreen({
  articles,
  categories,
  selectedCategory,
}: ArticlesListScreenProps) {
  const normalizedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const filteredContents = selectedCategory
    ? articles.filter(
        (article) =>
          article.category?.id === selectedCategory ||
          article.category?.name === selectedCategory,
      )
    : articles;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Articles
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            ログイン後に読む、最新の記事
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            microCMS
            のコンテンツをそのまま反映。ログイン後はこの一覧に着地して、気になる記事へ進めます。
          </p>
        </header>

        {normalizedCategories.length > 0 ? (
          <section className="flex flex-wrap items-center gap-2">
            <Link
              href="/articles"
              className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                selectedCategory
                  ? "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  : "border-slate-900 text-slate-900"
              }`}
            >
              All
            </Link>
            {normalizedCategories.map((item) => {
              const isActive =
                selectedCategory === item.id || selectedCategory === item.name;
              return (
                <Link
                  key={item.id}
                  href={`/articles?category=${encodeURIComponent(item.id)}`}
                  className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "border-slate-900 text-slate-900"
                      : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </section>
        ) : null}

        <section className="grid gap-6 md:grid-cols-2">
          {filteredContents.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-slate-500">
              まだ記事がありません。
            </div>
          ) : (
            filteredContents.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                {article.eyecatch?.url ? (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.eyecatch.url}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {formatArticleDate(article.publishedAt)}
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {article.title}
                    </h2>
                    {article.category ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {article.category.name}
                      </p>
                    ) : null}
                  </div>
                  <span className="mt-auto text-sm font-semibold text-slate-700 transition group-hover:text-slate-900">
                    続きを読む →
                  </span>
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
