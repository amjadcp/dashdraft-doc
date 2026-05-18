#Requires -Version 5.1
# ============================================================
#  DashDraft Installer - Windows
#  Run in PowerShell (non-admin):
#    irm https://get.dashdraft.app/win | iex
# ============================================================
$ErrorActionPreference = "Stop"
$ProgressPreference    = "SilentlyContinue"

$ReleaseBase = "https://dashdraft.netlify.app"
$LatestUrl   = "$ReleaseBase/latest.json"
$InstallDir  = Join-Path $env:LOCALAPPDATA "DashDraft"
$BinPath     = Join-Path $InstallDir "dashdraft.exe"
$DataDir     = Join-Path $env:USERPROFILE "DashDraft-workspaces"
$ConfigPath  = Join-Path $InstallDir "config.json"
$LogPath     = Join-Path $InstallDir "DashDraft.log"
$Port        = 7700
$McpPort     = 7701
$TaskName    = "DashDraft Local Data Workspace"

function Write-Step ($m) { Write-Host "`n  > $m" -ForegroundColor Cyan }
function Write-Ok   ($m) { Write-Host "    OK  $m" -ForegroundColor Green }
function Write-Warn ($m) { Write-Host "    !   $m" -ForegroundColor Yellow }
function Write-Fail ($m) { Write-Host "`n  ERROR: $m`n" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "  DashDraft - Local Data Workspace" -ForegroundColor White
Write-Host "  https://dashdraft.netlify.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "  This installer will:"
Write-Host "    - Download DashDraft to  $InstallDir"
Write-Host "    - Add 'dashdraft' as a global command"
Write-Host "    - Start DashDraft automatically when you log in"
Write-Host ""
$c = Read-Host "  Continue? [Y/n]"
if ($c -match "^[nN]") { Write-Host "  Cancelled."; exit 0 }

# === Step 1: Detect architecture ==============================
Write-Step "Detecting your system"
$arch = $env:PROCESSOR_ARCHITECTURE
if ($arch -eq "AMD64" -or $arch -eq "EM64T") {
    $BinaryKey = "win-x64"; $ArchLabel = "x64"
} elseif ($arch -eq "ARM64") {
    $BinaryKey = "win-arm64"; $ArchLabel = "ARM64"
} else { Write-Fail "Unsupported architecture: $arch" }
Write-Ok "$((Get-WmiObject Win32_OperatingSystem).Caption)  ($ArchLabel)"

# === Step 2: Fetch latest.json ================================
Write-Step "Checking latest version"
try { $latest = Invoke-RestMethod -Uri $LatestUrl -UseBasicParsing }
catch { Write-Fail "Could not reach $LatestUrl`n$_" }

$version     = $latest.version
$downloadUrl = $latest.$BinaryKey
$checksum    = $latest."${BinaryKey}_sha256"

if (-not $version)     { Write-Fail "Could not read version from release server." }
if (-not $downloadUrl) { Write-Fail "No download URL for $BinaryKey in latest.json." }
Write-Ok "Version $version"

# === Step 3: Create directories ===============================
Write-Step "Creating directories"
New-Item -ItemType Directory -Force -Path $InstallDir          | Out-Null
New-Item -ItemType Directory -Force -Path $DataDir             | Out-Null
New-Item -ItemType Directory -Force -Path "$DataDir\exports"   | Out-Null
Write-Ok $InstallDir

# === Step 4: Download binary ==================================
Write-Step "Downloading DashDraft $version"
$TmpBin = Join-Path $env:TEMP "dashdraft-$BinaryKey.exe"

# Force TLS 1.2 / 1.3 compatibility
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13

try {
    $request = [System.Net.HttpWebRequest]::Create($downloadUrl)
    $request.UserAgent = "Mozilla/5.0"
    $request.Timeout = 60000 # 60 seconds timeout
    $response = $request.GetResponse()
    $totalLength = $response.ContentLength
    $responseStream = $response.GetResponseStream()

    $targetStream = New-Object System.IO.FileStream($TmpBin, [System.IO.FileMode]::Create)
    $buffer = New-Object Byte[] 65536
    $bytesRead = 0
    $totalBytesRead = 0

    while (($bytesRead = $responseStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
        $targetStream.Write($buffer, 0, $bytesRead)
        $totalBytesRead += $bytesRead
        
        if ($totalLength -gt 0) {
            $percent = [Math]::Floor(($totalBytesRead / $totalLength) * 100)
            $width = 40
            $done = [Math]::Min($width, [Math]::Floor(($totalBytesRead / $totalLength) * $width))
            $left = $width - $done
            $bar = ("=" * $done) + (" " * $left)
            $receivedMB = "{0:N1}" -f ($totalBytesRead / 1MB)
            $totalMB = "{0:N1}" -f ($totalLength / 1MB)
            Write-Host "`r    Progress: [$bar] $percent% ($receivedMB / $totalMB MB)" -NoNewline
        } else {
            $receivedMB = "{0:N1}" -f ($totalBytesRead / 1MB)
            Write-Host "`r    Progress: Downloaded $receivedMB MB" -NoNewline
        }
    }
    Write-Host "" # New line after completing progress

    $targetStream.Close()
    $responseStream.Close()
    $response.Close()
}
catch {
    if ($targetStream) { $targetStream.Close() }
    Remove-Item $TmpBin -Force -ErrorAction SilentlyContinue
    Write-Fail "Download failed: $_"
}
Write-Ok "Downloaded"

# === Step 5: Verify checksum ==================================
Write-Step "Verifying download"
if ($checksum) {
    $actual = (Get-FileHash -Path $TmpBin -Algorithm SHA256).Hash.ToLower()
    if ($actual -ne $checksum.ToLower()) {
        Remove-Item $TmpBin -Force
        Write-Fail "Checksum mismatch.`n  Expected: $checksum`n  Got:      $actual"
    }
    Write-Ok "SHA-256 verified"
} else { Write-Warn "No checksum provided - skipping verification" }

# === Step 6: Stop existing instance ===========================
Write-Step "Installing"
Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
Get-Process -Name "dashdraft" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500

# === Step 7: Copy binary -> InstallDir ========================
Copy-Item -Path $TmpBin -Destination $BinPath -Force
Remove-Item $TmpBin -Force
Write-Ok "Binary installed: $BinPath"

# === Step 8: Add to user PATH =================================
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$paths = $currentPath -split ';' | Where-Object { $_ -ne "" }
if ($paths -notcontains $InstallDir) {
    $cleanPaths = $paths | Where-Object { $_ -ne "$InstallDir\dashdraft.exe" }
    $newPath = ($cleanPaths + $InstallDir) -join ';'
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    $env:PATH = "$env:PATH;$InstallDir"
    Write-Ok "Added to PATH - 'dashdraft' is now a global command"
} else { Write-Ok "Already in PATH" }

# === Step 9: Write initial config =============================
if (-not (Test-Path $ConfigPath)) {
    @{
        version=1; port=$Port; mcpPort=$McpPort; mcpTransport="both"
        workspacesDir=$DataDir; exportsDir="$DataDir\exports"
        openBrowserOnStart=$true; updateChannel="stable"
    } | ConvertTo-Json -Depth 3 | Set-Content -Path $ConfigPath -Encoding UTF8
    Write-Ok "Config created"
} else { Write-Ok "Existing config preserved" }

# === Step 10: Start and verify health =========================
Write-Step "Verifying service health"
$proc = Start-Process -FilePath $BinPath -ArgumentList "start" -WindowStyle Hidden -PassThru

Write-Host "    Testing startup" -NoNewline
$ok = $false
for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Milliseconds 500
    try { $null = Invoke-WebRequest "http://localhost:$Port/api/health" -UseBasicParsing -TimeoutSec 1; $ok = $true; break }
    catch { Write-Host "." -NoNewline }
}
Write-Host ""
if ($ok) {
    Write-Ok "Health check passed - installation verified successfully"
} else {
    Write-Warn "Server slow to start or failed to respond. Check: $LogPath"
}

# Clean up background process to free up the port for manual runs
if ($proc) {
    $proc | Stop-Process -Force -ErrorAction SilentlyContinue
}


# === Done =====================================================
Write-Host "  Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "  Commands:"
Write-Host "    dashdraft start            - Start dashboard + HTTP MCP"
Write-Host "    dashdraft start --mcp-stdio - stdio mode for Claude Desktop"
Write-Host "    dashdraft tunnel            - Open ngrok HTTPS tunnel"
Write-Host ""
Write-Host "  Dashboard : http://localhost:$Port"
Write-Host "  MCP (HTTP): http://localhost:$McpPort/mcp"
Write-Host "  Docs      : https://dashdraft.netlify.app/connect" -ForegroundColor Cyan
Write-Host ""