#!/bin/bash
cd "$(dirname "$0")"

# Check if port 3001 is already in use
if lsof -i :3001 > /dev/null; then
    echo "=============================================="
    echo "Chat Server is ALREADY RUNNING."
    echo "You can close this window."
    echo "=============================================="
    # Keep window open for a moment so user can read
    sleep 5
else
    echo "Starting Chat Server..."
    node server/index.js
fi
