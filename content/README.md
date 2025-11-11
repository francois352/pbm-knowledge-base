# Content Directory

This directory contains all educational content for the PBM Knowledge Hub platform.

## Structure

```
content/
├── patient-education/        # Educational articles for patients
│   ├── neurofeedback/       # Neurofeedback topics
│   ├── pbm/                 # PBM therapy topics
│   └── wellness/            # General wellness topics
│
└── research-library/        # Scientific research
    ├── papers/              # PDF research papers
    └── index.md             # Research library index
```

## Content Guidelines

### Article Format

All articles should be in Markdown format with frontmatter:

```markdown
---
title: "Article Title"
slug: "url-friendly-slug"
category: "neurofeedback|pbm|wellness|research"
tags: ["tag1", "tag2", "tag3"]
difficulty: "beginner|intermediate|advanced"
readTime: 8  # in minutes
author: "Author Name"
publishedAt: "2025-01-01"
---

# Article Title

Content here...
```

### Adding New Content

1. Create a new `.md` file in the appropriate category folder
2. Include proper frontmatter metadata
3. Write clear, accessible content
4. Include references when citing research
5. Add relevant images to `/public/images/content/`

### Content Quality Standards

- **Accuracy**: All medical claims must be backed by research
- **Clarity**: Write for a general audience (Grade 8-10 reading level)
- **Structure**: Use clear headings and logical flow
- **References**: Cite all sources properly
- **Accessibility**: Include alt text for images

### Research Papers

PDFs should be placed in `research-library/papers/` with descriptive filenames:
- Format: `author-year-brief-title.pdf`
- Example: `hamblin-2016-pbm-brain-disorders.pdf`

### Categories

- **neurofeedback**: Brain training, QEEG, neurofeedback protocols
- **pbm**: Photobiomodulation science, devices, applications
- **wellness**: General health, lifestyle, complementary therapies
- **research**: Scientific studies, clinical trials, reviews

## Migration from Existing Content

Content from the legacy `docs/` and `extracted-content/` directories should be:
1. Converted to Markdown format
2. Organized into appropriate categories
3. Enhanced with proper metadata
4. Reviewed for accuracy and clarity

## Content Pipeline

1. **Draft**: Write content in Markdown
2. **Review**: Technical and editorial review
3. **Approve**: Final approval from medical advisors
4. **Publish**: Add to repository and sync to database
5. **Update**: Regular reviews and updates as needed

## Localization

Future support for:
- French (FR)
- German (DE)
- English (EN - default)

Translation files will be stored in `content/i18n/`.
