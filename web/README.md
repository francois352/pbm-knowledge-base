# PBM Knowledge Hub - Web Application

Next.js responsive web application for PBM Knowledge Hub.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Progressive Web App (PWA)** - Installable on mobile devices
- **Dark/Light Theme** - Automatic theme switching
- **Responsive Design** - Mobile-first, works on all screen sizes
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Query** - Data fetching and caching

## Project Structure

```
web/
├── src/
│   ├── app/              # Next.js 14 App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── ...           # Other pages
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and API client
│   └── styles/           # Global styles
├── public/               # Static assets
│   ├── images/
│   ├── fonts/
│   └── manifest.json
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Core Pages

- `/` - Homepage with category navigation
- `/content` - Content library browser
- `/content/[slug]` - Article detail page
- `/research` - Research papers library
- `/hrv` - HRV biofeedback session
- `/wellness` - Symptom tracking and journaling
- `/forum` - Community discussions
- `/consultation` - Lead generation form
- `/profile` - User profile and settings

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t pbm-web .
docker run -p 3000:3000 pbm-web
```

### Static Export
```bash
npm run build
# Deploy the 'out' directory
```

## Environment Variables

See `.env.example` for all available environment variables.

## PWA Support

The app is configured as a Progressive Web App:
- Offline support
- Install prompt
- Service worker caching
- App manifest

## Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode

## Performance

- Automatic code splitting
- Image optimization
- Font optimization
- Bundle size analysis

## License

PROPRIETARY - Neurofeedback Luxembourg
