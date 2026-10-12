# QR Photo Drive Uploader

Destination folder: https://drive.google.com/drive/folders/1GTKI_gpITf146Uf1XEJ18Pm1rSiOvE7A

## Setup
1. Sign in to the Google account that has **Editor** access to the destination Drive folder.
2. Go to https://script.google.com/ and create **New project**.
3. Replace the default Code.gs content with Code.gs from this package.
4. Create an HTML file via + > HTML named **Index** and paste Index.html content into it. Save.
5. Select `doGet` or `uploadPhoto` only for deployment; there's no need to run it manually. Choose **Deploy > New deployment > Web app**.
6. Set **Execute as: Me** and **Who has access: Anyone** (if your account supports it). Authorize Drive access when prompted. Review requested permissions.
7. Copy the Web app `/exec` URL. Open it on a phone NOT signed into the owner's Google account and test a small photo. Confirm it appears in the folder.
8. Make a QR code pointing to that **/exec URL** (not the Drive folder URL). Print only after testing.

## Github
GitHub can store Code.gs, Index.html and README.md as source. The actual guest-facing upload page is hosted by Google Apps Script, not GitHub Pages, avoiding cross-origin restrictions.

## Important security and limits
- This is a PUBLIC upload endpoint executing with the deploying account's authorization. Never publish the owner/developer link or grant guest editor access to the Drive folder.
- Public users may upload unwanted images and consume storage; basic MIME/size checks and a shared daily 200-file cap are included, but these are NOT robust anti-abuse protections or per-person limits.
- Google Apps Script and Drive quotas apply. Image file MIME and 8-MB max are checked both in browser and backend; uploads may still fail due to platform limits or connectivity.
- To stop uploads immediately: Deploy > Manage deployments > Archive the active deployment (or revoke access).
- Deploy code changes using Manage deployments > Edit > New version (keep the same deployed URL).
