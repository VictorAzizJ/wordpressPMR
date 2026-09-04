/**
 * People’s Media Camp — Google Apps Script webhook
 *
 * Paste this into a script bound to your camp registrations Google Sheet
 * (Extensions → Apps Script), then deploy as a Web app:
 *
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * After every script edit, create a New deployment so the live URL updates.
 * Paste the web app URL into GOOGLE_SHEETS_WEBHOOK_URL (server-only env).
 *
 * Optional: set STAFF_BCC to a PMR inbox so staff see each signup.
 */
var STAFF_BCC = ""; // e.g. "lila@peoplesmediarecord.com"

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    appendRegistrationRow_(payload);
    sendConfirmationEmail_(payload);
    return jsonResponse_({ ok: true });
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

function appendRegistrationRow_(payload) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  ensureHeaderRow_(sheet);

  var children = formatChildren_(payload.children);
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.name || "",
    payload.email || "",
    payload.phone || "",
    payload.ageRange || "",
    payload.neighborhood || "",
    payload.city || "",
    payload.organization || "",
    payload.accessibilityNeeds || "",
    payload.dietaryNeeds || "",
    children,
    payload.childAllergies || "",
    payload.emergencyContactPhone || "",
    payload.hearAbout || "",
    payload.notes || "",
    payload.source || "pmr-camp-register",
  ]);
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Submitted At",
    "Name",
    "Email",
    "Phone",
    "Age Range",
    "Neighborhood",
    "City",
    "Organization",
    "Accessibility Needs",
    "Dietary Needs",
    "Children",
    "Child Allergies",
    "Emergency Contact Phone",
    "How Did You Hear",
    "Notes",
    "Source",
  ]);
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
  if (!email) return;

  var firstName = firstNameFrom_(payload.name);
  var greeting = firstName ? "Hi " + firstName + "," : "Hi,";

  var subject = "You’re registered for People’s Media Camp";
  var body = [
    greeting,
    "",
    "Thanks for registering for People’s Media Camp!",
    "",
    "Dates:",
    "• Saturday, October 3 — 9 am to 7 pm",
    "• Sunday, October 4 — 9 am to 6 pm",
    "",
    "Location:",
    "Camp will mostly take place at the Folk Arts Cultural Treasures Charter School (FACTS) at 1023 Callowhill Street, Philadelphia — an ADA accessible facility. Sunday’s program will also take place at a very special outdoor location, to be announced shortly.",
    "",
    "Camp is free. Meals, refreshments, and materials are provided both days.",
    "",
    "We’ll include you in all communications announcing session times and the schedule line-up (coming mid-September).",
    "",
    "Reply to this email if you have questions.",
    "",
    "— People’s Media Record",
  ].join("\n");

  var options = { name: "People’s Media Record" };
  if (STAFF_BCC) {
    options.bcc = STAFF_BCC;
  }

  MailApp.sendEmail(email, subject, body, options);
}

function firstNameFrom_(name) {
  if (!name || typeof name !== "string") return "";
  var trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0];
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
