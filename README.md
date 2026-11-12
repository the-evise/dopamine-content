# Dopamine Content

A VitePress reading site for book notes and related topics. The first book is Anna Lembke’s *Dopamine Nation*.

## Content structure

| Path | Purpose |
| --- | --- |
| `docs/index.md` | Site home |
| `docs/books/index.md` | Book catalog |
| `docs/books/<book>/index.md` | Book overview and reading order |
| `docs/books/<book>/chapters/` | One Markdown page per chapter |
| `docs/books/<book>/topics/` | Book-specific pages that synthesize material across chapters |
| `docs/topics/` | Optional standalone or cross-book topics |

To add a book, create its overview and chapter pages, then link the overview from the catalog. Use zero-padded chapter numbers in filenames so chapters sort in reading order. Each chapter or topic appears in its book’s sidebar using the first Markdown heading as its label. Link new chapters from the book overview and update the relevant topic pages as you go.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
npm run docs:dev
```

Run `npm run docs:build` to generate the static site, or `npm run docs:preview` to preview a build. For a GitHub Pages project URL, build with `npm run docs:build -- --base /dopamine-content/`.
