# Git Conflict Resolution — Human-God Guide

## The Problem (What Happened)

Two branches both created the same file (`BROKKR_JOR_CONTRACT.txt`). When we tried to merge one into `staging`, Git said: "Hey, both branches added this file with different content — I don't know which one to keep."

This is called a **merge conflict**.

---

## The Git Commands We Used (And Why)

### 1. `git fetch origin`
**What it does:** Downloads the latest state of ALL remote branches from GitHub.
**Why:** Your local copy might be outdated. This ensures you see what's actually on GitHub.
**Analogy:** Checking the mailbox before writing a letter — you need to know what arrived while you were away.

### 2. `git checkout staging` then `git pull origin staging`
**What it does:** Switches to the `staging` branch and pulls the latest commits into it.
**Why:** You need your local `staging` to match GitHub's `staging` before creating a new branch.
**Analogy:** Making sure your canvas is clean before starting a new painting.

### 3. `git checkout -b chore/JOR-000-lint-cleanup`
**What it does:** Creates a new branch from the current branch (`staging`) and switches to it.
**Why:** Every task gets its own branch — this is our workflow rule.
**Analogy:** Opening a new notebook page for a new project, starting from where you left off.

### 4. `git rebase origin/staging`
**What it does:** Replays our commit on top of the latest `staging`. If there's a conflict, it stops and asks you to fix it.
**Why:** Instead of a messy merge commit, rebase gives us a clean linear history.
**Analogy:** Rewriting your notes on top of the latest version of the textbook, rather than stapling pages together.

### 5. `git diff --name-only --diff-filter=U`
**What it does:** Shows which files have unresolved conflicts (the `U` means "unmerged").
**Why:** You need to know exactly which files to fix.
**Analogy:** The teacher circling the wrong answers on your test.

### 6. `git checkout --theirs BROKKR_JOR_CONTRACT.txt`
**What it does:** Picks "our" version (the one from the branch being rebased) for the conflicting file.
**Why:** In this case, our version (v1.2 with lint rules) was the correct one — staging's version was older (v1.0).
**Analogy:** Choosing which draft of the essay to keep — you pick the newer, better one.

> **Note:** During a `rebase`, "theirs" = the branch being rebased (yours), and "ours" = the branch you're rebasing onto. It's backwards from what you'd expect!

### 7. `git add BROKKR_JOR_CONTRACT.txt`
**What it does:** Tells Git "this file is fixed, mark it as resolved."
**Why:** Git needs explicit confirmation that you've handled the conflict.
**Analogy:** Checking off an item on your to-do list.

### 8. `git rebase --continue`
**What it does:** Continues the rebase after you've fixed all conflicts.
**Why:** The rebase was paused waiting for you. This resumes it.
**Analogy:** Pressing "play" after pausing a movie to answer the door.

### 9. `git push --force-with-lease`
**What it does:** Pushes the rebased branch to GitHub, overwriting the old version.
**Why:** Rebase creates new commits (new SHA hashes), so a normal push would be rejected. `--force-with-lease` is safer than `--force` because it checks that nobody else pushed to the branch while you were working.
**Analogy:** Sending the revised version of a report to your boss and saying "ignore the old one, use this instead."

---

## The Full Sequence (Copy-Paste Ready)

```bash
# Step 1: Get the latest from GitHub
git fetch origin

# Step 2: Update local staging
git checkout staging
git pull origin staging

# Step 3: Create your new branch
git checkout -b chore/JOR-XXX-description

# Step 4: Do your work, commit
git add -A
git commit -m "chore(scope): description"

# Step 5: Push the branch
git push -u origin chore/JOR-XXX-description

# --- Create PR on GitHub, get it merged ---

# Step 6: After merge, clean up and prepare for next task
git checkout staging
git pull origin staging
git branch -d chore/JOR-XXX-description

# Step 7: Create the NEXT branch from fresh staging
git checkout -b feature/JOR-YYY-description
```

---

## If You Get a Conflict During Rebase

```bash
# See which files are conflicting
git diff --name-only --diff-filter=U

# Pick your version of the file (the branch you're working on)
git checkout --theirs <filename>

# Or pick the other version (the branch you're rebasing onto)
git checkout --ours <filename>

# Mark as resolved
git add <filename>

# Continue the rebase
git rebase --continue

# If things go wrong, abort and start over
git rebase --abort
```

---

## Why This Matters

| Without this workflow | With this workflow |
|-----------------------|--------------------|
| Stale branches cause conflicts | Always fresh from staging |
| `git push` rejected after rebase | `--force-with-lease` handles it |
| Manual conflict resolution | Clear sequence to follow |
| Lost time debugging | Resolved in 2 minutes |

---

## Key Takeaway

**Always pull staging before creating a branch. Always.**

The 30 seconds it takes to run `git pull origin staging` saves 20 minutes of conflict resolution.
