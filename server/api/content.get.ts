import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    console.log('Server: reading index.md...')
    // Try to find content folder - works in both dev and production
    let filePath = path.resolve(process.cwd(), 'content/index.md')
    
    // If not found in current directory, try parent (for production in .output)
    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(process.cwd(), '../content/index.md')
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // Extract frontmatter
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) {
      console.log('No frontmatter found')
      return null
    }
    
    const frontmatter = yaml.load(frontmatterMatch[1])
    console.log('Server: content loaded:', !!frontmatter)
    return frontmatter
  } catch (error) {
    console.error('Server: error:', error)
    return null
  }
})
