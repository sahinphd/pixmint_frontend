<template>
  <a class="navbar-brand glowing-brand">
    <span class="brand-text">PixMint</span>
  </a>
</template>

<script setup>
// No props needed for this simple component
</script>

<style scoped>
.glowing-brand {
  --base-font-size: 1.5rem;
  --animation-duration: 4s;
  --bang-duration: 3s;
  --color-primary: #60a5fa;
  --color-secondary: #a78bfa;
  --color-tertiary: #fb7185;
  --color-quaternary: #fbbf24;
  --color-quinary: #34d399;
  --color-senary: #38bdf8;
  --border-radius: 0.5em; /* New rounded corners variable */
  
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  will-change: transform;
  border-radius: var(--border-radius); /* Applied to container */
  padding: 0.25em 0.75em; /* Added padding to accommodate rounded corners */
}

.brand-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: var(--base-font-size);
  font-weight: 800;
  letter-spacing: 0.1em;
  position: relative;
  display: inline-block;
  
  /* Rounded corners for text container */
  border-radius: calc(var(--border-radius) * 0.8);
  padding: 0.1em 0.3em;
  
  /* Optimized text rendering */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* Initial state */
  color: var(--color-primary);
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  
  /* Animation */
  animation: colorShift var(--animation-duration) linear infinite;
  
  /* Transition for hover effects */
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Moving glow effect with rounded corners */
.brand-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 20%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.8) 80%,
    transparent 100%
  );
  animation: movingBang var(--bang-duration) ease-in-out infinite;
  z-index: -1;
  mix-blend-mode: overlay;
  transform: translateZ(0);
  will-change: left, opacity;
  border-radius: inherit; /* Inherits rounded corners from parent */
}

/* Hover effects with rounded corners */
.brand-text:hover {
  transform: scale(1.05) translateZ(0);
  /* Subtle background on hover */
  background-color: rgba(255, 255, 255, 0.1);
}

/* Responsive rounded corners */
@media (max-width: 768px) {
  .glowing-brand {
    --border-radius: 0.4em;
    padding: 0.2em 0.6em;
  }
}

@media (min-width: 1024px) {
  .glowing-brand {
    --border-radius: 0.6em;
    padding: 0.3em 0.9em;
  }
}

/* Rest of the styles remain the same as previous version */
@keyframes movingBang {
  0% {
    left: -100%;
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes colorShift {
  0%, 100% {
    color: var(--color-primary);
  }
  16.66% {
    color: var(--color-secondary);
  }
  33.33% {
    color: var(--color-tertiary);
  }
  50% {
    color: var(--color-quaternary);
  }
  66.66% {
    color: var(--color-quinary);
  }
  83.33% {
    color: var(--color-senary);
  }
}

.glowing-brand.fast {
  --animation-duration: 2s;
  --bang-duration: 1.5s;
}

.glowing-brand.slow {
  --animation-duration: 6s;
  --bang-duration: 4s;
}

.glowing-brand.enhanced .brand-text::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.9) 10%,
    rgba(255, 255, 255, 1) 30%,
    rgba(255, 255, 255, 1) 70%,
    rgba(255, 255, 255, 0.9) 90%,
    transparent 100%
  );
}

.glowing-brand.subtle .brand-text::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 30%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.4) 70%,
    transparent 100%
  );
  opacity: 0.7;
}

@media (prefers-reduced-motion: reduce) {
  .brand-text {
    animation: none !important;
    color: var(--color-primary) !important;
  }
  
  .brand-text::before {
    animation: none !important;
    display: none !important;
  }
  
  .brand-text:hover {
    transform: none !important;
  }
}

@media (prefers-contrast: high) {
  .brand-text {
    font-weight: 900;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
  
  .brand-text::before {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  .brand-text::before {
    mix-blend-mode: soft-light;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.6) 20%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.6) 80%,
      transparent 100%
    );
  }
}
</style>