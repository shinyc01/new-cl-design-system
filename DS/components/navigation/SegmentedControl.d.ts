import * as React from "react";

export interface SegmentOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Segmented control — a small set of mutually-exclusive options inside one
 * track (e.g. the 3D / 2D chart toggle). Controlled via `value`/`onChange`.
 */
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<string | SegmentOption>;
  value: string;
  onChange?: (value: string) => void;
  /** @default "md" */
  size?: "sm" | "md";
}

export declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;
export default SegmentedControl;
