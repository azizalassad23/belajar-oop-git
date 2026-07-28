# Page Override — `index.html` + `materi.html` (LMS Surface)

> Overrides `../MASTER.md` for these two pages only.
> `ujian.html` is NOT covered here — it follows MASTER.md (dark developer-tool surface).

**Reason for override:** MASTER.md resolved this project to *API Developer Portal / Modern Dark*,
which fits the live-coding exam screen but not the course catalogue and reading pages. Those are
an **LMS (Learning Management System)** surface: light background, course grid, progress tracking.
Source: `--domain product "online course learning management student progress"` →
*LMS → Flat Design + Accessible & Ethical, Dashboard + Course Grid, calm blue + grade green*.

---

## Palette (light surface)

| Role | Hex | Token |
|------|-----|-------|
| Primary | `#2563EB` | `--primary` |
| Primary hover | `#1D4ED8` | `--primary-dark` |
| Accent | `#7C3AED` | `--accent` |
| Background | `#F8FAFC` | `--surface-2` |
| Card | `#FFFFFF` | `--surface` |
| Foreground | `#0F172A` | `--text` |
| Body text | `#475569` | `--text-soft` |
| Muted (on light) | `#64748B` | `--muted` — 4.8:1 on white |
| Muted (on dark) | `#94A3B8` | `--muted-dark` — 7:1 on `#0F172A` |
| Grade green | `#16A34A` | `--success` |
| Destructive | `#DC2626` | `--danger` |

**Two muted tokens are mandatory.** A single `#94A3B8` fails 4.5:1 on white (2.6:1). Use
`--muted` on light surfaces and `--muted-dark` on the topbar/exam/dark surfaces only.

**Badge text must not use the 500-weight brand colour on its own tint** — `#16A34A` on `#DCFCE7`
is 2.97:1 and `#D97706` on `#FEF3C7` is 2.89:1. Use the 800-weight pair instead
(`#166534` / `#92400E`), which lands at 6.5:1.

## Typography

Keep the system font stack (`system-ui`). MASTER.md recommends IBM Plex Sans + JetBrains Mono;
that is a webfont dependency, and this site is a GitHub Pages build whose reading pages must work
offline. Monospace stays local (`Cascadia Code`/`Fira Code`/`JetBrains Mono` if installed).

**Minimum body size 12px.** Badges/eyebrows previously at `.70–.72rem` (11.2px) are raised to
`.75rem` (12px).

## Motion

Motion dial 3/10 (Subtle). No GSAP — CSS transitions of 150–300ms only. Every animation must be
neutralised under `prefers-reduced-motion: reduce`, including the exam timer's infinite pulse
(replace with a non-animated colour state, not just a stopped animation).

## Layout

Breakpoints: 375 / 768 / 1024 / 1440. Container max-width `1180px`.
Do not use `100vh` for full-height shells — mobile URL bars clip it. Use `100dvh` with a `100vh`
fallback.

## Touch targets

`.btn` ≥ 44px tall. `.btn-sm` may be 36px on fine pointers but must expand to 44px under
`@media (pointer: coarse)`.
