import * as React from "react";

/** On/off toggle switch with optional label. Active track uses the brand accent (copper). */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md";
}

export declare function Switch(props: SwitchProps): React.JSX.Element;
export default Switch;
