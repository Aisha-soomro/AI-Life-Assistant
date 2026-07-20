import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type ChartCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <Card className={`p-5 ${className}`}>
      <h3 className="mb-3 text-sm font-semibold text-slate-300">{title}</h3>
      {children}
    </Card>
  );
}
