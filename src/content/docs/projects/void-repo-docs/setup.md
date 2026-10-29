---
title: "VOID Repo Docs: Setup and commands"
description: "VOID Repo Docs documentation \u2014 Setup and commands."
sidebar:
  label: "Setup and commands"
  order: 2
---

## Commands declared in the repository

These commands were inspected, not executed as part of this documentation pass. Complete environment configuration before starting services.

| Script | Actual command |
| --- | --- |
| `dev` | `tsx server.ts` |
| `build` | `vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs` |
| `start` | `node dist/server.cjs` |
| `clean` | `rm -rf dist` |
| `lint` | `tsc --noEmit` |
| `cap:sync` | `npx cap sync android` |
| `cap:copy` | `npx cap copy android` |
| `android:gradle` | `powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/android-gradle.ps1` |
| `android:build` | `npm run build && npx cap sync android && npm run android:gradle -- build` |
| `android:apk` | `npm run build && npx cap sync android && npm run android:gradle -- assembleDebug` |
| `android:apk:release` | `npm run build && npx cap sync android && npm run android:gradle -- assembleRelease` |
| `android:aab` | `npm run build && npx cap sync android && npm run android:gradle -- bundleRelease` |
| `android:clean` | `npm run android:gradle -- clean` |
| `android:open` | `npx cap open android` |

## Package manager

`Not declared in package.json`

Clone the repository, inspect its lockfile and environment examples, then install with its declared package manager. Do not invent environment values from another project’s guide.

## Android builds

Android scripts call a PowerShell Gradle wrapper. Confirm PowerShell, Android SDK and Java requirements before using them on Linux. The web server development command is `npm run dev`; the production command is `npm start` after building.

