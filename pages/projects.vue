<script setup lang="ts">
// Define layout
definePageMeta({
  layout: 'default'
})

// Get dark mode from parent
const isDark = inject('isDark', ref(false)) as Ref<boolean>

// Query content data
const pageData = ref<any>(null)
const isLoading = ref(true)

// Load data from server endpoint
const { data: contentData } = useFetch('/api/projects')

onMounted(() => {
  if (contentData.value) {
    pageData.value = contentData.value
    isLoading.value = false
  }
})

watch(contentData, (newVal) => {
  if (newVal) {
    pageData.value = newVal
    isLoading.value = false
  }
})
</script>

<template>
  <section class="px-6 py-20 max-w-[900px] mx-auto w-full border-l border-r border-gray-200 dark:border-gray-800">
    <!-- Page Header -->
    <PageHeader
      :is-loading="isLoading"
      :title="pageData?.title"
      :description="pageData?.description"
      :links="pageData?.links"
    />

    <!-- Projects List -->
    <div class="mt-20 px-6">
      <ProjectsList
        :items="pageData?.projects || []"
      />
    </div>
  </section>
</template>
