# Doeltreffend - Architecture Portfolio

An immersive architecture portfolio built with Astro.js and Tailwind CSS, featuring parallax scrolling, smooth animations, and responsive design.

## 🎨 Features

- **Immersive Design**: Full-bleed hero sections with parallax effects
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Dynamic Content**: Automatically displays files from Material folders
- **Performance Optimized**: Static site generation with Astro
- **5 Section Pages**: Organized portfolio structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Git installed

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:4321`

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   └── ProjectCard.astro
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/           # Routes (file-based routing)
│   │   ├── index.astro
│   │   ├── section-1.astro
│   │   ├── section-2.astro
│   │   ├── section-3.astro
│   │   ├── section-4.astro
│   │   └── section-5.astro
│   └── styles/          # Global styles
│       └── global.css
├── public/              # Static assets
│   └── Material/        # Your content goes here!
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── vercel.json          # Vercel deployment config
```

## 📸 Adding Content

To add content to your portfolio:

1. Navigate to the `Material` folder in the project root (outside the portfolio folder)
2. Add your files (images, PDFs, documents) to the respective section folders:
   - `Material/Section 1/`
   - `Material/Section 2/`
   - `Material/Section 3/`
   - `Material/Section 4/`
   - `Material/Section 5/`

3. The website will automatically display these files on the respective section pages

**Supported image formats**: JPG, JPEG, PNG, GIF, WebP

## 🌐 Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Using GitHub Integration

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Astro and configure settings
6. Click "Deploy"

### Custom Domain Setup

Once deployed on Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain: `doeltreffend.hofkensvermeulen.be`
4. Vercel will provide DNS records

In GoDaddy:

1. Go to your domain management
2. Navigate to DNS settings
3. Add a CNAME record:
   - **Type**: CNAME
   - **Name**: doeltreffend
   - **Value**: [your-vercel-project].vercel.app
   - **TTL**: 600 (or default)

4. Wait for DNS propagation (can take up to 48 hours, usually faster)

## 🎨 Customization

### Change Colors

Edit `src/styles/global.css` and the Tailwind classes in components. Current theme uses:
- Background: Dark gradient (slate-900 to black)
- Accent: Amber (amber-400/amber-500)
- Text: White with various opacities

### Update Section Titles

Edit the section pages in `src/pages/section-*.astro` to update titles and descriptions.

### Modify Navigation

Edit `src/components/Navigation.astro` to add/remove navigation items.

### Change Fonts

Update Google Fonts link in `src/layouts/BaseLayout.astro`. Current fonts:
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

## 🛠️ Tech Stack

- **Framework**: [Astro.js](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Animations**: [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll
- **Fonts**: Google Fonts (Playfair Display + Inter)
- **Deployment**: [Vercel](https://vercel.com/)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## 🐛 Troubleshooting

### Material folder not found

Make sure the Material folder is in the parent directory of the portfolio folder:
```
doeltreffend/
├── Material/
│   ├── Section 1/
│   ├── Section 2/
│   └── ...
└── portfolio/
    └── src/
```

### Images not displaying

Ensure images are in supported formats (JPG, JPEG, PNG, GIF, WebP) and the filenames don't have special characters.

### Build errors

Try:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📄 License

This project is for KU Leuven Bachelor Ontwerp - Architecture Portfolio.

## 🙋 Support

For issues or questions, please refer to:
- [Astro Documentation](https://docs.astro.build/)
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Domain**: doeltreffend.hofkensvermeulen.be  
**Built with** ❤️ **for KU Leuven Architecture**
