# Delete Untitled Google Sheets

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Google Apps Script that automatically deletes Google Sheets with "Untitled" in their name from your Google Drive by moving them to the trash. Runs on a weekly time-based trigger.

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

### 1. Clone or copy the script

You can deploy this script in two ways:

**Option A — Via clasp (recommended for developers):**

```bash
git clone https://github.com/<your-username>/delete-untitled-gsheets.git
cd delete-untitled-gsheets
npm install -g @google/clasp
clasp login
clasp create --type standalone --title "Delete Untitled Google Sheets"
clasp push
```

**Option B — Manually via the Apps Script editor:**

1. Go to [script.google.com](https://script.google.com) and create a new standalone project
2. Copy the contents of `src/Code.js` into the editor
3. Save the project

### 2. Set Up a Time-Based Trigger

The script is designed to run automatically on a weekly schedule. To set up the trigger manually:

1. In the Apps Script editor, click **Triggers** (clock icon) in the left sidebar
2. Click **+ Add Trigger**
3. Configure as follows:
   - **Function to run:** `deleteUntitledGoogleSheets`
   - **Event source:** Time-driven
   - **Type:** Week timer
   - **Day of week:** Sunday (or your preference)
   - **Time of day:** Midnight to 1am (or your preference)
4. Click **Save** and authorize the script when prompted

### 3. Required Permissions

The script requires the following OAuth scope, which Apps Script will request automatically on first run:

- `https://www.googleapis.com/auth/drive` — to search for and trash files in Google Drive

---

## Script Properties

This script does not require any Script Properties. No configuration is needed beyond setting up the trigger.

---

## Project Structure

```
delete-untitled-gsheets/
├── src/
│   ├── Code.js           # Main script
│   └── appsscript.json   # Apps Script manifest
├── .claspignore          # Controls which files clasp pushes
├── .gitignore
├── LICENSE
└── README.md
```

---

## Attribution

Originally created for Northside Independent School District (NISD). Generalized and released for public use upon retirement.

---

## License

[MIT](LICENSE) © 2025 Alvaro Gomez
