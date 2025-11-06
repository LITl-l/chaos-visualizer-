# Setting Default Branch to Main

## Current Situation

Due to branch naming restrictions in this environment, I cannot directly push to a branch named `main`. The system requires branches to follow the pattern: `claude/<name>-<session-id>`.

Current branch: `claude/chaos-theory-implementation-011CUrRiefFGT4BNbnJiDLXw`

## Option 1: Set Default Branch via GitHub Web Interface (Recommended)

### Steps:

1. **Go to your repository on GitHub**
   - Navigate to `https://github.com/<username>/chaos-visualizer-`

2. **Access Repository Settings**
   - Click on **Settings** (tab near the top)

3. **Change Default Branch**
   - In the left sidebar, the first section is **"Default branch"**
   - Click the switch/pencil icon next to the current default branch
   - Select the branch you want as default from the dropdown
   - Click **Update** or **I understand, update the default branch**
   - Confirm the change

### If you want "main" as the default:

You have two options:

#### Option A: Create main branch through GitHub web interface
1. Go to your repository
2. Click the branch dropdown (currently shows your claude branch)
3. Type "main" in the search box
4. Click "Create branch: main from 'claude/chaos-theory-implementation-011CUrRiefFGT4BNbnJiDLXw'"
5. Then follow the steps above to set it as default

#### Option B: Use current claude branch as default
1. Follow the "Change Default Branch" steps above
2. Select `claude/chaos-theory-implementation-011CUrRiefFGT4BNbnJiDLXw` as the default
3. This branch contains all the latest code and is already configured for deployment

## Option 2: Using GitHub CLI (if available locally)

If you have GitHub CLI (`gh`) installed on your local machine:

```bash
# Clone the repository locally
git clone https://github.com/<username>/chaos-visualizer-.git
cd chaos-visualizer-

# Fetch the claude branch
git fetch origin claude/chaos-theory-implementation-011CUrRiefFGT4BNbnJiDLXw

# Create main branch from claude branch
git checkout -b main origin/claude/chaos-theory-implementation-011CUrRiefFGT4BNbnJiDLXw

# Push main branch
git push -u origin main

# Set main as default branch
gh repo edit --default-branch main
```

## Option 3: Rename Current Branch (GitHub Web Interface)

If you want to rename the current branch to "main":

1. Go to your repository on GitHub
2. Click on **Settings** → **Branches**
3. Find the branch you want to rename
4. Click the pencil/edit icon next to it
5. Enter "main" as the new name
6. Click **Rename branch**

**Note:** This will break the current deployment workflow since it specifically references the claude branch name. You'll need to update the workflow files.

## Recommendation

**I recommend Option 1B**: Set the current `claude/chaos-theory-implementation-011CUrRiefFGT4BNbnJiDLXw` branch as your default branch.

**Why?**
- ✅ It's already fully configured and working
- ✅ Deployment is already set up on this branch
- ✅ No additional configuration needed
- ✅ Immediate deployment after setting as default
- ✅ All code is already there

The branch name doesn't affect functionality - it's just an identifier. You can always create a `main` branch later and merge this branch into it through GitHub's web interface.

## After Setting Default Branch

Once you've set the default branch:

1. **Update Deployment Workflows** (if you created a new main branch)
   - The workflows are already configured for main/master/claude branches
   - If you created main and want only that, remove the claude branch from workflow triggers

2. **Update README** (if needed)
   - Change references to the default branch name

3. **Verify Deployment**
   - Push a small change to test
   - Check Actions tab for deployment workflow
   - Verify site deploys correctly

## Need Help?

If you're unable to access the GitHub web interface or need assistance with any of these steps, let me know and I can provide more detailed guidance.
