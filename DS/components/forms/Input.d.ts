import * as React from "react";

export type InputSize = "sm" | "md" | "lg";

/**
 * Single-line text field with label, hint/error messaging and optional
 * leading/trailing affixes (icons or units). Forwards all native input props.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message — overrides hint and applies error styling. */
  error?: React.ReactNode;
  /** Show a required asterisk on the label. */
  required?: boolean;
  /** @default "md" */
  size?: InputSize;
  /** Leading affix (icon / unit). */
  leading?: React.ReactNode;
  /** Trailing affix (icon / unit). */
  trailing?: React.ReactNode;
}

export declare function Input(props: InputProps): React.JSX.Element;
export default Input;
