#!/usr/bin/env bash
# ============================================================
#  DashDraft Installer - macOS
#  curl -fsSL https://get.dashdraft.app/mac | bash
# ============================================================
set -euo pipefail

RELEASE_BASE="https://dashdraft.app"
LATEST_URL="${RELEASE_BASE}/latest.json"
INSTALL_DIR="${HOME}/.DashDraft"
BIN_PATH="${INSTALL_DIR}/dashdraft"
DATA_DIR="${HOME}/DashDraft-workspaces"
CONFIG_FILE="${INSTALL_DIR}/config.json"
PLIST_PATH="${HOME}/Library/LaunchAgents/app.DashDraft.plist"
LOG_FILE="${INSTALL_DIR}/DashDraft.log"
PORT=7700; MCP_PORT=7701

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; RESET='\033[0m'
print_step()  { echo -e "\n${BLUE}${BOLD}> $1${RESET}"; }
print_ok()    { echo -e "  ${GREEN}OK${RESET} $1"; }
print_warn()  { echo -e "  ${YELLOW}!${RESET} $1"; }
print_error() { echo -e "\n${RED}${BOLD}Error:${RESET} $1\n"; exit 1; }

echo ""
echo -e "${BOLD}  DashDraft - Local Data Workspace${RESET}"
echo -e "  ${BLUE}https://dashdraft.app{RESET}"
echo ""
echo "  Installs to ~/.DashDraft/ - no Node.js or admin required."
echo ""
read -r -p "  Continue? [Y/n] " r; case "$r" in [nN]*) echo "Cancelled."; exit 0;; esac

command -v curl &>/dev/null || print_error "curl is required: xcode-select --install"

# === Step 1: Detect arch ====================================
print_step "Detecting your Mac"
ARCH=$(uname -m)
case "$ARCH" in
  arm64)   BINARY_KEY="macos-arm64"; ARCH_LABEL="Apple Silicon (M-series)" ;;
  x86_64)  BINARY_KEY="macos-x64";   ARCH_LABEL="Intel" ;;
  *) print_error "Unknown architecture: $ARCH" ;;
esac
print_ok "macOS $(sw_vers -productVersion) (${ARCH_LABEL})"

# === Step 2: Fetch latest.json ==============================
print_step "Checking latest version"
LATEST_JSON=$(curl -fsSL "${LATEST_URL}") || print_error "Cannot reach ${LATEST_URL}"

VERSION=$(echo "${LATEST_JSON}"      | grep -o '"version":"[^"]*"'                | head -1 | sed 's/"version":"//;s/"//')
DOWNLOAD_URL=$(echo "${LATEST_JSON}" | grep -o "\"${BINARY_KEY}\":\"[^\"]*\""     | sed "s/\"${BINARY_KEY}\":\"//;s/\"//")
CHECKSUM=$(echo "${LATEST_JSON}"     | grep -o "\"${BINARY_KEY}_sha256\":\"[^\"]*\"" | sed "s/\"${BINARY_KEY}_sha256\":\"//;s/\"//")

[[ -z "${VERSION}" ]]      && print_error "Cannot parse version from server."
[[ -z "${DOWNLOAD_URL}" ]] && print_error "No URL for ${BINARY_KEY} in latest.json."
print_ok "Version ${VERSION}"

# === Step 3: Directories ====================================
print_step "Creating directories"
mkdir -p "${INSTALL_DIR}" "${DATA_DIR}/exports"
print_ok "${INSTALL_DIR}"

# === Step 4: Download binary ================================
print_step "Downloading DashDraft ${VERSION}"
TMPBIN=$(mktemp)
trap 'rm -f "${TMPBIN}"' EXIT
curl -fL --progress-bar "${DOWNLOAD_URL}" -o "${TMPBIN}" || print_error "Download failed."
print_ok "Downloaded"

# === Step 5: Verify =========================================
print_step "Verifying download"
if [[ -n "${CHECKSUM}" ]]; then
  ACTUAL=$(shasum -a 256 "${TMPBIN}" | awk '{print $1}')
  [[ "${ACTUAL}" != "${CHECKSUM}" ]] && print_error "Checksum mismatch.\n  Expected: ${CHECKSUM}\n  Got:      ${ACTUAL}"
  print_ok "SHA-256 verified"
else print_warn "No checksum - skipping"; fi

# === Step 6: Stop existing ==================================
print_step "Installing"
launchctl list 2>/dev/null | grep -q "app.DashDraft" && launchctl unload "${PLIST_PATH}" 2>/dev/null || true
rm -f "${PLIST_PATH}"
pkill -f "${BIN_PATH}" 2>/dev/null || true

# === Step 7: Copy binary ====================================
cp -f "${TMPBIN}" "${BIN_PATH}"
chmod +x "${BIN_PATH}"
print_ok "Binary installed: ${BIN_PATH}"

# === Step 8: Add to PATH ====================================
GUARD="# DashDraft PATH"
for RC in "${HOME}/.zshrc" "${HOME}/.bash_profile" "${HOME}/.bashrc"; do
  if [[ -f "${RC}" ]] && ! grep -q "${GUARD}" "${RC}" 2>/dev/null; then
    printf '\n%s\nexport PATH="%s:$PATH"\n' "${GUARD}" "${INSTALL_DIR}" >> "${RC}"
  fi
done
export PATH="${INSTALL_DIR}:${PATH}"
print_ok "Added to PATH - 'dashdraft' is now a global command"

# === Step 9: Config =========================================
[[ ! -f "${CONFIG_FILE}" ]] && cat > "${CONFIG_FILE}" << CFG
{
  "version": 1, "port": ${PORT}, "mcpPort": ${MCP_PORT},
  "mcpTransport": "both", "workspacesDir": "${DATA_DIR}",
  "exportsDir": "${DATA_DIR}/exports", "openBrowserOnStart": true,
  "updateChannel": "stable"
}
CFG
print_ok "Config ready"
# === Step 10: Start and verify health =======================
print_step "Verifying service health"
nohup "${BIN_PATH}" start >> "${LOG_FILE}" 2>&1 &
TEMP_PID=$!

echo -n "  Testing startup"
OK=false
for i in {1..20}; do
  sleep 0.5
  if curl -sf "http://localhost:${PORT}/api/health" &>/dev/null; then
    OK=true
    echo ""
    break
  fi
  echo -n "."
done

if $OK; then
  print_ok "Health check passed - installation verified successfully"
else
  echo ""
  print_warn "Server slow to start or failed to respond. Check: ${LOG_FILE}"
fi

# Clean up background process to free up the port for manual runs
if [[ -n "${TEMP_PID}" ]]; then
  kill -15 "${TEMP_PID}" 2>/dev/null || kill -9 "${TEMP_PID}" 2>/dev/null || true
fi


echo ""
echo -e "${BOLD}  Installation complete!${RESET}"
echo -e "  Dashboard : http://localhost:${PORT}"
echo -e "  MCP (HTTP): http://localhost:${MCP_PORT}/mcp"
echo -e "  Docs      : ${BLUE}https://dashdraft.app${RESET}"
echo ""
echo -e "  ${YELLOW}Note:${RESET} Open a new terminal or run 'source ~/.zshrc' to use 'dashdraft'."