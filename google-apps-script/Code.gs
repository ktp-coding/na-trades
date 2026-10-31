/**
 * N|A TRADES enrollment receiver (Google Apps Script web app).
 *
 * The website (Vercel) POSTs each enrollment here. This script:
 *   1. checks the shared secret,
 *   2. saves the payment slip in the Drive folder for the plan (private / online),
 *   3. appends one row to the plan's tab in the Google Sheet, with a link to the slip.
 *
 * Setup: see google-apps-script/README.md
 */

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || body.secret !== secret) return json_({ ok: false, error: 'unauthorized' });

    if (!/^[\w-]{10,}$/.test(body.sheetId) || !/^[\w-]{10,}$/.test(body.folderId)) {
      return json_({ ok: false, error: 'bad target' });
    }
    var allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!body.file || allowedTypes.indexOf(body.file.mimeType) === -1) {
      return json_({ ok: false, error: 'bad file' });
    }

    // 1) Save the slip.
    var bytes = Utilities.base64Decode(body.file.base64);
    if (bytes.length > 5 * 1024 * 1024) return json_({ ok: false, error: 'file too large' });
    var blob = Utilities.newBlob(bytes, body.file.mimeType, String(body.file.name).slice(0, 120));
    var file = DriveApp.getFolderById(body.folderId).createFile(blob);

    // 2) Append the row.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var ss = SpreadsheetApp.openById(body.sheetId);
      var name = body.sheetName === 'Private' ? 'Private' : 'Online';
      var sheet = ss.getSheetByName(name) || ss.insertSheet(name);

      var row = body.row || {};
      row['หลักฐานการโอนเงิน (Payment Slip)'] = file.getUrl();
      var keys = Object.keys(row);

      var lastCol = sheet.getLastColumn();
      var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
      keys.forEach(function (k) {
        if (headers.indexOf(k) === -1) headers.push(k);
      });
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      sheet.setFrozenRows(1);

      var values = headers.map(function (h) {
        var v = row[h] === undefined ? '' : String(row[h]);
        return /^[=+\-@]/.test(v) ? "'" + v : v; // no formulas from user input
      });
      sheet.appendRow(values);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true, fileUrl: file.getUrl() });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server error' });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to approve Drive + Sheets access. */
function authorize() {
  DriveApp.getRootFolder();
  SpreadsheetApp.getActiveSpreadsheet && SpreadsheetApp.getActiveSpreadsheet();
}
