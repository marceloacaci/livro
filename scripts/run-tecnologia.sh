#!/usr/bin/env bash
# Atomic loop: sync -> build -> verify -> commit(only tecnologia) -> push, repeatedly.
# Self-healing against concurrent `git reset --hard origin/master` from sibling
# subagents: re-reads HEAD each iteration, idempotently reuses downloaded PDFs.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TARGET=240
BATCH=15

for round in $(seq 1 40); do
  # Stay current: rebase local commits onto latest origin (keeps siblings' work).
  git fetch origin -q 2>/dev/null
  git rebase origin/master >/dev/null 2>&1 || git rebase --abort >/dev/null 2>&1

  CUR=$(git show HEAD:js/articles-tecnologia.js 2>/dev/null | grep -c "    id:" || echo 0)
  echo "=== [round $round] committed tecnologia: $CUR (target $TARGET) ==="
  if [ "$CUR" -ge "$TARGET" ]; then
    echo "TARGET REACHED."
    break
  fi

  # Build next batch (idempotent: reuses valid PDFs already on disk).
  node scripts/build-tecnologia.mjs "$BATCH" || { echo "build failed"; sleep 3; continue; }

  # Verify syntax + tests.
  node --check js/articles-tecnologia.js || { echo "SYNTAX FAIL"; break; }
  npm run test 2>&1 | grep -qE "fail [1-9]" && { echo "TEST FAIL"; break; }

  NEW=$(grep -c "    id:" js/articles-tecnologia.js)
  if [ "$NEW" -le "$CUR" ]; then
    echo "No new articles produced (cache exhausted). Stopping."
    break
  fi

  # Commit ONLY tecnologia paths (rule 4: never touch other temas' files).
  git add js/articles-tecnologia.js artigos/tecnologia/
  git commit -q -m "feat(artigos/tecnologia): +$((NEW-CUR)) artigos (total $NEW)" \
    || { echo "commit failed"; continue; }

  # Push with retry (rebase onto origin on rejection).
  echo "Pushing..."
  ok=0
  for attempt in 1 2 3 4 5; do
    if git push origin master 2>&1 | grep -q "non-fast-forward\|rejected"; then
      echo "  rejected (attempt $attempt) — rebasing onto origin..."
      git fetch origin -q 2>/dev/null
      git rebase origin/master >/dev/null 2>&1 || git rebase --abort >/dev/null 2>&1
    else
      ok=1
      break
    fi
  done
  if [ "$ok" -eq 0 ]; then
    echo "  push failed after retries — will retry next round."
  fi
  sleep 1
done

git fetch origin -q 2>/dev/null
echo "=== Final committed tecnologia count ==="
git show HEAD:js/articles-tecnologia.js | grep -c "    id:"
