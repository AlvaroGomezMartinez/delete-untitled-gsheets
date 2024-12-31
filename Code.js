/**
 * Deletes Google Sheets with "Untitled" in its name from Google Drive.
 * The script searches for these specific files and moves them to the trash.
 * A trigger is set to run the funtion every week on Sundays between
 * midnight and 1:00 AM.
 * 
 * @function deleteUntitledSheets
 * @author Alvaro Gomez
 *         Academic Technology Coach
 *         Office: 210-397-9408
 *         Mobile: 210-363-1577
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
