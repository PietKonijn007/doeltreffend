# Deployment Guide - Doeltreffend Architecture Portfolio

This guide will help you deploy your architecture portfolio to Vercel with your custom domain.

## 📋 Pre-Deployment Checklist

- [x] Astro.js project created with Tailwind CSS
- [x] All 5 section pages created
- [x] Navigation and components implemented
- [x] Development server tested successfully
- [ ] Git repository initialized
- [ ] GitHub repository created
- [ ] Vercel account set up
- [ ] Custom domain configured

## 🚀 Deployment Steps

### Step 1: Initialize Git Repository

Due to Xcode license requirements on your Mac, you'll need to accept the Xcode license first:

```bash
# Accept Xcode license (requires admin password)
sudo xcodebuild -license accept

# Then initialize git
cd portfolio
git init
git add .
git commit -m "Initial commit: Immersive architecture portfolio"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right, select "New repository"
3. Name your repository: `doeltreffend-portfolio` (or any name you prefer)
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/doeltreffend-portfolio.git

# Push your code
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

**Option A: Using Vercel Website (Recommended)**

1. Go to [vercel.com](https://vercel.com) and sign up/login (use GitHub account for easier integration)
2. Click "Add New Project" or "Import Project"
3. Select "Import Git Repository"
4. Find and select your `doeltreffend-portfolio` repository
5. Vercel will automatically detect it's an Astro project
6. Configure project settings:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
7. Click "Deploy"
8. Wait 2-3 minutes for the build to complete

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from portfolio directory)
cd portfolio
vercel --prod
```

### Step 5: Configure Custom Domain

Once your site is deployed:

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click on "Domains" tab
   - Click "Add Domain"
   - Enter: `doeltreffend.hofkensvermeulen.be`
   - Click "Add"
   - Vercel will show you the DNS records you need to add

2. **In GoDaddy** (your domain registrar):
   - Log in to your GoDaddy account
   - Go to "My Products" → "Domains"
   - Click on `hofkensvermeulen.be` → "DNS" or "Manage DNS"
   - Add a new CNAME record:
     - **Type**: CNAME
     - **Name**: `doeltreffend`
     - **Value**: `cname.vercel-dns.com` (Vercel will provide the exact value)
     - **TTL**: 600 seconds (or default)
   - Save the record

3. **Wait for DNS Propagation**:
   - Can take anywhere from 5 minutes to 48 hours
   - Usually propagates within 1-2 hours
   - You can check status at [dnschecker.org](https://dnschecker.org)

4. **SSL Certificate**:
   - Vercel will automatically provision a free SSL certificate
   - Your site will be available at `https://doeltreffend.hofkensvermeulen.be`

## 🔄 Updating Your Site

After initial deployment, whenever you want to update your site:

```bash
# Make your changes, then:
git add .
git commit -m "Description of your changes"
git push

# Vercel will automatically rebuild and deploy!
```

## 📸 Adding Content to Sections

To add images and documents to your portfolio:

1. Navigate to the Material folders in your project:
   ```
   doeltreffend/
   └── Material/
       ├── Section 1/  ← Add files here
       ├── Section 2/  ← Add files here
       ├── Section 3/  ← Add files here
       ├── Section 4/  ← Add files here
       └── Section 5/  ← Add files here
   ```

2. Add your files (images, PDFs, etc.) to the respective section folders

3. Push the changes:
   ```bash
   git add Material/
   git commit -m "Added content to sections"
   git push
   ```

4. Vercel will automatically rebuild and deploy with your new content!

## ⚙️ Environment Variables (Optional)

If you need to add environment variables (API keys, etc.):

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add your variables
3. Redeploy your project

## 🐛 Troubleshooting

### Build Fails on Vercel

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Make sure `vercel.json` is committed to git

### Domain Not Working

- Verify CNAME record is correct in GoDaddy
- Wait for DNS propagation (up to 48 hours)
- Check DNS propagation status at dnschecker.org
- Ensure the domain is correctly added in Vercel

### Images Not Loading

- Make sure images are in the Material folders
- Check that image file extensions are lowercase
- Verify git has tracked the Material folder (`git status`)

### 404 Errors

- Ensure all section pages are built and deployed
- Check browser console for specific errors
- Verify file paths are correct

## 📊 Monitoring

Once deployed, you can monitor your site in Vercel:

- **Analytics**: View visitor statistics
- **Logs**: Check build and function logs
- **Performance**: Monitor page load times
- **Deployments**: See all deployment history

## 🎉 Success!

Your architecture portfolio is now live at:
- **Production**: `https://doeltreffend.hofkensvermeulen.be`
- **Vercel URL**: `https://your-project.vercel.app`

Share the link with your colleagues, professors, and peers!

---

**Need Help?**
- Vercel Documentation: https://vercel.com/docs
- Astro Documentation: https://docs.astro.build/
- GitHub Help: https://docs.github.com/
