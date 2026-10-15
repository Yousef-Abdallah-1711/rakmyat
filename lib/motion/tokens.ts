export const motionTokens = {
  duration: {
    instant: 100,
    fast: 180,
    standard: 300,
    slow: 500,
    cinematic: 1000,
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  reveal: {
    distance: 16,
    visibilityPercent: 30,
    once: true,
  },
  stagger: 80,
} as const
