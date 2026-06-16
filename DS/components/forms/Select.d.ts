import * as React from "react";

export type SelectSize = "sm" | "md" | "lg";
export interface SelectOption { value: string; label: string; }

/**
 * Native `<select>` styled to the IFS Copperleaf system with a custom chevron.
 * Supply `options` (strings or {value,label}) or pass `<option>` children.
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** @default "md" */
  size?: SelectSize;
  /** Options list — strings or {value,label} objects. */
  options?: Array<string | SelectOption>;
  /** Disabled leading placeholder option. */
  placeholder?: string;
}

export declare function Select(props: SelectProps): React.JSX.Element;
export default Select;
