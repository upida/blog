<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Ref } from 'vue'

interface Experience {
  date: string
  position: string
  company: string | { name: string; url?: string }
}

interface Props {
  title?: string
  items: Experience[]
}

withDefaults(defineProps<Props>(), {
  title: 'Experience'
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
    <div class="space-y-8">
      <div 
        v-for="(exp, idx) in items" 
        :key="idx" 
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: `all 700ms ease-out`,
          transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
          borderColor: '#fcd34d'
        }"
        class="border-l-2 pl-6"
      >
        <div class="text-sm mb-2" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">{{ exp.date }}</div>
        <h3 class="text-sm font-normal mb-1" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">{{ exp.position }}</h3>
        <p v-if="typeof exp.company === 'string'" class="text-yellow-500 font-medium text-sm">
          {{ exp.company }}
        </p>
        <a v-else-if="exp.company?.url" :href="exp.company.url" target="_blank" rel="noopener noreferrer" class="text-yellow-500 font-medium text-sm hover:underline">
          {{ exp.company.name }}
        </a>
        <p v-else class="text-yellow-500 font-medium text-sm">
          {{ exp.company?.name }}
        </p>
      </div>
    </div>
  </div>
</template>
