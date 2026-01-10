# Push to GitHub Instructions

Your local git repository is now initialized with all files committed!

## To push to GitHub as "Insurex":

### Step 1: Create a new repository on GitHub
1. Go to https://github.com/new
2. Repository name: **Insurex**
3. Description: "Healthcare Insurance Clarity Platform - India-Focused FinTech MVP"
4. Choose Public or Private
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Add remote and push
Run these commands:

```bash
cd "c:\Users\mahak\final pro"

# Add GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Insurex.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify
Visit: `https://github.com/YOUR_USERNAME/Insurex`

---

## Alternative: If you already have the repo created

If you already created the "Insurex" repository on GitHub:

```bash
cd "c:\Users\mahak\final pro"
git remote add origin https://github.com/YOUR_USERNAME/Insurex.git
git branch -M main
git push -u origin main
```

## Using Personal Access Token (Recommended for 2FA)

If GitHub asks for password and you have 2FA enabled:

```bash
git remote add origin https://YOUR_USERNAME:YOUR_PERSONAL_ACCESS_TOKEN@github.com/YOUR_USERNAME/Insurex.git
git branch -M main
git push -u origin main
```

Get your token: https://github.com/settings/tokens

---

## What will be pushed:
✅ All source code files (29 files)
✅ package.json & vite.config.js
✅ README.md with full documentation
✅ .gitignore (excludes node_modules, dist, .env, etc.)

## What won't be pushed:
❌ node_modules/
❌ .env files
❌ Build artifacts
