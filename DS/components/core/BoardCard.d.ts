import React from "react";

export interface BoardCardProgressProps {
  /** Section label shown above the bar */
  label: string;
  /** Number of completed steps */
  current: number;
  /** Total number of steps */
  total: number;
}

export interface BoardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Workflow stage of the card.
   * - `queue`       — awaiting action; shows a Critical risk chip
   * - `in-progress` — decision sent; shows a "Sent to decide" chip + progress bar
   * - `completed`   — resolved; shows a resolved check chip + action buttons
   * @default "queue"
   */
  type?: "queue" | "in-progress" | "completed";
  /**
   * Force the hover appearance without actual pointer interaction.
   * Useful for Storybook / design previews.
   * @default "default"
   */
  state?: "default" | "hover";
  /** Asset / item title */
  title?: string;
  /**
   * Short descriptor shown beneath the title.
   * Only rendered when `type === "queue"`.
   */
  subtitle?: string;
  /** Location label shown in the meta row */
  location?: string;
  /** Cluster label shown in the meta row */
  cluster?: string;
  /** Relative timestamp, e.g. "2 h ago" */
  time?: string;
  /**
   * Show the "Elevated risk" chip alongside the Critical risk chip.
   * Only applies when `type === "queue"`.
   * @default false
   */
  showDecision?: boolean;
  /**
   * Progress bar data. Only rendered when `type === "in-progress"`.
   * Defaults to `{ label: "Strategy", current: 1, total: 5 }` when omitted.
   */
  progress?: BoardCardProgressProps;
  /**
   * Callback for the "Details" button.
   * Only rendered when `type === "completed"`.
   */
  onDetails?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Callback for the "Report" button.
   * Only rendered when `type === "completed"`.
   */
  onReport?: React.MouseEventHandler<HTMLButtonElement>;
}

/** Kanban-style board card for the queue / decision / completed workflow. */
export declare function BoardCard(props: BoardCardProps): React.ReactElement;
export default BoardCard;
