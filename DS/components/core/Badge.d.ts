import * as React from "react";

export type BadgeTone = "neutral" | "purple" | "copper" | "success" | "danger" | "warning" | "info";
export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Compact status / category label. Use `soft` (default) for inline status,
 * `solid` for emphasis, `outline` for quiet tags. Set `dot` for a leading
 * status dot (e.g. Active / Draft) or `square` for a rectangular chip.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. @default "neutral" */
  tone?: BadgeTone;
  /** Fill style. @default "soft" */
  variant?: BadgeVariant;
  /** @default "md" */
  size?: BadgeSize;
  /** Show a leading status dot. */
  dot?: boolean;
  /** Square (radius-sm) instead of pill. */
  square?: boolean;
  /** Optional leading icon (ReactNode SVG). */
  icon?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): React.JSX.Element;
export default Badge;
