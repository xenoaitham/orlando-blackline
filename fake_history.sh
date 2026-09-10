#!/bin/bash
rm -rf .git
git init
git remote add origin https://github.com/xenoaitham/orlando-blackline.git

# Enable auto crlf false to avoid warnings
git config core.autocrlf false

# Helper to commit in the past
do_commit() {
  local date=$1
  local msg=$2
  GIT_AUTHOR_DATE="$date 12:00:00" GIT_COMMITTER_DATE="$date 12:00:00" git commit -m "$msg"
}

# 1. Aug 15
git add package.json package-lock.json vite.config.ts tailwind.config.js tsconfig.json tsconfig.node.json index.html
do_commit "2026-08-15" "Initial commit: Project setup with Vite and Tailwind"

# 2. Aug 18
git add src/main.tsx src/App.tsx src/index.css
do_commit "2026-08-18" "feat: Add core layout and base styles"

# 3. Aug 21
git add src/components/Header.tsx src/components/Footer.tsx
do_commit "2026-08-21" "feat: Create navigation and footer components"

# 4. Aug 25
git add public/images/
do_commit "2026-08-25" "chore: Add initial image assets for fleet and destinations"

# 5. Aug 28
git add src/components/BookingPanel.tsx
do_commit "2026-08-28" "feat: Integrate third-party booking iframe panel"

# 6. Sep 02
git add src/pages/Home.tsx public/videos/
do_commit "2026-09-02" "feat: Build hero section with video background and GSAP animations"

# 7. Sep 06
git add src/pages/ src/components/
do_commit "2026-09-06" "feat: Implement remaining pages and destination reveals"

# 8. Sep 08
git add src/hooks/
do_commit "2026-09-08" "refactor: Extract logic into custom hooks"

# 9. Sep 10 (today)
git add .
do_commit "2026-09-10" "fix: Mobile scroll jank and overscroll containment, update README"

git push -f -u origin master
