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

// Setup page-specific SEO
const updateHeadSEO = () => {
  useHead({
    title: pageData.value?.seo?.title || 'Projects - Upida',
    meta: [
      {
        name: 'description',
        content: pageData.value?.seo?.description || 'Portfolio of my recent projects, case studies and technical work'
      },
      {
        property: 'og:title',
        content: pageData.value?.seo?.title || 'Projects - Upida'
      },
      {
        property: 'og:description',
        content: pageData.value?.seo?.description || 'Portfolio of my recent projects, case studies and technical work'
      },
      {
        property: 'og:image',
        content: pageData.value?.seo?.image || '/og-image.png'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: pageData.value?.seo?.title || 'Projects - Upida'
      },
      {
        name: 'twitter:description',
        content: pageData.value?.seo?.description || 'Portfolio of my recent projects, case studies and technical work'
      }
    ]
  })
}

onMounted(() => {
  if (contentData.value) {
    pageData.value = contentData.value
    isLoading.value = false
    updateHeadSEO()
  }
})

watch(contentData, (newVal) => {
  if (newVal) {
    pageData.value = newVal
    isLoading.value = false
    updateHeadSEO()
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
