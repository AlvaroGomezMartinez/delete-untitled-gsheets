/**
 * Deletes Google Sheets with "Untitled" in their name from Google Drive.
 * The script searches for these specific files and moves them to the trash.
 * Intended to run on a weekly time-based trigger (e.g., Sundays between
 * midnight and 1:00 AM).
 *
 * @function deleteUntitledGoogleSheets
 * @author Alvaro Gomez
 * @return {void}
 */
function deleteUntitledGoogleSheets() {
  const query = "mimeType='application/vnd.google-apps.spreadsheet'";

  const files = DriveApp.searchFiles(query);

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const fileId = file.getId();

    if (fileName === "Untitled" || fileName.match(/^Untitled\(\d+\)$/)) {
      Logger.log(`Deleting file: Name = ${fileName}, ID = ${fileId}`);

      try {
        DriveApp.getFileById(fileId).setTrashed(true);
        Logger.log(`Successfully deleted file: ${fileName}`);
      } catch (error) {
        Logger.log(`Failed to delete file: ${fileName}, Error: ${error.message}`);
      }
    }
  }
}
