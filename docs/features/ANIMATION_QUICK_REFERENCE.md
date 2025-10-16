# GSAP Scroll Animations - Quick Reference

## 🎬 Animation Sections Overview

### 1. Hero Section
**Location**: Lines 370-451 in [app/page.tsx](app/page.tsx#L370-L451)

**Animations**:
- ✨ Sequential headline reveal with blur effects
- 📝 Paragraph fade-in with stagger
- 🎴 Floating cards with bounce entrance

**Key Code**:
```javascript
// Timeline-based sequential animation
const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: heroLine1Ref.current,
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
})

heroTimeline
  .fromTo(line1, { opacity: 0, y: 30, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' })
  .fromTo(line2, { opacity: 0, y: 30, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' }, '-=0.4')
```

---

### 2. Problem Section
**Location**: Lines 466-484 in [app/page.tsx](app/page.tsx#L466-L484)

**Animations**:
- 🔍 Scrub animation (blur to clear) on headline
- 📌 Pin animation on quote block (desktop only)
- 📱 Simplified fade-in on mobile

**Key Code**:
```javascript
// Scrub animation - tied to scroll position
gsap.fromTo(
  headline,
  { opacity: 0.3, filter: 'blur(10px)', scale: 0.95 },
  {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    scrollTrigger: {
      trigger: headline,
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1, // Smooth scroll-linked animation
    },
  }
)

// Pin animation (desktop only)
if (!isMobile) {
  ScrollTrigger.create({
    trigger: quote,
    start: 'top center',
    end: '+=300',
    pin: true,
    pinSpacing: true,
  })
}
```

---

### 3. Solution Section
**Location**: Lines 522-558 in [app/page.tsx](app/page.tsx#L522-L558)

**Animations**:
- 📊 Staggered card entrance from bottom
- 🎯 Three exam-specific benefit cards

**Key Code**:
```javascript
// Stagger multiple elements
gsap.fromTo(
  [card1, card2, card3],
  { opacity: 0, y: 100, scale: 0.9 },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.2, // 0.2s delay between each card
    ease: 'power3.out',
  }
)
```

---

### 4. Bento Grid Features
**Location**: Lines 645-749 in [app/page.tsx](app/page.tsx#L645-L749)

**Animations**:
- 🔢 Batch animation for efficiency
- 🎴 Individual card triggers

**Key Code**:
```javascript
// Batch processing for multiple elements
const bentoCards = bentoGridRef.current?.querySelectorAll('.bento-card')
ScrollTrigger.batch(bentoCards, {
  onEnter: (batch) => {
    gsap.fromTo(
      batch,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
      }
    )
  },
  start: 'top 85%',
})
```

---

### 5. Final CTA
**Location**: Lines 758-778 in [app/page.tsx](app/page.tsx#L758-L778)

**Animations**:
- 💬 Word-by-word headline reveal
- 🎯 Bouncing CTA button

**Key Code**:
```javascript
// Word-by-word reveal
const words = headline.querySelectorAll('.word')
gsap.fromTo(
  words,
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1, // Each word appears 0.1s after previous
  }
)

// Bounce effect
gsap.fromTo(
  button,
  { scale: 0, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    ease: 'back.out(1.7)', // Bounce easing
  }
)
```

---

## 🎛️ Key Animation Parameters

### Timing
- `duration`: How long the animation takes (in seconds)
- `delay`: Wait time before animation starts
- `stagger`: Delay between animating multiple elements

### Easing Functions
- `power2.out`: Smooth deceleration
- `power3.out`: More pronounced deceleration
- `back.out(1.7)`: Bounce/spring effect
- `power2.inOut`: Ease in and out

### ScrollTrigger Settings
- `start: 'top 80%'`: Animation starts when element is 80% down viewport
- `end: 'top 30%'`: Animation ends when element is 30% down viewport
- `scrub: 1`: Smooth scroll-linked animation (1s smoothing)
- `toggleActions: 'play none none none'`: Play once, no reverse
- `pin: true`: Pin element in place while scrolling

---

## 📱 Responsive Behavior

### Mobile Optimizations (< 768px):
```javascript
const isMobile = window.innerWidth < 768

// Reduced blur for performance
filter: isMobile ? 'blur(5px)' : 'blur(10px)'

// Disable complex animations on mobile
if (!isMobile) {
  // Pin animation only on desktop
  ScrollTrigger.create({ pin: true })
} else {
  // Simple fade-in on mobile
  gsap.fromTo({ opacity: 0 }, { opacity: 1 })
}
```

---

## 🛠️ Customization Guide

### Adjusting Animation Speed
```javascript
// Faster
duration: 0.5

// Slower
duration: 1.5

// Instant
duration: 0
```

### Changing Trigger Points
```javascript
// Start earlier
start: 'top 100%'  // When element just enters viewport

// Start later
start: 'top 50%'   // When element is halfway down viewport

// Start at center
start: 'top center'
```

### Modifying Easing
```javascript
// Smooth
ease: 'power2.out'

// Snappy
ease: 'power4.out'

// Bounce
ease: 'back.out(1.7)'

// Elastic
ease: 'elastic.out(1, 0.3)'
```

### Stagger Patterns
```javascript
// Sequential
stagger: 0.2

// From center
stagger: {
  from: 'center',
  amount: 0.5
}

// Random
stagger: {
  from: 'random',
  amount: 0.5
}
```

---

## 🐛 Debugging Tips

### View ScrollTrigger Markers
```javascript
scrollTrigger: {
  trigger: element,
  markers: true, // Shows start/end points
}
```

### Log Animation Progress
```javascript
gsap.to(element, {
  x: 100,
  onStart: () => console.log('Animation started'),
  onUpdate: () => console.log('Animating...'),
  onComplete: () => console.log('Animation complete'),
})
```

### Check Animation State
```javascript
// Get all ScrollTriggers
ScrollTrigger.getAll()

// Refresh ScrollTrigger (after layout changes)
ScrollTrigger.refresh()

// Kill all ScrollTriggers
ScrollTrigger.getAll().forEach(trigger => trigger.kill())
```

---

## 🚀 Performance Best Practices

### ✅ DO:
- Use transforms (x, y, scale, rotation) for animations
- Batch similar animations together
- Set `will-change: transform` for frequently animated elements
- Use `gsap.context()` for proper cleanup
- Reduce blur intensity on mobile

### ❌ DON'T:
- Animate `top`, `left`, `width`, `height` (use transforms instead)
- Create individual ScrollTriggers for every element
- Use heavy animations on mobile
- Forget to cleanup animations on unmount
- Animate too many elements simultaneously

---

## 📚 Resources

### GSAP Documentation:
- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Easing Visualizer](https://gsap.com/docs/v3/Eases)

### Project Files:
- Main Implementation: [app/page.tsx](app/page.tsx)
- Custom Hook: [hooks/useGSAP.ts](hooks/useGSAP.ts)
- Full Documentation: [GSAP_SCROLL_ANIMATIONS_IMPLEMENTATION.md](GSAP_SCROLL_ANIMATIONS_IMPLEMENTATION.md)

---

## 🎯 Quick Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

---

## 💡 Pro Tips

1. **Test on Real Devices**: Animations feel different on mobile vs desktop
2. **Use Scrub Sparingly**: Scroll-linked animations can feel janky if overdone
3. **Keep Mobile Simple**: Fewer, lighter animations on mobile
4. **Stagger for Impact**: Sequential reveals are more engaging than simultaneous
5. **Cleanup is Critical**: Always use `gsap.context()` and cleanup in `useEffect`

Happy Animating! 🎉
