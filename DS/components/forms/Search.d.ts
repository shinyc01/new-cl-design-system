import type { CSSProperties } from "react";

export interface SearchProps {
  /** Input placeholder text. Default: "Search for…" */
  placeholder?: string;
  /** Full list of suggestion strings to filter against as the user types. */
  suggestions?: string[];
  /** Controlled value. */
  value?: string;
  /** Uncontrolled default value. */
  defaultValue?: string;
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

export declare function Search(props: SearchProps): JSX.Element;
export default Search;
