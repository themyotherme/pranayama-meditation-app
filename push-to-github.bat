@echo off
echo ========================================
echo Push Pranayama App to GitHub
echo ========================================
echo.

echo Please follow these steps:
echo.
echo 1. Go to https://github.com
echo 2. Click "New repository"
echo 3. Name: pranayama-meditation-app
echo 4. Make it PUBLIC
echo 5. Don't add README
echo 6. Click "Create repository"
echo.
echo 7. Copy the repository URL from GitHub
echo 8. Paste it below when prompted
echo.

set /p REPO_URL="Enter your GitHub repository URL (https://github.com/USERNAME/pranayama-meditation-app.git): "

echo.
echo Adding remote repository...
git remote add origin %REPO_URL%

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Go to netlify.com
echo 2. Click "New site from Git"
echo 3. Choose GitHub
echo 4. Select your repository
echo 5. Deploy!
echo.
echo Or use GitHub Pages:
echo 1. Go to repository Settings
echo 2. Scroll to Pages section
echo 3. Enable Pages
echo.
pause
