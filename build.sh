#!/usr/bin/env bash
# Joins the parts in src/ into one self-contained page: docs/index.html
set -e
cd "$(dirname "$0")"
mkdir -p docs
{
  printf '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body style="margin:0">'
  cat src/00-head.html src/10-lib.js src/20-m01-04.js src/30-m05-08.js src/40-m09-12.js src/50-m13-16.js src/99-tail.html
  printf '</body></html>'
} > docs/index.html
echo "built docs/index.html ($(wc -c < docs/index.html) bytes)"
