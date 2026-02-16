export const useScrollNavigation = () => {
  const isScrolled = ref(false)
  const animationType = ref<'in' | 'out' | null>(null)

  onMounted(() => {
    const handleScroll = () => {
      const wasScrolled = isScrolled.value
      const scrollDown = window.scrollY > 10
      
      if (!wasScrolled && scrollDown) {
        animationType.value = 'out'
        setTimeout(() => {
          isScrolled.value = true
          animationType.value = null
        }, 800)
      } else if (wasScrolled && !scrollDown) {
        animationType.value = 'in'
        isScrolled.value = false
        setTimeout(() => {
          animationType.value = null
        }, 600)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScrolled,
    animationType
  }
}
