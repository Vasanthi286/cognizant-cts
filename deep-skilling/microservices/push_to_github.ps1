# Set error action to stop on first error
$ErrorActionPreference = "Stop"

Write-Host "Starting the process to push files to 'deep-skilling/microservices' on GitHub..." -ForegroundColor Cyan

$WorkspaceDir = "c:\Users\manep\OneDrive\Desktop\microservices"
$CloneDir = "$WorkspaceDir\..\cognizant-cts-temp"
$RepoUrl = "https://github.com/Vasanthi286/cognizant-cts.git"

# 1. Clone the repository
if (Test-Path $CloneDir) {
    Write-Host "Target directory '$CloneDir' already exists. Removing it to get a fresh clone..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $CloneDir
}

Write-Host "Cloning repository..." -ForegroundColor Green
git clone $RepoUrl $CloneDir

# 2. Copy the folders and files into deep-skilling/microservices
$TargetDir = "$CloneDir\deep-skilling\microservices"
Write-Host "Creating target subdirectory if it doesn't exist..." -ForegroundColor Green
if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force
}

Write-Host "Copying project files to '$TargetDir'..." -ForegroundColor Green
# Copy all files and folders from the workspace, excluding obj, bin, .git, and the temporary clone directory
Get-ChildItem -Path $WorkspaceDir -Exclude "bin", "obj", ".git" | ForEach-Object {
    if ($_.Name -ne "cognizant-cts-temp") {
        Copy-Item -Path $_.FullName -Destination $TargetDir -Recurse -Force
    }
}

# 3. Commit and push
Write-Host "Changing directory to clone..." -ForegroundColor Green
cd $CloneDir

Write-Host "Adding files to Git..." -ForegroundColor Green
git add deep-skilling/microservices/

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Add JWT Authentication Microservice project to deep-skilling"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

# Cleanup temp clone
Write-Host "Cleaning up temporary clone folder..." -ForegroundColor Green
cd $WorkspaceDir
Remove-Item -Recurse -Force $CloneDir

Write-Host "Successfully pushed folders to 'deep-skilling/microservices' on GitHub!" -ForegroundColor Cyan
