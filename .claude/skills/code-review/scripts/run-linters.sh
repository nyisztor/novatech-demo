#!/bin/bash
#
# NovaTech Code Linting Script
# Runs ESLint and Stylelint on target files
#
# Usage: ./run-linters.sh [file-or-directory]
#
# If no argument provided, lints the entire project.
# Outputs results in compact format for easy parsing.

set -e

TARGET="${1:-.}"
EXIT_CODE=0

echo "=== NovaTech Linter Report ==="
echo "Target: $TARGET"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Run ESLint on JavaScript/TypeScript files
echo "--- JavaScript/TypeScript (ESLint) ---"
if command -v npx &> /dev/null; then
    if [ -f "$TARGET" ]; then
        # Single file - check if it's JS/TS
        if [[ "$TARGET" =~ \.(js|jsx|ts|tsx)$ ]]; then
            npx eslint "$TARGET" --format compact 2>/dev/null || EXIT_CODE=1
        else
            echo "Skipped: Not a JavaScript/TypeScript file"
        fi
    else
        # Directory - find and lint all JS/TS files
        npx eslint "$TARGET" --ext .js,.jsx,.ts,.tsx --format compact 2>/dev/null || EXIT_CODE=1
    fi
else
    echo "Warning: npx not found, skipping ESLint"
fi

echo ""

# Run Stylelint on CSS files
echo "--- CSS (Stylelint) ---"
if command -v npx &> /dev/null; then
    if [ -f "$TARGET" ]; then
        # Single file - check if it's CSS
        if [[ "$TARGET" =~ \.css$ ]]; then
            npx stylelint "$TARGET" --formatter compact 2>/dev/null || EXIT_CODE=1
        else
            echo "Skipped: Not a CSS file"
        fi
    else
        # Directory - find and lint all CSS files
        npx stylelint "$TARGET/**/*.css" --formatter compact 2>/dev/null || EXIT_CODE=1
    fi
else
    echo "Warning: npx not found, skipping Stylelint"
fi

echo ""
echo "=== Linting Complete ==="

if [ $EXIT_CODE -eq 0 ]; then
    echo "✓ No issues found"
else
    echo "✗ Issues detected - see above for details"
fi

exit $EXIT_CODE
