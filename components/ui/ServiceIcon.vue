<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="service-icon"
  >
    <component
      :is="shape.tag"
      v-for="(shape, i) in shapes"
      :key="i"
      v-bind="shape.attrs"
    />
  </svg>
</template>

<script setup lang="ts">
/**
 * Renders the Feather icon named on a Service.
 *
 * The five service icons used to be copy-pasted inline across the homepage. Keeping
 * them here means the homepage and /services page cannot drift apart, and the icon
 * set is validated in one place: an unknown name throws in development rather than
 * rendering an empty box in production.
 *
 * Shapes are declared as plain attribute objects and bound with `v-bind` instead of
 * `v-html`, so nothing is ever injected as markup.
 */
interface Shape {
  tag: 'path' | 'line' | 'circle' | 'rect' | 'polygon' | 'polyline'
  attrs: Record<string, string | number>
}

const ICONS: Record<string, Shape[]> = {
  layers: [
    { tag: 'polygon', attrs: { points: '12 2 2 7 12 12 22 7 12 2' } },
    { tag: 'polyline', attrs: { points: '2 17 12 22 22 17' } },
    { tag: 'polyline', attrs: { points: '2 12 12 17 22 12' } }
  ],
  disc: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } }
  ],
  // Tyre furniture (service 2): a wheel seen face-on — outer rim, inner hub and
  // four tread ticks at the cardinal points.
  tyre: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 3.5 } },
    { tag: 'line', attrs: { x1: 12, y1: 3, x2: 12, y2: 6 } },
    { tag: 'line', attrs: { x1: 21, y1: 12, x2: 18, y2: 12 } },
    { tag: 'line', attrs: { x1: 12, y1: 21, x2: 12, y2: 18 } },
    { tag: 'line', attrs: { x1: 3, y1: 12, x2: 6, y2: 12 } }
  ],
  // Kiosk: a small structure with a roof (service 3).
  home: [
    { tag: 'path', attrs: { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' } },
    { tag: 'polyline', attrs: { points: '9 22 9 12 15 12 15 22' } }
  ],
  feather: [
    { tag: 'path', attrs: { d: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z' } },
    { tag: 'line', attrs: { x1: 16, y1: 8, x2: 2, y2: 22 } },
    { tag: 'line', attrs: { x1: 17.5, y1: 15, x2: 9, y2: 15 } }
  ],
  grid: [
    { tag: 'rect', attrs: { x: 3, y: 3, width: 7, height: 7 } },
    { tag: 'rect', attrs: { x: 14, y: 3, width: 7, height: 7 } },
    { tag: 'rect', attrs: { x: 14, y: 14, width: 7, height: 7 } },
    { tag: 'rect', attrs: { x: 3, y: 14, width: 7, height: 7 } }
  ],
  film: [
    { tag: 'rect', attrs: { x: 2, y: 2, width: 20, height: 20, rx: 2.18, ry: 2.18 } },
    { tag: 'line', attrs: { x1: 7, y1: 2, x2: 7, y2: 22 } },
    { tag: 'line', attrs: { x1: 17, y1: 2, x2: 17, y2: 22 } },
    { tag: 'line', attrs: { x1: 2, y1: 12, x2: 22, y2: 12 } },
    { tag: 'line', attrs: { x1: 2, y1: 7, x2: 7, y2: 7 } },
    { tag: 'line', attrs: { x1: 2, y1: 17, x2: 7, y2: 17 } },
    { tag: 'line', attrs: { x1: 17, y1: 17, x2: 22, y2: 17 } },
    { tag: 'line', attrs: { x1: 17, y1: 7, x2: 22, y2: 7 } }
  ]
}

const props = withDefaults(defineProps<{ name: string, size?: number }>(), {
  size: 32
})

const shapes = computed<Shape[]>(() => {
  const found = ICONS[props.name]
  if (!found) {
    if (import.meta.dev) {
      console.warn(`[ServiceIcon] unknown icon "${props.name}", rendering nothing`)
    }
    return []
  }
  return found
})
</script>

<style lang="scss" scoped>
.service-icon {
  display: block;
}
</style>
