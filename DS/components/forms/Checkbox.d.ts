import * as React from "react";

/**
 * Labeled checkbox. Controlled (`checked`) or uncontrolled (`defaultChecked`);
 * set `indeterminate` for mixed parent state. Checked fill uses the brand accent (copper).
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  indeterminate?: boolean;
}

export declare function Checkbox(props: CheckboxProps): React.JSX.Element;
export default Checkbox;
