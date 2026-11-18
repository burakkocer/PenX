/**
 * English message catalog — the canonical key set.
 *
 * `MessageKey` (in `lib/i18n/index.ts`) is derived from this file's keys, so
 * every other catalog (currently just `tr.ts`) is type-checked against it:
 * a missing translation is a compile error, not a runtime surprise.
 *
 * Scope (first localization batch): app chrome, navigation, auth (login /
 * setup), and the language setting itself. Most in-app page content is not
 * covered yet — see README.md for status.
 */
import { en as statusEn } from "./ns/status";
import { en as tasksListEn } from "./ns/tasksList";
import { en as taskDetailEn } from "./ns/taskDetail";
import { en as findingsEn } from "./ns/findings";
import { en as assetsFlowEn } from "./ns/assetsFlow";
import { en as systemAgentsEn } from "./ns/systemAgents";
import { en as systemInterceptEn } from "./ns/systemIntercept";
import { en as systemNotifyEn } from "./ns/systemNotify";
import { en as shellEn } from "./ns/shell";

const en = {
  // Shared generic words — reuse these instead of adding per-page duplicates.
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.create": "Create",
  "common.confirm": "Confirm",
  "common.close": "Close",
  "common.search": "Search",
  "common.loading": "Loading...",
  "common.retry": "Retry",
  "common.refresh": "Refresh",
  "common.back": "Back",
  "common.next": "Next",
  "common.previous": "Previous",
  "common.yes": "Yes",
  "common.no": "No",
  "common.enabled": "Enabled",
  "common.disabled": "Disabled",
  "common.name": "Name",
  "common.description": "Description",
  "common.status": "Status",
  "common.actions": "Actions",
  "common.none": "None",
  "common.all": "All",
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.add": "Add",
  "common.remove": "Remove",
  "common.test": "Test",
  "common.details": "Details",
  "common.unknown": "Unknown",
  "common.empty": "No data",
  "common.saved": "Saved",
  "common.saveFailed": "Save failed",
  "common.deleted": "Deleted",
  "common.loadFailed": "Failed to load",
  "common.operationFailed": "Operation failed",
  "common.export": "Export",
  "common.import": "Import",
  "common.reset": "Reset",
  "common.apply": "Apply",
  "common.submit": "Submit",
  "common.optional": "Optional",
  "common.required": "Required",
  "common.type": "Type",
  "common.time": "Time",
  "common.createdAt": "Created at",
  "common.updatedAt": "Updated at",
  "common.target": "Target",
  "common.severity": "Severity",
  "common.total": "Total",
  "common.page": "Page",
  "common.perPage": "Per page",
  "common.start": "Start",
  "common.stop": "Stop",
  "common.pause": "Pause",
  "common.resume": "Resume",
  // Sidebar navigation — group labels
  "nav.group.functions": "Functions",
  "nav.group.system": "System",

  // Sidebar navigation — items
  "nav.dashboard": "Dashboard",
  "nav.chat": "Chat",
  "nav.tasks": "Tasks",
  "nav.findings": "Findings",
  "nav.traffic": "Traffic",
  "nav.commands": "Tool Runs",
  "nav.llmRecords": "LLM Recordings",
  "nav.assets": "Assets",
  "nav.sync": "Asset Sync",
  "nav.workspace": "Workspace",
  "nav.llm": "LLM",
  "nav.agents": "Agents",
  "nav.mcp": "MCP",
  "nav.skills": "Skills",
  "nav.tools": "Tools",
  "nav.notify": "Notifications",
  "nav.intercept": "Intercept Rules",
  "nav.assetIntercept": "Asset Intercept",
  "nav.approvals": "Approval Log",
  "nav.logs": "Logs",
  "nav.settings": "System Settings",

  // Shared chrome
  "common.version": "Version · {version}",
  "common.language": "Language",

  // Login page
  "auth.login.checking": "Checking sign-in status…",
  "auth.login.title": "Sign in",
  "auth.login.subtitle": "Welcome back — enter your password to continue to ARTEX",
  "auth.login.username": "Username",
  "auth.login.password": "Password",
  "auth.login.passwordPlaceholder": "Enter your password",
  "auth.login.agreePrefix": "I have read and agree to the",
  "auth.login.termsLink": "Terms of Use",
  "auth.login.submit": "Sign in",
  "auth.login.submitting": "Signing in...",
  "auth.login.errorMustAgree": "Please read and agree to the Terms of Use first",
  "auth.login.errorBackend": "Could not connect to the backend service",
  // Thrown by lib/api.ts's central fetch wrapper on any 401 response
  // (session expired or invalid token), not just on the login page.
  "auth.unauthorized": "Unauthorized — please sign in again",
  "auth.login.errorCredentials": "Incorrect username or password",

  // Login page — terms of use dialog
  "auth.terms.title": "ARTEX Terms of Use & Disclaimer",
  "auth.terms.version": "Version v1.0 · Effective 2026-09-18 · Please read all terms below in full before signing in",
  "auth.terms.intro":
    'These Terms of Use & Disclaimer ("these Terms") are an agreement between you and the authors and contributors of the ARTEX project governing your use of this software. Please read carefully and fully understand every clause before use, especially any provision marked in bold or highlighted that concerns disclaimers, limitation of liability, or prohibited conduct.',
  "auth.terms.introAcceptance":
    " By downloading, installing, accessing, or otherwise using this software, you are deemed to have read, understood, and agreed to be bound by these Terms in full.",
  "auth.terms.section1.title": "Article 1 · Definitions & Open-Source License",
  "auth.terms.section1.body":
    "This software (ARTEX) is an open-source program released under the GNU Affero General Public License v3.0 (AGPL-3.0). You may freely use, copy, modify, and distribute this software under that license; however, any derivative work — including an online service provided to third parties over a network — must likewise be released under AGPL-3.0 and the corresponding complete source code made available to its users. The full terms of AGPL-3.0 are governed by the accompanying LICENSE file.",
  "auth.terms.section2.title": "Article 2 · Scope of Authorized Use",
  "auth.terms.section2.body":
    "This software is intended solely for personal learning, code study, discussion of security technical principles, and technical verification within an isolated environment you control. It applies to non-offensive, non-destructive purposes such as study, academic research, and code review. Except as expressly permitted in this Article, you may not use this software for any other purpose.",
  "auth.terms.section3.title": "Article 3 · Prohibited Conduct",
  "auth.terms.section3.item1":
    "Launching scans, probes, exploitation, or attacks against any website, online service, or networked system belonging to another person or third party — whether or not authorization has been obtained and whether or not it is your own asset — is strictly prohibited;",
  "auth.terms.section3.item2":
    "Using this software for any actual penetration test, red/blue team exercise, or production environment is strictly prohibited;",
  "auth.terms.section3.item3":
    "Using this software for unlawful intrusion, data theft, extortion, denial-of-service (DoS/DDoS), or any other destructive or criminal activity is strictly prohibited;",
  "auth.terms.section3.item4":
    "Removing, altering, or circumventing any copyright, license, or security notice contained in this software or its output is strictly prohibited;",
  "auth.terms.section3.item5":
    "Engaging in any activity that violates the laws, regulations, or applicable rules of your country or region is strictly prohibited.",
  "auth.terms.section4.title": "Article 4 · Intellectual Property",
  "auth.terms.section4.body":
    "Copyright and related intellectual property rights in this software belong to the project's authors and contributors, and corresponding rights are granted to you within the scope set out in the AGPL-3.0 license. Except for the rights expressly granted under that license, these Terms grant you no other rights, express or implied.",
  "auth.terms.section5.title": "Article 5 · Data & Privacy",
  "auth.terms.section5.body":
    "This software is a self-hostable, open-source program; its authors do not operate any centralized service and do not collect or upload your usage data. You retain full control over, and sole responsibility for the legality and security of, any data generated, processed, or accessed while using this software; any consequences arising from improper handling of that data are your own responsibility.",
  "auth.terms.section6.title": "Article 6 · Compliance & Legal Liability",
  "auth.terms.section6.body":
    "You are solely responsible for complying with all laws and regulations of your country or region concerning cybersecurity, data security, personal-information protection, computer crime, and related matters.",
  "auth.terms.section6.bodyEmphasis":
    " Any legal liability or consequence arising from your violation of the foregoing laws, regulations, or these Terms is borne solely by you, and is unrelated to this software's authors or contributors.",
  "auth.terms.section7.title": "Article 7 · Disclaimer & Limitation of Liability",
  "auth.terms.section7.body":
    'This software is provided "AS IS" and "AS AVAILABLE," without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. To the maximum extent permitted by applicable law, the authors and contributors of this software shall not be liable for any direct, indirect, incidental, special, or consequential loss arising from the use or inability to use this software — however it was used — including but not limited to loss of data, system damage, business interruption, loss of profit, or legal disputes.',
  "auth.terms.section8.title": "Article 8 · Changes to These Terms & Final Interpretation",
  "auth.terms.section8.body":
    "The authors reserve the right to update these Terms from time to time as required by law, regulation, or the project's development; the updated version takes effect upon publication alongside the project. Continued use of this software after such an update constitutes acceptance of the revised terms. To the extent permitted by law, final interpretation of these Terms rests with the project's authors. Should any clause of these Terms be held invalid, the remaining clauses remain in full effect.",
  "auth.terms.scrolledAll": "You have read all the terms",
  "auth.terms.scrollPrompt": "Please scroll to the end of the terms before confirming",
  "auth.terms.agree": "I have read and agree to all of the above terms",

  // Setup (first-run) page
  "auth.setup.titleUnavailable": "Could not confirm setup status",
  "auth.setup.title": "Set up your password",
  "auth.setup.subtitleUnavailable":
    "The backend or database is temporarily unavailable. To avoid overwriting an existing password on this instance, the setup form has been temporarily disabled — please retry once the service is back.",
  "auth.setup.subtitle": "First time using ARTEX — set a sign-in password for your account (at least 8 characters)",
  "auth.setup.retry": "Retry",
  "auth.setup.newPassword": "New password",
  "auth.setup.newPasswordPlaceholder": "At least 8 characters",
  "auth.setup.confirmPassword": "Confirm password",
  "auth.setup.confirmPasswordPlaceholder": "Re-enter your password",
  "auth.setup.submit": "Set password & sign in",
  "auth.setup.submitting": "Saving...",
  "auth.setup.errorMismatch": "The two passwords do not match",
  "auth.setup.errorTooShort": "Password must be at least 8 characters",
  "auth.setup.errorBackend": "Could not connect to the backend service",
  "auth.setup.errorGeneric": "Setup failed",

  // Settings — language section
  "settings.language.title": "Language",
  "settings.language.description":
    "Choose the display language for the interface. Applies immediately and is remembered on this device.",
  "settings.language.label": "Interface language",
  ...statusEn,
  ...tasksListEn,
  ...taskDetailEn,
  ...findingsEn,
  ...assetsFlowEn,
  ...systemAgentsEn,
  ...systemInterceptEn,
  ...systemNotifyEn,
  ...shellEn,
} satisfies Record<string, string>;

export default en;
