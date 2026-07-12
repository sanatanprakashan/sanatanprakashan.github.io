# Newsletter subscribe — one-time setup

The subscribe form on `books.html` saves each submitted email **directly into your
Google Doc** using a free Google Apps Script Web App. No Web3Forms, no paid service,
no server. You do this setup once.

Target Doc: <https://docs.google.com/document/d/1sqgT2FqOBmCzNZwlqJSPABKrxoIUM8U2PLFDzy55o5I/edit>

---

## Step 1 — Create the Apps Script

1. Go to <https://script.google.com> and click **New project**.
2. Delete the sample code and paste the script in the next section.
3. Rename the project (top-left) to e.g. `Sanatan Subscribe`.

## Step 2 — The script

```javascript
// Appends newsletter emails to a Google Doc.
// Doc ID is taken from the /document/d/<THIS PART>/edit portion of the URL.
const DOC_ID = "1sqgT2FqOBmCzNZwlqJSPABKrxoIUM8U2PLFDzy55o5I";

function doPost(e) {
  // Serialize concurrent submissions so two people can't clobber the write.
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const email = ((e && e.parameter && e.parameter.email) || "").trim();
    if (!email) {
      return ContentService.createTextOutput("missing email");
    }

    const doc  = DocumentApp.openById(DOC_ID);
    const body = doc.getBody();
    const stamp = Utilities.formatDate(
      new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"
    );
    body.appendParagraph(stamp + "  —  " + email);
    doc.saveAndClose();

    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  } finally {
    lock.releaseLock();
  }
}

// Lets you sanity-check the endpoint in a browser.
function doGet() {
  return ContentService.createTextOutput("Subscribe endpoint is live.");
}
```

## Step 3 — Deploy as a Web App

1. Click **Deploy ▸ New deployment**.
2. Click the gear ⚙ next to *Select type* and choose **Web app**.
3. Set:
   - **Description:** `subscribe`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**
4. Click **Deploy**. Google will ask you to **authorize** — approve the
   permissions (it needs access to your Docs). If it warns the app is
   "unverified", click **Advanced ▸ Go to … (unsafe)** — that's expected for
   your own script.
5. Copy the **Web app URL**. It ends in `/exec`.

## Step 4 — Wire the website to it

Open `books.html`, find this line near the bottom, and paste your URL in:

```js
const SUBSCRIBE_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

Commit and push. Done — submitted emails now append to your Doc.

---

## Testing

- Open the deployed `/exec` URL in a browser → you should see
  *"Subscribe endpoint is live."*
- Submit the form on `books.html` → a new timestamped line with the email
  should appear at the end of your Doc within a few seconds.

## Notes & caveats

- **Public endpoint / spam:** "Who has access: Anyone" is required for the form
  to post without a Google login, which means the URL is public. For a newsletter
  this is normally fine, but you have no spam filtering. If junk becomes a
  problem, add a honeypot field or a simple shared-secret check in `doPost`.
- **Re-deploying after edits:** if you change the script, use
  **Deploy ▸ Manage deployments ▸ (edit) ▸ New version** so the same `/exec`
  URL keeps working. A brand-new deployment gives a *new* URL you'd have to
  paste in again.
- **Prefer a Google *Sheet*?** A Sheet is better for a real mailing list
  (dedupe, export, columns). Bind the script to a Sheet instead and replace the
  Doc lines with:
  ```javascript
  SpreadsheetApp.openById(SHEET_ID).getActiveSheet()
    .appendRow([new Date(), email]);
  ```
- The form does a `no-cors` POST, so the page always shows a success message
  once the request is sent (Apps Script doesn't return readable CORS responses).
  Use the Doc itself as the source of truth for what was actually saved.
