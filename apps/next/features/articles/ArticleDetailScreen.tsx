import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/microcms";
import TableOfContents from "@/features/articles/components/TableOfContents";
import { formatArticleDate } from "@/features/articles/format";
import { sanitizeRichText } from "@/features/articles/lib/sanitize";
import { buildTocFromHtml } from "@/features/articles/lib/toc";

type ArticleDetailScreenProps = {
  article: Article;
  isPreview?: boolean;
};

export default function ArticleDetailScreen({
  article,
  isPreview = false,
}: ArticleDetailScreenProps) {
  const { html: htmlWithIds, items: tocItems } = buildTocFromHtml(
    article.content,
  );
  const sanitizedHtml = sanitizeRichText(htmlWithIds);

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
            {formatArticleDate(article.publishedAt)}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">
            {article.title}
          </h1>
          {isPreview ? (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Preview
            </span>
          ) : null}
        </div>

        <TableOfContents items={tocItems} />

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
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{
            __html: sanitizedHtml,
          }}
        />
      </div>
    </div>
  );
}
