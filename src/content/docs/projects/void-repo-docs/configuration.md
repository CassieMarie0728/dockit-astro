---
title: "Web and Android configuration"
sidebar:
  order: 6
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Server and client

The Express entry point fixes the server port at **3000**. Development uses `npm run dev`; the build bundles the server into `dist/server.cjs` and builds the Vite frontend. `npm start` runs that bundled server. A `PORT` variable is not read by the inspected entry point.

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Gemini provider key |
| `MISTRAL_API_KEY` | Mistral provider key |
| `GROQ_API_KEY` | Groq provider key |
| `OPENROUTER_API_KEY` | OpenRouter provider key |
| `GITHUB_TOKEN` | Optional token for GitHub requests |
| `APP_URL` | Hosted app URL; also added to allowed origins |
| `VITE_API_BASE_URL` | Frontend API override documented by `.env.example` |

Copy the example values into your own local configuration and replace placeholders. Browser-visible Vite settings must not contain provider secrets.

## CORS and native packaging

The server allowlist includes `http://localhost`, `https://localhost`, `capacitor://localhost`, and `APP_URL` when present. Allowed origins receive CORS headers. OPTIONS requests return 204. A cross-origin frontend can therefore fail in a browser even when the backend responds directly; check the exact origin.

The repository includes Capacitor Android scripts. Its Gradle commands call a PowerShell wrapper, so Linux builds need that toolchain reviewed as well as Android SDK/Java setup. `android:apk` targets a debug APK; release APK/AAB commands are distinct. This documentation pass did not build an Android artifact.

## Useful failure distinctions

| Symptom | Source-backed check |
| --- | --- |
| Missing provider key | Select a configured provider or supply its key |
| Standard repository document rejected | Verify the GitHub URL is present and parses |
| Manual app document rejected | Supply the required app name |
| Draft disappears on another browser | Draft persistence is localStorage, not cross-device sync |
| Backend reachable but browser request fails | Compare frontend Origin with the server allowlist |


## Source snapshot

- [.env.example](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/.env.example)
- [server.ts](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/server.ts)
- [package.json](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/package.json)
