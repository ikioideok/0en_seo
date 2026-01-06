#!/bin/bash
cd "$(dirname "$0")"
SCRIPT_PATH="$(pwd)/start_server.command"

echo "Registering $SCRIPT_PATH to Login Items..."
osascript -e "tell application \"System Events\" to make login item at end with properties {path:\"$SCRIPT_PATH\", hidden:false}"

echo "Done! The chat server will now start automatically when you log in."
echo "You can verify this in System Settings > General > Login Items."
