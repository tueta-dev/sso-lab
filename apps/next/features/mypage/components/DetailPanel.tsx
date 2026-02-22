import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DetailPanelProps = {
  isEmpty?: boolean;
};

const mockItems = [
  "通知設定は現在の設定を維持しています",
  "最近の活動履歴はありません",
  "セキュリティ通知はありません",
];

export function DetailPanel({ isEmpty = false }: DetailPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>詳細情報</CardTitle>
        <CardDescription>通知・履歴・アカウント状態を確認できます。</CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-600">
            表示できる詳細情報がありません。条件を変えて再度お試しください。
          </p>
        ) : (
          <ul className="space-y-3 text-sm text-slate-700">
            {mockItems.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
