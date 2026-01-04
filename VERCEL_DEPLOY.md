# Deploy to Vercel - Quick Guide

Your Git repository is ready! Follow these steps to deploy to Vercel.

## 🚀 Step 1: Push to GitHub

### Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `doeltreffend-portfolio` (or any name)
4. **Important**: Do NOT initialize with README, .gitignore, or license
5. Click "Create repository"

### Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to portfolio folder (you're already here)
cd /Users/jurgenhofkens/Documents/Code/doeltreffend/portfolio

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/doeltreffend-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example**: If your GitHub username is `jhofkens`:
```bash
git remote add origin https://github.com/jhofkens/doeltreffend-portfolio.git
git branch -M main
git push -u origin main
```

You'll be asked for credentials - use your GitHub Personal Access Token (not password).

---

## ☁️ Step 2: Deploy on Vercel

### Quick Deploy (Recommended)

1. Go to **https://vercel.com**
2. Click "Sign Up" or "Login" (use GitHub account for easy integration)
3. After login, click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"**
5. Select your `doeltreffend-portfolio` repository
6. Vercel will auto-detect settings:
   - **Framework Preset**: Astro ✓
   - **Build Command**: `npm run build` ✓
   - **Output Directory**: `dist` ✓
   - **Install Command**: `npm install` ✓
7. Click **"Deploy"**
8. Wait 2-3 minutes for build to complete

Your site will be live at: `https://doeltreffend-portfolio-xxx.vercel.app`

---

## 🌐 Step 3: Add Custom Domain

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `doeltreffend.hofkensvermeulen.be`
4. Click **"Add"**

Vercel will show you DNS records to configure.

### In GoDaddy:

1. Login to **GoDaddy**
2. Go to **My Products** → **Domains**
3. Click on `hofkensvermeulen.be`
4. Click **"DNS"** or **"Manage DNS"**
5. Add a **CNAME Record**:
   - **Type**: CNAME
   - **Name**: `doeltreffend`
   - **Value**: `cname.vercel-dns.com` (or the value Vercel provides)
   - **TTL**: 600 seconds (default is fine)
6. Click **"Save"**

### Wait for DNS Propagation

- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status: https://dnschecker.org

Once propagated, your site will be live at:
**https://doeltreffend.hofkensvermeulen.be** 🎉

---

## 🔄 Future Updates

Whenever you want to update your site:

```bash
# Make changes, then:
git add .
git commit -m "Updated content"
git push

# Vercel automatically rebuilds and deploys!
```

---

## 📝 Your Current Setup

✅ **Local Git Repository**: Initialized and committed  
✅ **Vercel Config**: `vercel.json` is ready  
✅ **Material Integrated**: Images in Section 1 & 2 are linked  
✅ **Development Server**: Running at http://localhost:4321

**Next Action**: Push to GitHub (Step 1 above)

---

## 🆘 Troubleshooting

### "Permission denied" when pushing to GitHub
- You need a Personal Access Token
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Generate new token with `repo` scope
- Use token as password when pushing

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Material folder symlink is committed correctly

### Images not showing
- Check that Material folder symlink exists: `portfolio/public/Material`
- Verify images are in correct folders
- Check browser console for 404 errors

---

**Need help? Check the full guide**: `DEPLOYMENT.md`
