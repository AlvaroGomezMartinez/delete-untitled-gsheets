# Delete Untitled Google Sheets

A Google Apps Script that automatically deletes Google Sheets with "Untitled" in their name from your Google Drive by moving them to the trash. Runs on a weekly time-based trigger.

The script logic is maintained as an external library (`DeleteUntitledSheetsLib`) by the original author. The district-side script is a thin wrapper that calls the library — no local code changes are needed when the library is updated.

---

## What It Does

When run, the script:

1. Searches your Google Drive for all Google Sheets files
2. Identifies any file named exactly `Untitled` or matching the pattern `Untitled(n)` (e.g., `Untitled(1)`, `Untitled(2)`)
3. Moves those files to the trash
4. Logs each deletion (or any errors) to the Apps Script execution log

---

## Setup

### 1. Create a new standalone Apps Script project

1. Go to [script.google.com](https://script.google.com) and create a new standalone project
2. Name it something like `Delete Untitled Google Sheets`

### 2. Add the external library

1. In the Apps Script editor, click **+** next to **Libraries** in the left sidebar
2. Enter the Script ID for `DeleteUntitledSheetsLib`:
   ```
   1MNB2PhHwnPKvf2TOBqSilOzuWAl_XoNIIt--AIwPQ7HJ4p_9zla4Tbhx
   ```
3. Click **Look up**, select the latest version (or **HEAD** for always-latest)
4. Set the identifier to `DeleteUntitledSheetsLib`
5. Click **Add**

### 3. Add the wrapper function

Replace the default `Code.gs` content with:

```js
function deleteUntitledGoogleSheets() {
  DeleteUntitledSheetsLib.deleteUntitledGoogleSheets();
}
```

### 4. Set Up a Time-Based Trigger

1. In the Apps Script editor, click **Triggers** (clock icon) in the left sidebar
2. Click **+ Add Trigger**
3. Configure as follows:
   - **Function to run:** `deleteUntitledGoogleSheets`
   - **Event source:** Time-driven
   - **Type:** Week timer
   - **Day of week:** Sunday (or your preference)
   - **Time of day:** Midnight to 1am (or your preference)
4. Click **Save** and authorize the script when prompted

### 5. Required Permissions

The script requires the following OAuth scope, which Apps Script will request automatically on first run:

- `https://www.googleapis.com/auth/drive` — to search for and trash files in Google Drive

---

## Updating the Library

When the library author publishes a new version:

1. In the Apps Script editor, go to **Libraries → DeleteUntitledSheetsLib**
2. Change the version to the latest available
3. Click **Save**

No changes to the wrapper function are needed.

---

## Script Properties

This script does not require any Script Properties. No configuration is needed beyond setting up the trigger.

---

## Project Structure

```
delete-untitled-gsheets/
├── src/
│   ├── Code.js           # Wrapper that calls the external library
│   └── appsscript.json   # Apps Script manifest
├── .claspignore          # Controls which files clasp pushes
├── .gitignore
├── LICENSE
└── README.md
```

---