#!/bin/sh
set -e

# ── 1. Animated Terminal Spinner Helper ──────────────────────────────────────
spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    
    # Hide cursor for a clean terminal feel
    tput civis 2>/dev/null || exec 2>&1
    
    while kill -0 "$pid" 2>/dev/null; do
        local temp=${spinstr#?}
        printf " [%c] Extracting application files and setting up workspaces..." "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\r"
    done
    
    # Restore cursor
    tput cnorm 2>/dev/null || exec 2>&1
    # Clear spinner line
    printf "                                                           \r"
}

OS="$(uname)"
echo "========================================="
echo "         Welcome to DashDraft            "
echo "   Analyze your data with AI. Keep it private"
echo "========================================="
echo ""
echo "🚀 Preparing to set up your DashDraft environment securely..."
echo ""

if [ "$OS" = "Darwin" ]; then
    echo "OS Detected: macOS"
    
    # Detect CPU Architecture
    ARCH=$(uname -m)
    if [ "$ARCH" = "arm64" ]; then
        URL="https://github.com/amjadcp/dashdraft-doc/releases/latest/download/DashDraft-mac-arm64.zip"
        echo "💻 Architecture: Apple Silicon (arm64)"
    else
        URL="https://github.com/amjadcp/dashdraft-doc/releases/latest/download/DashDraft-mac-x64.zip"
        echo "💻 Architecture: Intel Processor (x64)"
    fi

    # Step 1: Downloading
    TEMP_ZIP="/tmp/dashdraft.zip"
    echo ""
    echo "📦 [Step 1/3] Downloading latest release from GitHub..."
    curl -f -# -L -o "$TEMP_ZIP" "$URL"
    echo " -> Download complete. Verifying zip archive..."

    # Step 2: Extracting
    echo ""
    echo "⚙️ [Step 2/3] Extracting app to your Applications folder..."
    sudo rm -rf /Applications/DashDraft.app
    
    # Run unzip in background and attach the spinner to its process ID
    sudo unzip -o -q "$TEMP_ZIP" -d /Applications/ &
    spinner $!
    
    rm "$TEMP_ZIP"
    echo "✓ App extracted successfully."

    # Step 3: Security & PATH registration
    echo ""
    echo "🛡️ [Step 3/3] Configuring macOS local security policies..."
    echo "🔑 Please enter your system password when prompted:"
    echo ""
    sudo xattr -rd com.apple.quarantine /Applications/DashDraft.app
    sudo chmod -R 755 /Applications/DashDraft.app
    # Create the global CLI symlink pointing to our wrapper script instead of the GUI binary
    sudo mkdir -p /usr/local/bin
    sudo ln -sf /Applications/DashDraft.app/Contents/Resources/bin/dashdraft /usr/local/bin/dashdraft

    echo ""
    echo "========================================="
    echo "   🎉 DashDraft is Ready to Go! 🎉     "
    echo "========================================="
    echo "Next Steps to get started:"
    echo "1. 🚀 Open your Launchpad and click 'DashDraft' to run the premium UI launcher."
    echo "2. 💻 Or open a new Terminal and run 'dashdraft start' to spin up the server."
    echo "3. 🤖 Connect your Claude Desktop client to start querying your data instantly!"
    echo ""

elif [ "$OS" = "Linux" ]; then
    echo "OS Detected: Linux"
    echo ""

    # Step 1: Downloading
    URL="https://github.com/amjadcp/dashdraft-doc/releases/latest/download/DashDraft-linux-amd64.deb"
    TEMP_DEB="/tmp/dashdraft.deb"
    echo "📦 [Step 1/2] Downloading latest Debian package..."
    curl -f -# -L -o "$TEMP_DEB" "$URL"
    echo " -> Download complete. Verifying package..."

    # Step 2: Installing
    echo ""
    echo "⚙️ [Step 2/2] Installing package (requires sudo privileges)..."
    sudo dpkg -i "$TEMP_DEB" || sudo apt-get install -f -y
    # Create the global CLI symlink pointing to our wrapper script instead of the GUI binary
    sudo mkdir -p /usr/local/bin
    sudo chmod +x /opt/DashDraft/resources/bin/dashdraft
    sudo ln -sf /opt/DashDraft/resources/bin/dashdraft /usr/local/bin/dashdraft
    rm "$TEMP_DEB"

    echo ""
    echo "========================================="
    echo "   🎉 DashDraft is Ready to Go! 🎉     "
    echo "========================================="
    echo "Next Steps to get started:"
    echo "1. 🚀 Open your desktop Applications menu and click 'DashDraft'."
    echo "2. 💻 Or open a new Terminal and run 'dashdraft start' to spin up the server."
    echo "3. 🤖 Connect your Claude Desktop client to start querying your data instantly!"
    echo ""

else
    echo "✗ Error: Unsupported operating system: $OS"
    exit 1
fi
