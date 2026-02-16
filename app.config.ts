export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://avatars.githubusercontent.com/u/46271228?s=400&u=16991f7e2fab0a8afa5a7463fa4d5cfa5a2d9718&v=4',
      light: 'https://avatars.githubusercontent.com/u/46271228?s=400&u=16991f7e2fab0a8afa5a7463fa4d5cfa5a2d9718&v=4',
      alt: 'upida'
    },
    // meetingLink: 'https://cal.com/',
    email: 'salmamufida34@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Upida • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
    {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/upida',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/mufidasalma/',
      'target': '_blank',
      'aria-label': 'LinkedIn'
    }, {
      'icon': 'i-simple-icons-gmail',
      'to': 'mailto:salmamufida34@gmail.com',
      'target': '_blank',
      'aria-label': 'Email'
    }]
  }
})
