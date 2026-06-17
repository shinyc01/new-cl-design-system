import * as React from "react";

export interface SidebarChildItem {
  id: string;
  label: React.ReactNode;
  /** Optional edit callback triggered by the pencil-plus hover button. */
  onEdit?: (id: string) => void;
}

export interface SidebarParentItem {
  id: string;
  label: React.ReactNode;
}

export interface SidebarSection {
  /** Section heading label (uppercase, disabled colour). */
  sectionLabel: string;
  children: SidebarChildItem[];
}

export type SidebarEntry = SidebarParentItem | SidebarSection;

/**
 * Collapsible side navigation panel. Supports flat parent items and labelled
 * sections with indented child items. Controlled — pass `value` and `onChange`.
 *
 * @startingPoint section="Navigation" subtitle="Side nav" viewport="300x500"
 */
export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Panel heading shown in the title row (uppercase). */
  title?: string;
  /** Flat list of entries — parent items or section groups with children. */
  items?: SidebarEntry[];
  /** id of the currently active nav item. */
  value?: string;
  onChange?: (id: string) => void;
  /**
   * Controlled collapsed state. When provided the component is fully
   * controlled — pair with `onToggle` to update external state.
   */
  collapsed?: boolean;
  /** Initial collapsed state for uncontrolled usage. */
  defaultCollapsed?: boolean;
  /** Called when the user clicks the collapse/expand icon button. */
  onToggle?: (collapsed: boolean) => void;
}

export declare function Sidebar(props: SidebarProps): React.JSX.Element;
export default Sidebar;
