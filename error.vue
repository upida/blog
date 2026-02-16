<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 py-12">
    <div class="text-center max-w-md">
      <!-- Error Icon -->
      <div class="mb-8">
        <div class="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
          <Icon icon="lucide:alert-circle" class="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
      </div>

      <!-- Error Code -->
      <h1 class="text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
        {{ error?.statusCode || '500' }}
      </h1>

      <!-- Error Message -->
      <p class="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">
        {{ getErrorMessage(error?.statusCode) }}
      </p>

      <!-- Error Description -->
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ error?.message || 'An unexpected error occurred. Please try again later.' }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Go Home
        </NuxtLink>
        <button
          @click="handleError"
          class="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Clear Error
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  error: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['clear'])

const getErrorMessage = (statusCode: number | undefined) => {
  const messages: Record<number, string> = {
    404: 'Page Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
    403: 'Access Forbidden',
    400: 'Bad Request',
  }
  return messages[statusCode || 500] || 'Something went wrong'
}

const handleError = () => {
  emit('clear')
  navigateTo('/')
}
</script>
