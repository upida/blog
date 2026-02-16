<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  items: Array<{
    title: string
    description: string
    url: string
    image?: string
    tags: string[]
    date: string
  }>
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: undefined
})

const { element, isVisible } = useIntersectionObserver()
const isDark = inject('isDark', ref(false)) as Ref<boolean>

// Filter items based on limit
const displayItems = computed(() => {
  if (props.limit) {
    return props.items.slice(0, props.limit)
  }
  return props.items
})
</script>

<template>
  <div 
    ref="element"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'all 700ms ease-out'
    }"
    class="space-y-8"
  >
    <a
      v-for="(item, idx) in displayItems"
      :key="idx"
      :href="item.url"
      target="_blank"
      rel="noopener noreferrer"
      :style="{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 700ms ease-out ${isVisible ? idx * 100 : 0}ms`,
        transitionDelay: isVisible ? `${idx * 100}ms` : '0ms'
      }"
      class="group flex gap-8 items-start hover:no-underline"
    >
      <!-- Content -->
      <div class="flex-1">
        <!-- Date -->
        <p class="text-sm text-zinc-500 dark:text-gray-400 mb-3">
          {{ item.date }}
        </p>

        <!-- Title -->
        <h3 class="text-2xl font-bold text-black dark:text-white mb-4">
          {{ item.title }}
        </h3>

        <!-- Description -->
        <p class="text-zinc-500 dark:text-gray-500 text-sm leading-relaxed mb-6\">
          {{ item.description }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 my-6">
          <span 
            v-for="tag in item.tags" 
            :key="tag"
            :style="{
              color: isDark ? '#a4a5a7' : '#3f3f46',
              borderColor: isDark ? '#3f3f46' : '#e4e4e7',
              backgroundColor: isDark ? '#09090b' : '#ffffff'
            }"
            class="text-xs px-3 py-1 rounded-full border"
          >
            {{ tag }}
          </span>
        </div>

        <!-- View Project Link -->
        <div class="flex items-center gap-2 text-yellow-500 font-medium text-sm">
          <span>View Project</span>
          <Icon 
            icon="lucide:arrow-right" 
            class="w-4 h-4 arrow-icon"
          />
        </div>
      </div>

      <!-- Image -->
      <div v-if="item.image" class="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          :src="item.image" 
          :alt="item.title"
          class="w-full h-full object-cover"
        />
      </div>
    </a>
  </div>
</template>

<style scoped>
.arrow-icon {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

a:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0);
}

a:not(:hover) .arrow-icon {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
