#!/bin/bash

# Build CSS with Tailwind
./tailwindcss -i src/input.css -o dist/output.css --minify

# Copy HTML to dist
cp src/index.html dist/index.html

echo "Build complete! Open dist/index.html in browser"
