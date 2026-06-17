import React from "react";

export interface TableThProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show sort chevrons */
  sort?: boolean;
  /** Current sort direction — highlights the active chevron */
  sortDir?: "asc" | "desc";
  /** Show filter icon */
  filter?: boolean;
  /** Highlight filter icon as active */
  filterActive?: boolean;
  onSort?: React.MouseEventHandler<HTMLSpanElement>;
  onFilter?: React.MouseEventHandler<HTMLSpanElement>;
}

export interface TableTdProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack primary + secondary text vertically */
  stack?: boolean;
  /** Primary text when stack=true */
  primary?: React.ReactNode;
  /** Secondary/description text when stack=true */
  secondary?: React.ReactNode;
}

export interface TableStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Determines dot colour and archived text dimming */
  variant?: "active" | "pending" | "draft" | "archived" | "info" | "danger";
}

export interface TableCountProps extends React.HTMLAttributes<HTMLSpanElement> {}

export interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Header cell with optional sort and filter icons */
export declare function TableTh(props: TableThProps): React.ReactElement;

/** Data cell — single-line by default; use stack=true for primary+secondary */
export declare function TableTd(props: TableTdProps): React.ReactElement;

/** Status pill: coloured dot + uppercase label */
export declare function TableStatus(props: TableStatusProps): React.ReactElement;

/** Inline count badge (e.g. "5/8") */
export declare function TableCount(props: TableCountProps): React.ReactElement;

/** A single data row */
export declare function TableRow(props: TableRowProps): React.ReactElement;

/** Root table container */
export declare function Table(props: TableProps): React.ReactElement;

export default Table;
