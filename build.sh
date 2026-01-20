#!/bin/bash

# Build CSS with Tailwind
./tailwindcss -i src/input.css -o docs/output.css --minify

# Copy HTML to docs
cp src/index.html docs/index.html

echo "Build complete! Open docs/index.html in browser"
