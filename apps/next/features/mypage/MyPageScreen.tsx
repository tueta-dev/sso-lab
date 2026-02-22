import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StatusBanner } from "./components/StatusBanner";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { SummaryCards } from "./components/SummaryCards";
import { PrimaryActions } from "./components/PrimaryActions";
import { DetailPanel } from "./components/DetailPanel";
import type { MyPageSummaryItem, MyPageViewState } from "./types";

type MyPageScreenProps = {
  viewState?: MyPageViewState;
};

const summaryItems: MyPageSummaryItem[] = [
  { label: "表示名", value: "未設定" },
  { label: "メール", value: "未設定" },
  { label: "最終ログイン", value: "未設定" },
  { label: "認証状態", value: "ログイン中" },
];

export default function MyPageScreen({ viewState = "normal" }: MyPageScreenProps) {
  const isLoading = viewState === "loading";
  const isError = viewState === "error";
  const isEmpty = viewState === "empty";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:py-14">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Account
            </p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              マイページ
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              ログイン中のアカウント情報と、よく使う操作への導線をまとめて確認できます。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">ログイン画面</Link>
            </Button>
            <Button disabled>プロフィール編集（準備中）</Button>
          </div>
        </header>

        {isError ? (
          <StatusBanner
            tone="error"
            message="情報の取得に失敗しました。時間をおいて再試行してください。"
          />
        ) : (
          <StatusBanner message="認証状態: ログイン中 / データ連携状態: 一部未連携" />
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <SummaryCards items={summaryItems} />
            <section className="grid gap-4 lg:grid-cols-2">
              <PrimaryActions isDisabled={isError} />
              <DetailPanel isEmpty={isEmpty} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
