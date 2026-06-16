import * as React from "react";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  /** Optional leading icon (ReactNode SVG). */
  icon?: React.ReactNode;
  /** Optional trailing count pill. */
  count?: number;
}

/**
 * Underline tab bar for switching between views (e.g. Overview / Map / Capital
 * Flow). Controlled — pass `value` and handle `onChange`. Items may be plain
 * strings (id === label) or {id,label,icon,count}.
 *
 * @startingPoint section="Navigation" subtitle="Underline tabs" viewport="700x120"
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: Array<string | TabItem>;
  /** id of the active tab. */
  value: string;
  onChange?: (id: string) => void;
  /** Remove the bottom divider. */
  plain?: boolean;
}

export declare function Tabs(props: TabsProps): React.JSX.Element;
export default Tabs;
