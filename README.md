# Gold Star Workflows AI Agents - Landing Page

A powerful landing page showcasing AI agents that eliminate manual work, built from 2,056 proven workflows. Built with Next.js 14 and Tailwind CSS.

## Features

- **Hero Section**: Modern professional design with key metrics
- **Featured Agents**: Showcase AI agents that eliminate manual work
- **Agent Catalog**: Searchable database of available AI agents
- **Consultation Form**: Lead capture for custom agent development
- **Responsive Design**: Optimized for all devices
- **Professional Design**: Modern business aesthetic with Gold Star branding

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: Visit `http://localhost:3000`

## Deployment to Vercel

1. **Push to GitHub**: Commit all files to a GitHub repository

2. **Connect Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Deploy**: Click "Deploy" - Vercel handles the build automatically

4. **Domain**: Your site will be live at `your-project.vercel.app`

## Customization

### Update Company Info
- Edit `app/page.tsx` to modify agent data, testimonials, and content
- Update `app/layout.tsx` for SEO metadata

### Styling
- Modify `tailwind.config.js` for brand colors
- Edit `app/globals.css` for custom styles
- Main colors: Red (`#DC2626`), Blue (`#1E3A8A`), Steel Gray (`#374151`)

### Form Integration
- Add form submission logic to the consultation form
- Consider integrating with services like Netlify Forms, Formspree, or custom API

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel-ready

## Project Structure

```
ai-agent-landing/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Next Steps

1. **Form Backend**: Set up form submission handling
2. **Agent Database**: Connect to your real AI agent data
3. **Analytics**: Add Google Analytics or similar
4. **SEO**: Optimize for search engines
5. **Performance**: Add loading states and optimizations

---

**Built to eliminate manual work and improve business operations through AI agents.**