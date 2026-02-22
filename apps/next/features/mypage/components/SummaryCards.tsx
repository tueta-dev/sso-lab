import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MyPageSummaryItem } from "../types";

type SummaryCardsProps = {
  items: MyPageSummaryItem[];
};

export function SummaryCards({ items }: SummaryCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="gap-3">
          <CardHeader className="space-y-1 pb-0">
            <CardDescription className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {item.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              {item.value}
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
