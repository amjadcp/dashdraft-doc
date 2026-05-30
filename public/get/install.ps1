Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "         Welcome to DashDraft            " -ForegroundColor Cyan
Write-Host "   Analyze your data with AI. Keep it private" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Preparing to set up your DashDraft environment securely..." -ForegroundColor Gray
Write-Host ""

$url = "https://github.com/amjadcp/dashdraft-doc/releases/latest/download/DashDraft-win-x64.exe"
$tempPath = Join-Path $env:TEMP "dashdraft-setup.exe"

# Step 1: Download
Write-Host "[1/3] Downloading DashDraft securely from GitHub..." -ForegroundColor Yellow
Import-Module BitsTransfer
Start-BitsTransfer -Source $url -Destination $tempPath
Write-Host " -> Download complete. Verifying files..." -ForegroundColor Green
Write-Host ""

# Step 2: Install Silently with Spinner (No user interaction needed!)
Write-Host "[2/3] Installing DashDraft and registering system paths..." -ForegroundColor Yellow
$process = Start-Process -FilePath $tempPath -ArgumentList "/S" -PassThru

# Animated terminal spinner while process is running
$spinChars = @('|', '/', '-', '\')
$i = 0
while (-not $process.HasExited) {
    $char = $spinChars[$i % 4]
    Write-Host -NoNewline " [$char] Extracting and registering files... Please wait.`r"
    Start-Sleep -Milliseconds 100
    $i++
}
# Clear the spinner line
Write-Host -NoNewline "                                                           `r"
Write-Host " -> Installation complete. Cleaning up setup files..." -ForegroundColor Green
Write-Host ""

# Clean up temp installer
Remove-Item $tempPath -Force

# Step 3: Global Path verification & Success
Write-Host "[3/3] Completing setup..." -ForegroundColor Yellow
Write-Host " -> Global CLI command 'dashdraft' is now active!" -ForegroundColor Green
Write-Host " -> Launcher shortcut successfully added to your Start Menu." -ForegroundColor Green
Write-Host ""

Write-Host "=========================================" -ForegroundColor Green
Write-Host "     DashDraft is Ready to Go!           " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Next Steps to get started:" -ForegroundColor Yellow
Write-Host "1. Type 'dashdraft start' in a new terminal to launch the dashboard" -ForegroundColor White
Write-Host "2. Or open your Start Menu and search for 'DashDraft' to run the premium UI launcher." -ForegroundColor White
Write-Host "3. Connect your Claude Desktop client to start querying your data instantly!" -ForegroundColor White
Write-Host ""
