import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vitepress'

const docs = new URL('../', import.meta.url)

function pageTitle(path) {
  const markdown = readFileSync(new URL(path, docs), 'utf8')
  const heading = markdown.match(/^# (.+)$/m)
  if (!heading) throw new Error(`Missing page heading in ${path}`)
  return heading[1].trim()
}

function pagesIn(path, titlePrefix = '') {
  const folder = new URL(`${path}/`, docs)
  if (!existsSync(folder)) return []
  return readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md')
    .map((entry) => entry.name)
    .sort()
    .map((file) => ({
      text: pageTitle(`${path}/${file}`).replace(titlePrefix, ''),
      link: `/${path}/${file.slice(0, -3)}`,
    }))
}

const sidebar = Object.fromEntries(
  readdirSync(new URL('books/', docs), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map(({ name }) => {
      const path = `books/${name}`
      const title = pageTitle(`${path}/index.md`)
      const chapters = pagesIn(`${path}/chapters`, `${title} — `)
      const topics = pagesIn(`${path}/topics`)
      const stories = pagesIn(`${path}/stories`)
      return [`/${path}/`, [
        { text: title, link: `/${path}/` },
        ...(chapters.length ? [{ text: 'Chapters', items: chapters }] : []),
        ...(stories.length ? [{ text: 'Story Threads', link: `/${path}/stories/`, items: stories }] : []),
        ...(topics.length ? [{ text: 'Topics', items: topics }] : []),
      ]]
    }),
)

export default defineConfig({
  title: 'Dopamine Content',
  description: 'Chapter notes and topic guides on dopamine, habits, enjoyment, and related subjects.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Books', link: '/books/', activeMatch: '^/books/' },
    ],
    sidebar,
    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },
  },
})
