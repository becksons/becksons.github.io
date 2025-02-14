#!/bin/sh
set -e

echo "Installing dependencies using npm ci..."
npm ci

echo "Building the game..."
npm run build

echo "Deployment complete."
