import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/microcms";
import { sanitizeRichText } from "@/lib/sanitize";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const revalidate = 60;

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <Link
            href="/articles"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
          >
            ← Back to Articles
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {formatDate(article.publishedAt)}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">
            {article.title}
          </h1>
        </div>

        {article.eyecatch?.url ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <Image
              src={article.eyecatch.url}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <article
          className="space-y-6 text-base leading-7 text-slate-700 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_a]:text-slate-900 [&_a]:underline [&_p]:leading-7"
          dangerouslySetInnerHTML={{
            __html: sanitizeRichText(article.content),
          }}
        />
      </div>
    </div>
  );
}
