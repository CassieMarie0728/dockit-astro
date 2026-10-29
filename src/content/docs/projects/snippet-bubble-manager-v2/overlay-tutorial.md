---
title: "Snippet Bubble Manager v2: Tutorial: enable the Android bubble"
description: "Snippet Bubble Manager v2 documentation \u2014 Tutorial: enable the Android bubble."
sidebar:
  label: "Tutorial: enable the Android bubble"
  order: 11
---

**Source-guided tutorial. Android device behavior has not been exercised in this pass.**

## Start with the right build

Use an Android preview/release build containing `modules/floating-bubble`. Web, iOS and Expo Go do not supply this Android module. The Settings handler shows **Android overlay required** when support is unavailable.

## Enable permission, then return

1. Open Settings and turn on the floating bubble.
2. If the app requests overlay permission, open Android’s **Display over other apps** settings and allow the app.
3. Return to Snippet Bubbles and turn the bubble on again. The first permission-request branch returns without enabling the setting.
4. Check the enabled notification, drag the bubble, then tap it to expand the panel.
5. Turn it off in Settings and verify the overlay disappears.

The bridge supports size, opacity and snap-to-edge options. Overlay support depends on the packaged native service and permission state, not just the JavaScript setting.

## If nothing appears

Check the platform and build first, then permission state. A supported-looking web preview is not an Android overlay test. Record the Android version, app build, permission state and the exact step that failed.

The service declares foreground-service permissions and `foregroundServiceType="specialUse"`. This source declaration does not verify behavior on every Android release or manufacturer’s background-process settings.


## Source snapshot

- [app/(tabs)/settings.tsx](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/app/(tabs)/settings.tsx)
- [modules/floating-bubble/src/FloatingBubble.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/modules/floating-bubble/src/FloatingBubble.ts)
- [modules/floating-bubble/android/src/main/AndroidManifest.xml](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/modules/floating-bubble/android/src/main/AndroidManifest.xml)
