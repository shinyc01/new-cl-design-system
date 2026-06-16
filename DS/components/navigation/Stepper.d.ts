import * as React from "react";

export interface StepItem { label: React.ReactNode; }

/**
 * Horizontal progress stepper for multi-stage workflows such as the strategy
 * pipeline (Input → Shape → Review → Publish). Steps before `current` render
 * as completed (purple check), `current` is active, the rest are upcoming.
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step labels — strings or {label}. */
  steps: Array<string | StepItem>;
  /** Zero-based index of the active step. @default 0 */
  current?: number;
  /** Optional click handler (receives the step index). */
  onStepClick?: (index: number) => void;
}

export declare function Stepper(props: StepperProps): React.JSX.Element;
export default Stepper;
