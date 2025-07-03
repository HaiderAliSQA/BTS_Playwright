# Persistent Browser & Login Session Guide

## Urdu Instructions

### 1. Login Session Create Karein
```sh
npx ts-node scripts/persistent-context.ts
```
- Browser open hoga, login karein.
- Browser band na karein, tab open rahega.
- Session `auth/session-data` me save ho jayega.

### 2. Test Run Karein Usi Browser Me
```sh
npx ts-node scripts/run-test-in-existing.ts
```
- Har dafa naya tab open hoga, login session re-use hoga.
- Apna test code `run-test-in-existing.ts` me likhein.

---

## English Instructions

### 1. Create Login Session
```sh
npx ts-node scripts/persistent-context.ts
```
- Browser will open, log in manually.
- Do not close the browser, keep the tab open.
- Session will be saved in `auth/session-data`.

### 2. Run Tests in Same Browser
```sh
npx ts-node scripts/run-test-in-existing.ts
```
- Each time, a new tab will open in the same browser, using the saved login session.
- Write your test code inside `run-test-in-existing.ts`.

---

## Notes
- Browser and login tab will remain open as long as you don't close them manually.
- You can keep the browser open for 18 hours or more.
- You can run as many test scripts as you want; each will open a new tab in the same logged-in browser.
- For custom test actions, edit the code inside `run-test-in-existing.ts`. 