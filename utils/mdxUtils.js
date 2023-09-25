import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

export function getSortedPostsData() {
    // Get file names under /posts
    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    // Sort posts by date
    return posts.sort((a, b) => {
        if (a.data.date < b.data.date) {
            return 1
        } else if (a.data.date > b.data.date) {
            return -1
        } else {
            return 0
        }
    })
}