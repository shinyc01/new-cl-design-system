import type { CSSProperties } from "react";

export interface SmartSearchProps {
  /** Input placeholder. Default: "Ask anything…" */
  placeholder?: string;
  /** Full list of suggestion strings to filter against as the user types. */
  suggestions?: string[];
  /** Controlled value. */
  value?: string;
  /** Uncontrolled default value. */
  defaultValue?: string;
  /** Controlled input mode. */
  mode?: "text" | "voice";
  /** Uncontrolled default mode. Default: "text" */
  defaultMode?: "text" | "voice";
  /** Fires when the mic/keyboard toggle is clicked. */
  onModeChange?: (mode: "text" | "voice") => void;
  /** Fires on every keystroke with the current input value. */
  onChange?: (value: string) => void;
  /** Fires when the user presses Enter or picks a suggestion. */
  onSearch?: (value: string) => void;
  /** Fires when the user clicks the × clear button. */
  onClear?: () => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export declare function SmartSearch(props: SmartSearchProps): JSX.Element;
export default SmartSearch;
