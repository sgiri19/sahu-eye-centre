# Step-by-Step Guide: Host Your Website on GitHub Pages

## Prerequisites
- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (usually pre-installed on Mac)

## Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `sahu-eye-centre` (or any name you prefer)
   - **Description:** "Website for Sahu Eye Centre & Optical"
   - **Visibility:** Choose **Public** (required for free GitHub Pages)
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

## Step 2: Add Files to Git

Run these commands in your terminal (you're already in the project folder):

```bash
# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Sahu Eye Centre website"
```

## Step 3: Connect to GitHub and Push

After creating the repository on GitHub, you'll see a page with setup instructions. Use these commands:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sahu-eye-centre.git

# Rename the main branch to 'main' (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note:** You'll be asked for your GitHub username and password (or personal access token).

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**

## Step 5: Access Your Website

After a few minutes, your website will be live at:
```
https://YOUR_USERNAME.github.io/sahu-eye-centre/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Important Notes

- **For GitHub Pages to work, your repository must be PUBLIC** (free accounts)
- The main HTML file must be named `index.html` (which it already is!)
- Changes may take 1-2 minutes to appear after pushing
- You can use a custom domain later if needed

## Updating Your Website

Whenever you make changes:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

Your website will automatically update!

## Troubleshooting

**If you get authentication errors:**
- GitHub no longer accepts passwords. Use a Personal Access Token:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens
  2. Generate new token with "repo" permissions
  3. Use this token as your password when pushing

**If the website doesn't load:**
- Wait 2-3 minutes after enabling Pages
- Check that the repository is Public
- Verify index.html is in the root folder

