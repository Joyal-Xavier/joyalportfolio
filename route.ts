@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  @apply bg-paper-50 text-ink-900 dark:bg-graphite-950 dark:text-paper-100;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

::selection {
  @apply bg-signal-400/30 text-inherit;
}

/* visible keyboard focus ring, consistent across the site */
:focus-visible {
  outline: 2px solid theme("colors.copper.400");
  outline-offset: 3px;
  border-radius: 2px;
}

.bg-circuit {
  background-image: theme("backgroundImage.grid-light");
  background-size: theme("backgroundSize.grid");
}

.dark .bg-circuit {
  background-image: theme("backgroundImage.grid-dark");
  background-size: theme("backgroundSize.grid");
}

.eyebrow {
  @apply font-mono text-xs tracking-[0.25em] uppercase text-copper-500 dark:text-copper-400;
}

.section-heading {
  @apply text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-paper-50;
}

.hairline {
  @apply h-px w-full bg-gradient-to-r from-transparent via-ink-300/40 dark:via-ink-500/40 to-transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  @apply bg-signal-500/40 rounded-full;
}

@keyframes signal-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -240; }
}
.signal-dash {
  stroke-dasharray: 6 10;
  animation: signal-flow 3.2s linear infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
  50% { box-shadow: 0 0 24px 2px rgba(94, 234, 212, 0.16); }
}
.card-hover {
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.card-hover:hover {
  animation: glow-pulse 1.6s ease-in-out infinite;
  transform: translateY(-2px);
  border-color: rgba(94, 234, 212, 0.45) !important;
}

@keyframes blink-caret {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.type-caret {
  animation: blink-caret 0.9s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .signal-dash,
  .card-hover:hover,
  .type-caret {
    animation: none !important;
  }
}
