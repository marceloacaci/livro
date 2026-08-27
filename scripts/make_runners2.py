#!/usr/bin/env python3
"""Parallel-safe download helper. Reads tmp/dl_list2.txt lines (url|path), downloads
those not already valid PDFs. Uses bash subprocesses for parallelism."""
import subprocess, os, shlex, sys

# Generate bash runner that strips CR (tr -d '\r') to avoid trailing-char filenames.
with open("tmp/dl_list2.txt", encoding="utf-8") as f:
    lines = f.read().splitlines()
lines = [l for l in lines if l.strip()]
# write sanitized, LF-only, no CR
with open("tmp/dl_list2_clean.txt", "w", newline="\n") as f:
    f.write("\n".join(lines) + "\n")

N = 10
chunk = (len(lines) + N - 1) // N
runners = []
for i in range(N):
    part = lines[i*chunk:(i+1)*chunk]
    if not part: continue
    pfile = f"tmp/dl_part2_{i:02d}.txt"
    with open(pfile, "w", newline="\n") as f:
        f.write("\n".join(part) + "\n")
    runner = f"tmp/run2_{i:02d}.sh"
    with open(runner, "w", newline="\n") as f:
        f.write('#!/bin/bash\n')
        f.write('while IFS=\'|\' read -r url path; do\n')
        f.write('  [ -z "$url" ] && continue\n')
        f.write('  if [ -s "$path" ] && head -c4 "$path" | grep -q "%PDF"; then continue; fi\n')
        f.write('  for attempt in 1 2 3 4; do\n')
        f.write('    curl -L -s --max-time 120 -A "Mozilla/5.0 livro-worker" "$url" -o "$path" && head -c4 "$path" | grep -q "%PDF" && break || { rm -f "$path"; sleep 2; }\n')
        f.write('  done\n')
        f.write('done < ' + pfile + '\n')
        f.write(f'echo RUNNER-{i:02d}-DONE\n')
    runners.append(runner)
print("wrote", len(runners), "runners")
