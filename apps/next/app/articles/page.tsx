import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/microcms";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const revalidate = 60;

export default async function ArticlesPage() {
  try {
    const { contents } = await getArticles();

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
              microCMS のコンテンツをそのまま反映。ログイン後はこの一覧に着地して、気になる記事へ進めます。
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {contents.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-slate-500">
                まだ記事がありません。
              </div>
            ) : (
              contents.map((article) => (
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
                        {formatDate(article.publishedAt)}
                      </p>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {article.title}
                      </h2>
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
