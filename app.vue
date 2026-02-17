<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Color mode management
const isDark = ref(false)

// Initialize dark mode on mount
onMounted(() => {
  // Check localStorage
  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
  }
  
  // Apply theme
  applyTheme()
})

// Watch isDark and apply to HTML element
watch(isDark, () => {
  applyTheme()
})

const applyTheme = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Provide isDark untuk child components
provide('isDark', isDark)

// Computed color for theme-color meta tag
const color = computed(() => isDark.value ? '#020618' : 'ffffff')

// Setup Head - Global config only
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
    {
      property: 'og:type',
      content: 'website'
    }
  ],
  link: [
    { rel: 'icon', href: '/upida.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

// Watch for dark mode changes and update meta
watch(() => color.value, (newColor) => {
  useHead({
    meta: [
      { key: 'theme-color', name: 'theme-color', content: newColor }
    ]
  })
})
</script>

<style>
html {
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}
</style>


