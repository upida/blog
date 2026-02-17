<script setup lang="ts">
// Define layout
definePageMeta({
  layout: 'default'
})

// Get dark mode from parent
const isDark = inject('isDark', ref(false)) as Ref<boolean>

// Get app config
const appConfig = useAppConfig()
const picture = computed(() => appConfig.global?.picture)

// Query content data
const pageData = ref<any>(null)
const isLoading = ref(true)

// Load data from server endpoint
const { data: contentData } = useFetch('/api/content')
const { data: projectsData } = useFetch('/api/projects')

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

// Computed property to merge projects from projects.md
const latestProjects = computed(() => {
  if (projectsData.value?.projects) {
    return projectsData.value.projects.map((project: any) => ({
      title: project.title,
      description: project.description,
      url: project.url || '',
      image: project.image,
      tags: project.tags || [],
      date: project.date || ''
    }))
  }
  return []
})
</script>

<template>
  <div class="flex flex-col items-center justify-center max-w-[900px] mx-auto w-full border-l border-r border-gray-200 dark:border-gray-800 px-6">
    <HeroSection
      :is-loading="isLoading"
      :picture="picture"
      :title="pageData?.title"
      :description="pageData?.description"
      :links="pageData?.hero?.links"
    />

    <!-- About & Experience Section -->
    <section class="w-full mx-auto mt-40 px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AboutSection
          :title="pageData?.about?.title"
          :description="pageData?.about?.description"
        />
        <ExperienceSection
          :title="pageData?.experience?.title"
          :items="pageData?.experience?.items || []"
        />
      </div>
    </section>

    <!-- Projects Section -->
    <section class="w-full mx-auto mt-40 px-6 py-12">
      <div class="mb-12">
        <h2 class="text-4xl font-medium mb-4 font-sans text-black dark:text-white">
          {{ pageData?.projects?.title }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          {{ pageData?.projects?.description }}
        </p>
      </div>
      <ProjectsList
        :items="latestProjects"
        :limit="3"
      />
    </section>

    <!-- FAQ Section -->
    <section class="w-full mx-auto mt-40 px-6 py-12">
      <div class="mb-12">
        <FAQSection
          :title="pageData?.faq?.title"
          :categories="pageData?.faq?.categories || []"
        />
      </div>
    </section>
  </div>
</template>
