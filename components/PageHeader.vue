<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Ref } from 'vue'

interface Props {
  isLoading?: boolean
  title?: string
  description?: string
  links?: Array<{ label: string; to: string; icon: string }>
}

withDefaults(defineProps<Props>(), {
  isLoading: false
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
    class="flex flex-col items-center justify-center min-h-screen pt-20 px-6 py-12"
  >
    <!-- Title & Description Loading -->
    <div class="max-w-3xl text-center mb-12 w-full">
      <h1 v-if="isLoading" :style="{ backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)' }" class="h-12 rounded animate-pulse mb-4"></h1>
      <h1 v-else class="text-4xl md:text-5xl font-bold mb-6 font-sans" :style="{ color: isDark ? 'white' : 'black' }">
        {{ title }}
      </h1>
      
      <div v-if="isLoading" :style="{ backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)' }" class="h-6 rounded animate-pulse mb-2"></div>
      <p v-else class="text-sm leading-relaxed" :style="{ color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(82, 82, 91, 1)' }">
        {{ description }}
      </p>
    </div>

    <!-- Links -->
    <div v-if="!isLoading && links" class="flex gap-4 flex-wrap justify-center">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.to"
        target="_blank"
        rel="noopener noreferrer"
        :style="{
          borderColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(218, 222, 224, 1)',
          color: isDark ? 'rgba(209, 213, 219, 1)' : 'rgba(82, 82, 91, 1)',
          backgroundColor: 'transparent'
        }"
        class="px-6 py-3 rounded-lg border transition-colors text-sm font-medium flex items-center gap-2 hover:transition-all"
        @mouseenter="($event.target as HTMLElement).style.backgroundColor = isDark ? 'rgba(31, 41, 55, 1)' : 'rgba(244, 244, 245, 1)'"
        @mouseleave="($event.target as HTMLElement).style.backgroundColor = 'transparent'"
      >
        <Icon :icon="link.icon" class="w-4 h-4" />
        {{ link.label }}
      </a>
    </div>
  </div>
</template>