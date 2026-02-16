<script setup lang="ts">
import type { Ref } from 'vue'

interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'About Me'
})

const isDark = inject('isDark', ref(false)) as Ref<boolean>
const { element, isVisible } = useIntersectionObserver()
</script>

<template>
  <div
    ref="element"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'all 700ms ease-out'
    }"
  >
    <h2 class="text-3xl font-bold mb-6 font-sans" :style="{ color: isDark ? 'white' : 'black' }">
      {{ title }}
    </h2>
    <p class="font-normal font-sans text-sm leading-relaxed whitespace-pre-wrap" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
      {{ description }}
    </p>
  </div>
</template>
