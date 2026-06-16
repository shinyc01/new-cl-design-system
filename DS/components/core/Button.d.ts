import * as React from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "tertiary" | "ghost" | "negative";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Primary interactive control for the IFS Copperleaf system.
 *
 * `primary` is the white-on-dark default action; `accent` is the purple brand
 * action; `secondary`/`tertiary`/`ghost` step down in emphasis; `negative` is
 * destructive. Pass `iconOnly` with a single icon child for square icon buttons,
 * or `leadingIcon`/`trailingIcon` (ReactNode SVGs) alongside a label.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: ButtonVariant;
  /** Control height: sm 24 / md 32 / lg 40. @default "md" */
  size?: ButtonSize;
  /** Icon (ReactNode SVG) before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon (ReactNode SVG) after the label. */
  trailingIcon?: React.ReactNode;
  /** Render a square icon-only button using the single child as the icon. */
  iconOnly?: boolean;
  /** Stretch to fill the container width. */
  block?: boolean;
}

export declare function Button(props: ButtonProps): React.JSX.Element;
export default Button;
