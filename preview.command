#!/bin/bash
cd "$(dirname "$0")"
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin
echo "Starting SEO LP Preview..."
npm run dev
