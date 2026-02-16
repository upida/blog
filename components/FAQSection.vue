<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  title?: string
  categories: Array<{
    title: string
    questions: Array<{
      label: string
      content: string
    }>
  }>
}

withDefaults(defineProps<Props>(), {
  title: 'Frequently Asked Questions'
})

const { element, isVisible } = useIntersectionObserver()
const isDark = inject('isDark', ref(false)) as Ref<boolean>

const handleMouseEnter = (e: Event) => {
  const target = e.currentTarget as HTMLElement
  target.style.borderColor = '#eab308'
}

const handleMouseLeave = (e: Event) => {
  const target = e.currentTarget as HTMLElement
  target.style.borderColor = isDark.value ? '#27272a' : '#e4e4e7'
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
  >
    <h2 class="text-4xl font-bold text-black dark:text-white mb-4 font-sans">
      {{ title }}
    </h2>

    <div class="space-y-8">
      <div v-for="(category, cidx) in categories" :key="cidx">
        <h3 class="text-2xl font-bold text-black dark:text-white mb-6 font-sans">{{ category.title }}</h3>
        <div class="space-y-4">
          <details 
            v-for="(qa, qidx) in category.questions"
            :key="qidx"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 700ms ease-out`,
              transitionDelay: isVisible ? `${cidx * 150 + qidx * 75}ms` : '0ms',
              borderColor: isDark ? '#27272a' : '#e4e4e7'
            }"
            class="group border rounded-lg p-6 cursor-pointer transition-colors"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <summary class="flex items-center justify-between font-normal text-sm text-zinc-500 dark:text-gray-500 font-sans">
              {{ qa.label }}
              <Icon icon="lucide:chevron-down" class="w-5 h-5 group-open:rotate-180 transition-transform" />
            </summary>
            <p class="font-normal font-sans text-sm text-zinc-500 dark:text-gray-400 mt-4 whitespace-pre-wrap">{{ qa.content }}</p>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>
