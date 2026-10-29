---
title: "Grief Ops Suite: Setup and commands"
description: "Grief Ops Suite documentation \u2014 Setup and commands."
sidebar:
  label: "Setup and commands"
  order: 2
---

## Commands declared in the repository

These commands were inspected, not executed as part of this documentation pass. Complete environment configuration before starting services.

| Script | Actual command |
| --- | --- |
| `start` | `expo start` |
| `android` | `expo start --android` |
| `ios` | `expo start --ios` |
| `web` | `expo start --web` |
| `lint` | `echo "(placeholder) add eslint"` |
| `test` | `echo "(placeholder) add tests"` |

## Package manager

`Not declared in package.json`

Clone the repository, inspect its lockfile and environment examples, then install with its declared package manager. Do not invent environment values from another project’s guide.

## Placeholder checks

`lint` and `test` only print placeholder messages. A zero exit code from those scripts is not evidence of linting or tests passing.


## Resolve startup wiring first

The source walkthrough identified a missing root app entry and undeclared navigation dependencies. These scripts describe intended launch commands, not a validated clean install. [Read the startup gaps](/projects/grief-ops-suite/architecture/) before running them.
