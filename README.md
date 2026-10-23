# EasyBill — Android build and monetization preparation

EasyBill is an offline-first GST invoice helper wrapped with Capacitor. Invoice records remain in local browser storage on the device. Export backups regularly.

## What's prepared

- Capacitor AdMob plugin dependency and Android test app/ad IDs for development.
- A non-deceptive Premium information panel. **Premium checkout is not enabled**; this build does not take payments or unlock paid features.
- GitHub Actions workflow that creates a debug APK and attempts a release Android App Bundle (AAB) artifact.

## Build a test APK in GitHub (no Android Studio required)

1. Create a GitHub repository and upload the contents of this folder, including `.github` and `www`.
2. Open **Actions → Build EasyBill Android → Run workflow**.
3. Open the completed run and download `EasyBill-debug-APK`.
4. Extract `app-debug.apk` and install it on a test Android device. Allow installation from that source if Android asks.

The first build generates the `android/` project from Capacitor. This repository intentionally does not contain generated Gradle files.

## Before real ads can earn money

1. Create and verify an AdMob account; complete payments/tax details.
2. Register the actual Android app in AdMob using application ID `com.easybill.app`.
3. Replace the **test-only** AdMob app ID in `capacitor.config.json` (`ca-app-pub-3940256099942544~3347511713`) with your own app ID.
4. Replace the test banner unit ID in `www/index.html` (`ca-app-pub-3940256099942544/6300978111`) with your own banner ad unit ID.
5. Review Google's consent/privacy requirements for the countries you serve, add a privacy policy, and test with test ads. Never click your own live ads. Do not publish with test IDs or claim monetization is live.

Official setup: https://support.google.com/admob/answer/15948559

## Before Premium purchases can be sold

Premium checkout is deliberately **not implemented yet**. To charge users, configure Play Console products and integrate Google Play Billing (including purchase verification, acknowledgement, entitlement persistence, and restore purchases). Never unlock premium based only on a client-side flag. Decide the exact premium features and price, then implement and test purchases using Play's license testers before launch.

Official guide: https://developer.android.com/google/play/billing/integrate

## Google Play release requirements

- New apps and updates submitted from 31 August 2026 must target Android 16 / API 36 or higher. Confirm Capacitor/Gradle SDK versions and the generated Android project's target SDK before submission: https://support.google.com/googleplay/android-developer/answer/11926878
- Google Play generally requires an Android App Bundle (`.aab`) for new apps. The workflow's AAB is **unsigned** unless release signing is configured; it is not ready to upload as-is.
- Create a signed release with a private upload keystore. Keep the keystore and passwords out of Git; store them as protected GitHub Actions secrets and add a signing step before distribution.
- Complete Play Console app content, data safety, ads declaration, privacy policy, testing, and store listing. Do not claim that invoice data leaves the device unless you later add a backend/analytics that does so.

## Notes

- `npm install && npx cap add android && npx cap sync android` prepares the native project.
- Local build: install Node.js, JDK 17, and Android Studio/SDK, then run the commands above and `cd android && ./gradlew assembleDebug`.
- The APK is for testing; do not distribute a debug APK as the production Play Store release.
