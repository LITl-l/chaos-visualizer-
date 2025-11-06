# Deployment Guide

This document provides detailed instructions for deploying the Chaos Theory Visualizer to GitHub Pages.

## Prerequisites

1. GitHub repository must be public (or GitHub Pro for private repos)
2. GitHub Actions must be enabled
3. GitHub Pages must be configured

## Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
4. Save the settings

### Step 2: Choose a Deployment Method

We provide two deployment workflows:

#### Method 1: Official GitHub Pages Action (Recommended)
- File: `.github/workflows/deploy.yml`
- Uses official GitHub Pages actions
- Requires GitHub Pages to be configured as described above
- Deploys automatically on push to main/master

#### Method 2: Simple Deployment (Alternative)
- File: `.github/workflows/deploy-simple.yml`
- Uses `peaceiris/actions-gh-pages@v3`
- Deploys to `gh-pages` branch
- May work better in some environments

**To use Method 2**, disable Method 1:
1. Rename `.github/workflows/deploy.yml` to `.github/workflows/deploy.yml.disabled`
2. Ensure `.github/workflows/deploy-simple.yml` is active

### Step 3: Trigger Deployment

#### Automatic Deployment
Push to `main` or `master` branch:
```bash
git checkout main  # or master
git merge your-feature-branch
git push origin main
```

#### Manual Deployment
1. Go to **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Select the branch (main/master)
5. Click **Run workflow** button

## Troubleshooting

### Issue: Workflow doesn't run

**Causes:**
- You're not on main/master branch
- GitHub Actions is disabled
- Workflow file has syntax errors

**Solutions:**
1. Check current branch: `git branch`
2. Verify Actions are enabled: Settings → Actions → Allow all actions
3. Check workflow syntax: Look for YAML errors in `.github/workflows/deploy.yml`

### Issue: Build fails

**Causes:**
- Missing dependencies
- TypeScript errors
- Build configuration issues

**Solutions:**
1. Run locally: `npm run build`
2. Check errors in Actions tab
3. Verify Node version matches (20.x)

### Issue: Deployment succeeds but site shows 404

**Causes:**
- Wrong base path configuration
- GitHub Pages not properly configured
- Incorrect branch selected

**Solutions:**

1. **Verify base path in `vite.config.ts`:**
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/chaos-visualizer-/' : '/',
   ```
   Replace `chaos-visualizer-` with your actual repository name.

2. **Check GitHub Pages settings:**
   - Go to Settings → Pages
   - Verify source is "GitHub Actions"
   - Check the published URL

3. **For Method 2 (simple deploy):**
   - Go to Settings → Pages
   - Source should be "Deploy from a branch"
   - Branch should be `gh-pages` and folder `/ (root)`

### Issue: Assets not loading (403/404 errors)

**Causes:**
- Incorrect base path
- Missing `.nojekyll` file

**Solutions:**
1. Verify `.nojekyll` exists in `public/` folder
2. Check browser console for asset path errors
3. Update base path to match your repository name

### Issue: Workflow runs but doesn't deploy

**Causes:**
- Insufficient permissions
- Environment protection rules
- Missing secrets

**Solutions:**

1. **Check workflow permissions:**
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select:
     - ✅ Read and write permissions
     - ✅ Allow GitHub Actions to create and approve pull requests

2. **Check environment settings:**
   - Go to Settings → Environments
   - Click on `github-pages` environment
   - Check if protection rules are blocking deployment

3. **Verify Pages permissions:**
   Ensure workflow has these permissions:
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

### Issue: "Resource not accessible by integration"

**Solution:**
1. Go to Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Save changes
5. Re-run the workflow

## Checking Deployment Status

### View Workflow Runs
1. Go to **Actions** tab
2. Click on the latest workflow run
3. Review logs for each step
4. Look for error messages in red

### View Deployment
1. Go to **Settings** → **Pages**
2. Look for "Your site is live at: [URL]"
3. Click the URL to view your site

### Expected URL Format
- **Standard**: `https://<username>.github.io/chaos-visualizer-/`
- **Custom domain**: Configure in Pages settings

## Manual Deployment (Fallback)

If GitHub Actions doesn't work, deploy manually:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Then configure Pages to deploy from `gh-pages` branch.

## Verifying Successful Deployment

After deployment completes:

1. ✅ Workflow shows green checkmark
2. ✅ Pages settings shows "Your site is live"
3. ✅ Visiting URL shows the application
4. ✅ No 404 errors in browser console
5. ✅ All assets load correctly

## Need More Help?

1. **Check workflow logs**: Actions tab → Select workflow run → View logs
2. **Review GitHub Pages documentation**: https://docs.github.com/pages
3. **Check repository settings**: Verify all settings mentioned above
4. **Test locally**: Run `npm run build && npm run preview` to test production build

## Repository Name Change

If you rename your repository:

1. Update `base` in `vite.config.ts`:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/new-repo-name/' : '/',
   ```

2. Rebuild and redeploy:
   ```bash
   git add vite.config.ts
   git commit -m "Update base path for renamed repository"
   git push origin main
   ```
