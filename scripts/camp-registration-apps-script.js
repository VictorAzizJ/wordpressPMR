/**
 * People’s Media Camp — Google Apps Script webhook
 *
 * Paste this into a script bound to your camp registrations Google Sheet
 * (Extensions → Apps Script). Then, in this order:
 *
 *   1. Save.
 *   2. Run setupCampRegister (Run ▶ setupCampRegister) and grant Sheets,
 *      Gmail, and Triggers permission. You should get a test email.
 *   3. Deploy as a Web app (or Manage deployments → New version):
 *        Execute as: Me
 *        Who has access: Anyone
 *
 * After every script edit, create a New version so the live URL updates.
 * Paste the web app URL into GOOGLE_SHEETS_WEBHOOK_URL (server-only env).
 *
 * If this sheet already has rows from the previous form (single Name column,
 * no attending-day columns), start a new tab or a new spreadsheet so headers
 * and data stay aligned.
 */
var STAFF_BCC = "camp@peoplesmediarecord.com";
var REPLY_TO = "camp@peoplesmediarecord.com";
var FROM_NAME = "People’s Media Record";

var HEADERS = [
  "Submitted At",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Attending Saturday",
  "Attending Sunday",
  "Age Range",
  "Neighborhood",
  "City",
  "Organization",
  "How Did You Hear",
  "Accessibility Needs",
  "Dietary Preferences",
  "Children",
  "Child Allergies",
  "Emergency Contact Phone",
  "Notes",
  "Source",
  "Email Status",
];

function setupCampRegister() {
  ensureEmailTrigger_();
  var me = Session.getEffectiveUser().getEmail();
  if (!me) {
    throw new Error("Could not read your Google account email.");
  }
  sendMailTo_(me);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    appendRegistrationRow_(payload, "pending");
    var status = "pending";
    try {
      status = sendConfirmationEmail_(payload);
    } catch (mailErr) {
      status =
        "error: " +
        String(mailErr && mailErr.message ? mailErr.message : mailErr);
    }
    setLastEmailStatus_(status);
    try {
      ensureEmailTrigger_();
    } catch (triggerErr) {
      // Run setupCampRegister from the editor if trigger install is blocked.
    }
    return jsonResponse_({ ok: true, emailStatus: status });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      error: String(err && err.message ? err.message : err),
    });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "pmr-camp-register",
    message: "POST JSON registrations to this URL.",
  });
}

function processPendingEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  ensureHeaderRow_(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var statusCol = HEADERS.length;
  var emailCol = 4;
  var rowCount = lastRow - 1;
  var emails = sheet.getRange(2, emailCol, rowCount, 1).getValues();
  var statuses = sheet.getRange(2, statusCol, rowCount, 1).getValues();

  for (var i = 0; i < statuses.length; i++) {
    var status = String(statuses[i][0] || "");
    if (status !== "pending" && status.indexOf("error:") !== 0) continue;
    var email = emails[i][0];
    if (!email) {
      sheet.getRange(i + 2, statusCol).setValue("skipped: no email");
      continue;
    }
    try {
      sheet.getRange(i + 2, statusCol).setValue(sendMailTo_(email));
    } catch (err) {
      sheet.getRange(i + 2, statusCol).setValue(
        "error: " + String(err && err.message ? err.message : err)
      );
    }
  }
}

function appendRegistrationRow_(payload, emailStatus) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  ensureHeaderRow_(sheet);

  var children = formatChildren_(payload.children);
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.firstName || "",
    payload.lastName || "",
    payload.email || "",
    payload.phone || "",
    attendingDay_(payload, "saturday"),
    attendingDay_(payload, "sunday"),
    payload.ageRange || "",
    payload.neighborhood || "",
    payload.city || "",
    payload.organization || "",
    payload.hearAbout || "",
    payload.accessibilityNeeds || "",
    payload.dietaryNeeds || "",
    children,
    payload.childAllergies || "",
    payload.emergencyContactPhone || "",
    payload.notes || "",
    payload.source || "pmr-camp-register",
    emailStatus || "pending",
  ]);
}

function setLastEmailStatus_(status) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  sheet.getRange(lastRow, HEADERS.length).setValue(status);
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  var range = sheet.getRange(1, 1, 1, HEADERS.length);
  var existing = range.getValues()[0];
  for (var i = 0; i < HEADERS.length; i++) {
    if (existing[i] !== HEADERS[i]) {
      range.setValues([HEADERS]);
      return;
    }
  }
}

function attendingDay_(payload, day) {
  var days = payload.attendingDays;
  if (!days || !days.length) return "";
  for (var i = 0; i < days.length; i++) {
    if (days[i] === day) return "Yes";
  }
  return "No";
}

function formatChildren_(children) {
  if (!children || !children.length) return "";
  return children
    .map(function (child) {
      var name = (child && child.name) || "";
      var age = (child && child.age) || "";
      if (name && age) return name + " (" + age + ")";
      return name || age;
    })
    .filter(Boolean)
    .join("; ");
}

function sendConfirmationEmail_(payload) {
  var email = payload.email;
  if (!email) return "skipped: no email";
  return sendMailTo_(email);
}

function sendMailTo_(to) {
  var subject = "You’re registered for People’s Media Camp";
  var body = [
    "Thank you for registering for People’s Media Camp, “Push Back! Push Forward!”",
    "",
    "You’ll be the first to know when we release the schedule lineup. In the meantime, feel free to email camp@peoplesmediarecord.com if you have any questions. We can’t wait to see you on October 3rd and 4th!",
    "",
    "In community,",
    "People’s Media Record",
  ].join("\n");

  var message = {
    to: to,
    subject: subject,
    body: body,
    name: FROM_NAME,
    replyTo: REPLY_TO,
  };
  if (STAFF_BCC) {
    message.bcc = STAFF_BCC;
  }

  try {
    MailApp.sendEmail(message);
    return "sent";
  } catch (mailErr) {
    var gmailOptions = {
      name: FROM_NAME,
      replyTo: REPLY_TO,
    };
    if (STAFF_BCC) {
      gmailOptions.bcc = STAFF_BCC;
    }
    GmailApp.sendEmail(to, subject, body, gmailOptions);
    return "sent";
  }
}

function ensureEmailTrigger_() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "processPendingEmails") return;
  }
  ScriptApp.newTrigger("processPendingEmails")
    .timeBased()
    .everyMinutes(1)
    .create();
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
