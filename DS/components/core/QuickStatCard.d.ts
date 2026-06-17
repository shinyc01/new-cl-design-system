import * as React from "react";

/**
 * Compact KPI tile for investment and asset detail overview screens.
 * Shows a metric label, a large value, and an optional description line.
 * Typically used in a 4-up grid.
 */
export interface QuickStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label displayed above the value. */
  title: string;
  /** Large primary value (e.g. "$4.2M", "87", "4.2 / 5"). */
  value: string | number;
  /** Optional subdued context line below the value (e.g. "FY2025–2026 · CapEx"). */
  desc?: string;
}

export declare function QuickStatCard(props: QuickStatCardProps): React.JSX.Element;
export default QuickStatCard;
