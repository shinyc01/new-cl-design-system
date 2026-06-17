# BoardCard

Kanban-style card for the board / queue view. Represents an asset decision item moving through three workflow stages.

**Figma source:** IFS Iteration 2 › node 2468-20724

---

## Variants

| `type`          | Chip              | Shows                        |
|-----------------|-------------------|------------------------------|
| `queue`         | Critical risk (red) | Title, subtitle, location·cluster |
| `in-progress`   | Sent to decide (purple) | Title, location·cluster, progress bar |
| `completed`     | Resolved (neutral) | Title, location·cluster, Details + Report buttons |

The `state` prop forces the hover appearance (`"hover"`) for Storybook / design preview without requiring actual pointer interaction.

---

## Usage

```jsx
import { BoardCard } from "@ifs/ds/components/core/BoardCard";

// Queue — awaiting action
<BoardCard
  type="queue"
  title="South Hudson Substation"
  subtitle="Overload"
  location="South District"
  cluster="Hydro Feed Line 3 cluster"
  time="2 h ago"
/>

// Queue with elevated-risk decision context
<BoardCard
  type="queue"
  showDecision
  title="South Hudson Substation"
  subtitle="Overload"
  location="South District"
  cluster="Hydro Feed Line 3 cluster"
  time="2 h ago"
/>

// In-progress — decision sent, with custom progress
<BoardCard
  type="in-progress"
  title="South Hudson Substation"
  location="South District"
  cluster="Hydro Feed Line 3 cluster"
  time="2 h ago"
  progress={{ label: "Strategy", current: 1, total: 5 }}
/>

// Completed
<BoardCard
  type="completed"
  title="South Hudson Substation"
  location="South District"
  cluster="Hydro Feed Line 3 cluster"
  time="2 h ago"
  onDetails={() => navigate("/details")}
  onReport={() => navigate("/report")}
/>
```

---

## Token notes

| Value in Figma             | Token used                                          | Notes |
|----------------------------|-----------------------------------------------------|-------|
| `rgba(255,255,255,0.04)`   | `--white-50` (0.05)                                 | 1% delta; imperceptible |
| `rgba(255,255,255,0.08)`   | `--white-80`                                        | Added to colors.css in this pass |
| `rgba(186,23,23,0.20)`     | `color-mix(in srgb, var(--red-600) 20%, transparent)` | Critical chip bg |
| `rgba(160,59,242,0.20)`    | `color-mix(in srgb, var(--purple-500) 20%, transparent)` | Sent chip bg; purple hue differs slightly |
| `rgba(217,149,100,0.20)`   | `color-mix(in srgb, var(--copper-400) 20%, transparent)` | Elevated chip bg |
| `rgba(0,0,0,0.20)`         | `--black-200`                                       | Resolved chip bg |
| `rgba(255,255,255,0.50)`   | `--white-500`                                       | Secondary text / progress fill |
