type TocItem = {
  id: string;
  text: string;
  level: 1 | 2;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5"
      aria-label="目次"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        目次
      </p>
      <ol className="mt-4 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id} className={item.level === 2 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="transition hover:text-slate-900"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
