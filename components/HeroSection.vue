<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Ref } from 'vue'

interface Props {
  isLoading?: boolean
  picture?: {
    light: string
    alt?: string
  }
  title?: string
  description?: string
  links?: Array<{
    label: string
    to: string
  }>
}

withDefaults(defineProps<Props>(), {
  isLoading: false
})

const isDark = inject('isDark', ref(false)) as Ref<boolean>
const { element, isVisible } = useIntersectionObserver({ threshold: 0.3 })

const getIconName = (label: string) => {
  const labelLower = label.toLowerCase()
  if (labelLower.includes('github')) return 'simple-icons:github'
  if (labelLower.includes('linkedin')) return 'simple-icons:linkedin'
  if (labelLower.includes('email') || labelLower.includes('mail')) return 'lucide:mail'
  return 'simple-icons:github'
}
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
    <!-- Profile Image Badge -->
    <div class="mb-8">
      <div 
        v-if="isLoading" 
        :style="{
          backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
        }"
        class="w-40 h-40 rounded-full animate-pulse"
      ></div>
      <div v-else class="relative w-40 h-40 rounded-full border-1 border-yellow-500 p-1">
        <img 
          :src="picture?.light"
          :alt="picture?.alt || 'Profile'"
          class="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>

    <!-- Title -->
    <div v-if="isLoading" class="mb-6 w-full max-w-3xl">
      <div 
        :style="{
          backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
        }"
        class="h-12 md:h-16 rounded-lg animate-pulse"
      ></div>
    </div>
    <h1 v-else class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 max-w-3xl leading-tight font-sans" :style="{ color: isDark ? 'white' : 'black' }">
      {{ title }}
    </h1>

    <!-- Description -->
    <div v-if="isLoading" class="mb-12 w-full max-w-2xl">
      <div 
        :style="{
          backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
        }"
        class="h-6 rounded-lg animate-pulse mb-2"
      ></div>
      <div 
        :style="{
          backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
        }"
        class="h-6 rounded-lg animate-pulse"
      ></div>
    </div>
    <p v-else class="text-center max-w-2xl mb-12 text-xs md:text-sm leading-relaxed" :style="{ color: isDark ? 'rgba(107, 114, 128, 1)' : 'rgba(107, 114, 128, 1)' }">
      {{ description }}
    </p>

    <!-- Social Links -->
    <div v-if="isLoading" class="flex gap-8">
      <div 
        v-for="i in 3" 
        :key="i" 
        :style="{
          backgroundColor: isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
        }"
        class="w-6 h-6 rounded-lg animate-pulse"
      ></div>
    </div>
    <div v-else class="flex gap-8">
      <template v-if="links && links.length > 0">
        <a 
          v-for="link in links"
          :key="link.label"
          :href="link.to"
          target="_blank"
          rel="noopener noreferrer"
          :style="{
            color: isDark ? 'rgba(209, 213, 219, 1)' : 'rgba(82, 82, 91, 1)'
          }"
          class="p-2 hover:scale-110 transition-transform duration-200"
          @mouseover="($event.target as HTMLElement).style.color = isDark ? 'white' : 'black'"
          @mouseout="($event.target as HTMLElement).style.color = isDark ? 'rgba(209, 213, 219, 1)' : 'rgba(82, 82, 91, 1)'"
          :title="link.label"
        >
          <Icon 
            :icon="getIconName(link.label)"
            class="w-6 h-6"
          />
        </a>
      </template>
      <template v-else>
        <p class="text-gray-400 text-sm">No links available</p>
      </template>
    </div>
  </div>
</template>
