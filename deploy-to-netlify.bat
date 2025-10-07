@echo off
echo ========================================
echo Pranayama Meditation App - Netlify Deploy
echo ========================================
echo.

echo Creating deployment package...
echo.

REM Create a temporary directory for deployment
if exist "netlify-deploy" rmdir /s /q "netlify-deploy"
mkdir "netlify-deploy"

echo Copying files...
xcopy /E /I /Y "index.html" "netlify-deploy\"
xcopy /E /I /Y "framework.js" "netlify-deploy\"
xcopy /E /I /Y "ai-integration.js" "netlify-deploy\"
xcopy /E /I /Y "manifest.json" "netlify-deploy\"
xcopy /E /I /Y "service-worker.js" "netlify-deploy\"
xcopy /E /I /Y "netlify.toml" "netlify-deploy\"

echo Copying directories...
xcopy /E /I /Y "audio" "netlify-deploy\audio\"
xcopy /E /I /Y "images" "netlify-deploy\images\"
xcopy /E /I /Y "configs" "netlify-deploy\configs\"
xcopy /E /I /Y "examples" "netlify-deploy\examples\"

echo.
echo ========================================
echo Deployment package ready!
echo ========================================
echo.
echo Files are in: netlify-deploy\
echo.
echo Next steps:
echo 1. Go to netlify.com
echo 2. Click "Add new site" -> "Deploy manually"
echo 3. Drag the entire "netlify-deploy" folder to Netlify
echo 4. Wait for deployment to complete
echo 5. Set up custom domain: pranyammeditation.lifeloveme.com
echo.
echo Press any key to open the deployment folder...
pause >nul

explorer "netlify-deploy"
