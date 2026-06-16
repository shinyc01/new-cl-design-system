import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

/**
 * User avatar. Renders the photo at `src`, or auto-colored initials derived
 * from `name` when no image is supplied.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for initials + deterministic fallback color + title. */
  name?: string;
  /** Image URL; omit for initials. */
  src?: string;
  /** @default "md" */
  size?: AvatarSize;
  /** Rounded-square instead of circle. */
  square?: boolean;
}

export interface Person { name: string; src?: string; }

/** Overlapping avatar stack with a +N overflow chip. */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
  people: Person[];
  /** Max avatars before collapsing to +N. @default 4 */
  max?: number;
  size?: AvatarSize;
}

export declare function Avatar(props: AvatarProps): React.JSX.Element;
export declare function AvatarGroup(props: AvatarGroupProps): React.JSX.Element;
export default Avatar;
