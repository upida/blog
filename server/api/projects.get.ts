import { readFileSync, existsSync } from 'fs'
import { load } from 'js-yaml'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Try to find content folder - works in both dev and production
    let filePath = path.resolve(process.cwd(), 'content/projects.md')
    
    // If not found in current directory, try parent (for production in .output)
    if (!existsSync(filePath)) {
      filePath = path.resolve(process.cwd(), '../content/projects.md')
    }
    
    const content = readFileSync(filePath, 'utf-8')
    const [, frontmatter] = content.split('---')
    const data = load(frontmatter) as any
    return data
  } catch (error) {
    console.error('Error loading projects content:', error)
    return null
  }
})
