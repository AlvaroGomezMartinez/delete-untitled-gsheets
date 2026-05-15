/**
 * Calls the deleteUntitledGoogleSheets function from the DeleteUntitledSheetsLib
 * external library. The library is maintained by Alvaro Gomez and handles
 * finding and trashing all Google Sheets named "Untitled" or "Untitled(n)"
 * in the authenticated user's Google Drive.
 *
 * Library: DeleteUntitledSheetsLib
 * Maintained by: Alvaro Gomez (alvaro.gomez@iltconsulting.net)
 *
 * To update the library version, go to:
 * Apps Script Editor → Libraries → DeleteUntitledSheetsLib → change version
 *
 * @function deleteUntitledGoogleSheets
 * @return {void}
 */
function deleteUntitledGoogleSheets() {
  DeleteUntitledSheetsLib.deleteUntitledGoogleSheets();
}
