---
title: "Library, backup and floating bubble"
sidebar:
  order: 5
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Local library

The snippet context loads and saves snippets and settings with AsyncStorage. The app has Library, Favorites, AI and Settings tabs plus snippet detail/edit routes. Local storage and optional account sync are separate concerns; saving locally is not proof of a remote backup.

## Export before importing

Settings builds a JSON export containing the snippets. Web export includes a clipboard fallback; native export writes a JSON file and invokes the sharing API when available. Save an export before trying a large import or conflict-resolution operation.

The import parser accepts a JSON array or an object with a `snippets` array. It processes up to 5,000 entries, validates required titles, normalizes tags and rejects invalid entries. The import planner supports `skip`, `replace` and `copy` duplicate strategies. Check the result counts rather than assuming every item was accepted.

## Enable the Android overlay

1. Install an Android build containing the local floating-bubble module. Expo Go and web do not provide it.
2. Open Settings and enable the floating bubble.
3. If prompted, enable **Display over other apps** in Android settings.
4. Return to the app and enable the bubble again; the permission-request branch exits before enabling it.
5. Drag the bubble; tap it to expand the snippet panel. Disable it in Settings to stop the overlay.

The native manifest declares `SYSTEM_ALERT_WINDOW`, foreground service permissions and a special-use service. The JavaScript wrapper only loads the module on Android and returns unsupported/false results otherwise. Missing native-module support is not fixed by granting a browser permission.

## Sync and conflicts

Settings exposes sign-in, “Sync This Device,” last-sync information and unresolved conflicts. It disables sync when unavailable or already syncing. The conflict button opens `/sync-conflicts`. Export the local library before resolving conflicts; this pass has not verified recovery behavior across two devices.


## Source snapshot

- [lib/snippet-context.tsx](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/lib/snippet-context.tsx)
- [lib/snippet-import.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/lib/snippet-import.ts)
- [app/(tabs)/settings.tsx](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/app/(tabs)/settings.tsx)
- [modules/floating-bubble/src/FloatingBubble.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/modules/floating-bubble/src/FloatingBubble.ts)
- [modules/floating-bubble/android/src/main/AndroidManifest.xml](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/modules/floating-bubble/android/src/main/AndroidManifest.xml)

## Import limitation

Mixed new-and-duplicate imports using Replace Matches have a reproduced index defect. [Read the known issue](/projects/snippet-bubble-manager-v2/known-import-issue/) before importing. The Settings JSON export is content-only; see [export contents](/projects/snippet-bubble-manager-v2/backup-restore/).
