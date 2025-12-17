#!/bin/bash

# =============================================================================
# NovaTech Git Worktree Setup Script
# Creates parallel working directories for concurrent Claude Code sessions
# =============================================================================

set -e

PROJECT_NAME="novatech-demo"
WORKTREE_DIR="../${PROJECT_NAME}-worktrees"

# Worktree definitions: branch_name:description
WORKTREES=(
  "feature/services-redesign:Services page layout updates"
  "feature/contact-form:Contact form validation improvements"
  "bugfix/responsive-nav:Mobile navigation fixes"
)

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  NovaTech Worktree Setup"
echo "=========================================="
echo

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Error: Not a git repository"
  exit 1
fi

# Create worktree directory
mkdir -p "$WORKTREE_DIR"
echo -e "${GREEN}✓${NC} Worktree directory: $WORKTREE_DIR"
echo

# Create each worktree
for worktree in "${WORKTREES[@]}"; do
  branch="${worktree%%:*}"
  description="${worktree#*:}"
  dir_name="${branch//\//-}"
  worktree_path="$WORKTREE_DIR/$dir_name"

  echo "Setting up: $branch"
  echo "  Description: $description"

  # Check if branch exists
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    echo -e "  ${YELLOW}Branch exists${NC}"
  else
    git branch "$branch" main
    echo -e "  ${GREEN}✓${NC} Created branch"
  fi

  # Check if worktree already exists
  if [ -d "$worktree_path" ]; then
    echo -e "  ${YELLOW}Worktree already exists${NC}"
  else
    git worktree add "$worktree_path" "$branch"
    echo -e "  ${GREEN}✓${NC} Created worktree at $worktree_path"
  fi

  echo
done

echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo
echo "Worktrees created:"
git worktree list
echo
echo "To start working in parallel:"
echo
echo "  # Terminal 1"
echo "  cd $WORKTREE_DIR/feature-services-redesign && claude"
echo
echo "  # Terminal 2"
echo "  cd $WORKTREE_DIR/feature-contact-form && claude"
echo
echo "  # Terminal 3"
echo "  cd $WORKTREE_DIR/bugfix-responsive-nav && claude"
echo
echo "To merge completed work:"
echo "  git checkout main"
echo "  git merge feature/your-branch"
echo
echo "To clean up:"
echo "  git worktree remove <path>"
echo "  git worktree prune"
