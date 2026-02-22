import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PrimaryActionsProps = {
  isDisabled?: boolean;
};

export function PrimaryActions({ isDisabled = false }: PrimaryActionsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>主要アクション</CardTitle>
        <CardDescription>利用頻度の高い操作にすぐアクセスできます。</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button asChild>
          <Link href="/articles">記事一覧へ</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">ホームへ戻る</Link>
        </Button>
        <Button variant="secondary" disabled={isDisabled}>
          ログアウト（準備中）
        </Button>
      </CardContent>
    </Card>
  );
}
