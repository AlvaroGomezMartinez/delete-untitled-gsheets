# Delete Untitled Google Sheets

A Google Apps Script that automatically deletes Google Sheets with "Untitled" in their name from your Google Drive by moving them to the trash. Runs on a weekly time-based trigger.

The script logic is maintained as an external library (`DeleteUntitledSheetsLib`) by the original author. The district-side script is a thin wrapper that calls the library — no local code changes are needed when the library is updated.

Originally created for Northside Independent School District (NISD). Generalized for public use.

---

## What It Does

When run, the script:

1. Searches your Google Drive for all Google Sheets files
2. Identifies any file named exactly `Untitled` or matching the pattern `Untitled(n)` (e.g., `Untitled(1)`, `Untitled(2)`)
3. Moves those files to the trash
4. Logs each deletion (or any errors) to the Apps Script execution log

---

## Setup

### Option A — Via clasp (recommended for developers)

This approach uses the included `appsscript.json` manifest, which automatically wires up the `DeleteUntitledSheetsLib` library dependency.

```bash
git clone https://github.com/<your-username>/delete-untitled-gsheets.git
cd delete-untitled-gsheets
npm install -g @google/clasp
clasp login
clasp create --type standalone --title "Delete Untitled Google Sheets"
clasp push --force
```

The `--force` flag is required to push the `appsscript.json` manifest, which includes the library dependency.

### Option B — Manually via the Apps Script editor

1. Go to [script.google.com](https://script.google.com) and create a new standalone project
2. Name it something like `Delete Untitled Google Sheets`
3. Add the external library:
   - Click **+** next to **Libraries** in the left sidebar
   - Enter the Script ID: `1MNB2PhHwnPKvf2TOBqSilOzuWAl_XoNIIt--AIwPQ7HJ4p_9zla4Tbhx`
   - Click **Look up**, select the latest version
   - Set the identifier to `DeleteUntitledSheetsLib`
   - Click **Add**
4. Replace the default `Code.gs` content with:
   ```js
   function deleteUntitledGoogleSheets() {
     DeleteUntitledSheetsLib.deleteUntitledGoogleSheets();
   }
   ```
5. Save the project

### Set Up a Time-Based Trigger

Regardless of which setup option you used:

1. In the Apps Script editor, click **Triggers** (clock icon) in the left sidebar
2. Click **+ Add Trigger**
3. Configure as follows:
   - **Function to run:** `deleteUntitledGoogleSheets`
   - **Event source:** Time-driven
   - **Type:** Week timer
   - **Day of week:** Sunday (or your preference)
   - **Time of day:** Midnight to 1am (or your preference)
4. Click **Save** and authorize the script when prompted

### Required Permissions

The script requires the following OAuth scope, which Apps Script will request automatically on first run:

- `https://www.googleapis.com/auth/drive` — to search for and trash files in Google Drive

---

## Updating the Library

The `appsscript.json` manifest uses `"developmentMode": true`, which means the script always runs against the latest version of `DeleteUntitledSheetsLib` automatically. No manual version updates are needed.

If you prefer to pin to a specific version, edit `src/appsscript.json`, set `"developmentMode": false`, and change `"version"` to the desired version number, then run `clasp push --force`.

---

## Script Properties

This script does not require any Script Properties. No configuration is needed beyond setting up the trigger.

---

## Project Structure

```
delete-untitled-gsheets/
├── src/
│   ├── Code.js           # Wrapper that calls the external library
│   └── appsscript.json   # Apps Script manifest (includes library dependency)
├── .claspignore          # Controls which files clasp pushes
├── .gitignore
└── README.md
```

---

## Attribution

Originally created for Northside Independent School District (NISD). Generalized and released for public use upon retirement.
