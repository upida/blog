import { ref, onMounted, onUnmounted } from 'vue'

export const useIntersectionObserver = (options = {}) => {
  const element = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  }

  onMounted(() => {
    if (!element.value) return

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (observer) {
          observer.unobserve(entry.target)
        }
      }
    }, defaultOptions)

    observer.observe(element.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    element,
    isVisible
  }
}
