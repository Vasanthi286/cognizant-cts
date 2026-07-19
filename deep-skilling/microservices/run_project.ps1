# PowerShell script to restore and run the JwtAuthDemo project
$ErrorActionPreference = "Stop"

Write-Host "Restoring NuGet packages for JwtAuthDemo..." -ForegroundColor Cyan
dotnet restore

Write-Host "Starting the JwtAuthDemo API service..." -ForegroundColor Green
dotnet run --urls "http://localhost:5000;https://localhost:5001"
