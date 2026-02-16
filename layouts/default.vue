<script setup lang="ts">
// Get dark mode from parent
const isDark = inject('isDark', ref(false)) as Ref<boolean>

const toggleTheme = () => {
  isDark.value = !isDark.value
}

// Use scroll navigation composable
const { isScrolled, animationType } = useScrollNavigation()
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">
    <!-- Navigation Component -->
    <Navigation 
      :is-scrolled="isScrolled"
      :animation-type="animationType"
      :is-dark="isDark"
      @toggle-theme="toggleTheme"
    />

    <!-- Main Content -->
    <slot />
  </div>
</template>

<style scoped>
:root {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}
</style>
