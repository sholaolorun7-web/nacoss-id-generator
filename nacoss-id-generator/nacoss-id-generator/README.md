# Web-Based NACOSS Student Identity Card Generator

A responsive, browser-based frontend prototype for student identity card registration, application review, approval, QR-reference generation and card printing. It is designed for a polytechnic or university mini-project demonstration.

> **Important:** This is not an official NACOSS service and is not production-secure. It uses browser `localStorage`, client-side demo authentication and a local verification dataset. Do not use it to store real sensitive student or medical information.

## Objectives

- Digitise the student ID application process for demonstration.
- Allow students to submit and track applications.
- Give a demo administrator tools to review, approve and reject applications.
- Generate a horizontal student ID card for approved records.
- Demonstrate QR-based record lookup within the same browser dataset.

## Features

- Responsive landing page, registration, tracking, admin login, dashboard, ID card and verification pages.
- Required-field and email validation; image type and 1.5 MB size checks; photograph preview.
- Unique application IDs and duplicate matriculation-number prevention.
- Pending, Approved and Rejected statuses with optional rejection feedback.
- Dashboard statistics, search, status/level filters, details modal, approve/reject/delete actions.
- Optional sample/demo records.
- QR code generation using QRCode.js (CDN loaded); print / Save as PDF with print-only CSS.
- Persistent application records using `localStorage`.

## Technology stack

HTML5, CSS3, vanilla JavaScript, browser localStorage, and QRCode.js (loaded from cdnjs when online).

## Folder structure

```text
nacoss-id-generator/
├── index.html
├── register.html
├── track.html
├── admin-login.html
├── admin-dashboard.html
├── id-card.html
├── verify.html
├── README.md
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── responsive.css
    │   └── print.css
    ├── js/
    │   ├── app.js
    │   ├── registration.js
    │   ├── tracking.js
    │   ├── admin.js
    │   ├── id-card.js
    │   └── verification.js
    └── images/
        ├── logo-placeholder.svg
        └── default-avatar.svg
```

## Setup

1. Extract `nacoss-id-generator.zip`.
2. Open the `nacoss-id-generator` folder.
3. Open `index.html` in a modern browser, or deploy the folder to a static host such as Netlify or GitHub Pages.
4. An internet connection is needed to load QRCode.js from its CDN. Other pages and core workflows work locally; if the library is unavailable, the card displays the application reference as a fallback instead of a QR image.

No build process, package manager, server, PHP, database or Node.js is required.

## Demo administrator credentials

- Username: `admin`
- Password: `NACOSS2026!`

These credentials are intentionally visible in `assets/js/admin.js`. The login uses browser session storage and is only a demonstration gate. Anyone inspecting the source can discover the credentials; it is not authentication suitable for a real deployment.

## Demonstration guide

### Register a student

1. Select **Register for ID Card** on the home page.
2. Complete all required fields and upload an image no larger than 1.5 MB.
3. Submit. The application receives a unique ID and Pending status.
4. Keep the displayed application ID for tracking.

### Review and approve

1. Open **Admin login** and use the demo credentials above.
2. On the dashboard, select **Load demo data** to add three sample records (only once), or use a student application you registered.
3. Search/filter records or open **View** to inspect details.
4. Select **Approve** to issue a card number, or **Reject** and optionally enter a reason.
5. Delete removes the selected record from this browser after confirmation.

### Track an application

Open **Track application**, enter the application ID or matriculation number, and select **Check status**. Approved records show a card link; pending and rejected records do not.

### Generate and print an ID card

Open the approved record from tracking. The horizontal card includes student details, card number, issue date and QR code. Select **Print / Save as PDF** and choose a printer or “Save as PDF” in the browser print dialog. Print CSS hides the surrounding interface.

### QR verification

The QR code contains a URL to `verify.html` with the application ID. The verification page looks up that ID in the current browser's localStorage. To verify successfully, open the QR link in the same browser profile and origin where the application was saved. If the URL is opened on another device, browser, or cleared dataset, the record will not be available.

## Data storage and limitations

- Applications are stored in the browser's `localStorage` under `nacossApplications`; the demo login session uses `sessionStorage`.
- Data persists across refreshes in the same browser profile, but it is not a shared database and is not synchronized between users or devices.
- Clearing site/browser data can permanently remove saved applications.
- Photos are stored as base64 data URLs. Large photos can exhaust browser storage; the upload limit is 1.5 MB.
- Client-side validation can be bypassed. There is no server-side validation, access control, encryption, audit trail, cloud backup or secure identity verification.
- QR verification is local and demonstrative, not universal, secure, government-level or institution-authoritative verification.
- Placeholder NACOSS branding is included. Obtain approval and use official branding before any real institutional deployment.
- Blood group is optional in the prototype. Avoid entering real medical or emergency details into a public demonstration.

## Future improvements

- Backend API and PHP/MySQL or another managed database.
- Secure authentication, role-based authorization and password hashing.
- Server-side input validation, image storage and file scanning.
- Hosted verification endpoint with signed, revocable verification tokens.
- Audit logs, backups, admin account management and privacy controls.
- Institution-approved branding, card templates, expiry policies and bulk export.
