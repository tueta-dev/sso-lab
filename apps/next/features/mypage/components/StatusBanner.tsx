import { cn } from "@/lib/utils";

type StatusBannerProps = {
  message: string;
  tone?: "info" | "error";
};

const toneClassMap = {
  info: "border-sky-200 bg-sky-50 text-sky-900",
  error: "border-red-200 bg-red-50 text-red-900",
} as const;

export function StatusBanner({ message, tone = "info" }: StatusBannerProps) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-medium",
        toneClassMap[tone],
      )}
    >
      {message}
    </div>
  );
}
