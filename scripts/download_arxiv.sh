#!/usr/bin/env bash
# Download arXiv PDFs in parallel from tmp/dl_list.txt (url|path)
set -u
LIST="tmp/dl_list.txt"
while IFS='|' read -r url path; do
  [ -z "$url" ] && continue
  # skip if already a valid PDF
  if [ -s "$path" ] && file "$path" 2>/dev/null | grep -qi "PDF"; then
    echo "SKIP $path"
    continue
  fi
  for attempt in 1 2 3 4; do
    curl -L -s --max-time 90 -A "livro-worker/1.0" "$url" -o "$path" && \
      file "$path" 2>/dev/null | grep -qi "PDF" && { echo "OK $path"; break; } || \
      { echo "RETRY $attempt $path"; rm -f "$path"; sleep 2; }
  done
done < "$LIST"
echo "DONE"
