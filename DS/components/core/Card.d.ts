import * as React from "react";

export type CardVariant = "default" | "elevated" | "flush";
export type CardPadding = "sm" | "md" | "lg";

/**
 * Surface container for dashboard widgets, panels and list items. Provide
 * `title`/`subtitle`/`action` to render the standard header row, or just pass
 * children for a bare surface. `elevated` adds a drop shadow; `flush` removes
 * chrome; `interactive` adds hover affordance for clickable cards.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: CardVariant;
  /** Inner padding. @default "md" */
  padding?: CardPadding;
  /** Hover affordance for clickable cards. */
  interactive?: boolean;
  /** Header title. */
  title?: React.ReactNode;
  /** Header subtitle below the title. */
  subtitle?: React.ReactNode;
  /** Right-aligned header action (buttons, menu). */
  action?: React.ReactNode;
}

export declare function Card(props: CardProps): React.JSX.Element;
export default Card;
