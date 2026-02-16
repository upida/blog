<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Ref } from 'vue'

interface Props {
  isScrolled?: boolean
  animationType?: 'in' | 'out' | null
}

withDefaults(defineProps<Props>(), {
  isScrolled: false,
  animationType: null
})

const emit = defineEmits<{
  toggleTheme: []
}>()

const route = useRoute()
const isDark = inject('isDark', ref(false)) as Ref<boolean>

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' }
]

const isActive = (to: string) => {
  return route.path === to
}

const handleToggleTheme = () => {
  emit('toggleTheme')
}
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'top-4 left-4 right-4 rounded-2xl border shadow-lg' 
        : 'border-b',
      animationType === 'in' && 'bounce-in',
      animationType === 'out' && 'bounce-out'
    ]"
    :style="{
      backgroundColor: isDark ? 'rgba(6, 5, 10, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      borderColor: isDark 
        ? (isScrolled ? 'rgba(31, 41, 55, 0.5)' : 'rgba(17, 24, 39, 0.5)')
        : (isScrolled ? 'rgba(229, 231, 235, 0.5)' : 'rgba(243, 244, 246, 0.5)')
    }"
  >
    <div class="flex items-center justify-center px-6 py-4">
      <div class="flex items-center gap-12">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to"
          :class="[
            'transition-colors text-sm font-medium relative pb-1',
            isActive(item.to)
              ? 'text-yellow-500'
              : ''
          ]"
          :style="{
            color: isActive(item.to) ? '#eab308' : (isDark ? '#9ca3af' : '#52525b')
          }"
          @mouseenter="() => {}"
          @mouseleave="() => {}"
        >
          {{ item.label }}
          <span v-if="isActive(item.to)" class="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></span>
        </NuxtLink>
        <button 
          @click="handleToggleTheme"
          :style="{
            backgroundColor: isDark ? 'rgba(31, 41, 55, 1)' : 'rgba(243, 244, 246, 1)'
          }"
          class="p-2 rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          <Icon 
            v-if="!isDark"
            icon="lucide:sun"
            class="w-5 h-5 text-gray-700"
          />
          <Icon 
            v-else
            icon="lucide:moon"
            class="w-5 h-5 text-gray-300"
          />
        </button>
      </div>
    </div>
  </nav>
</template>
