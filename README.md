# RARE

RARE is a protected, self-building personal AI core with a connected Flutter interface. The current release is **RARE 045**.

## What is included

The core provides persistent conversations, memory, documents, research, model-provider routing, development/self-building, repair and rollback, permissions, device tools, voice services, assistant orchestration, specialist agents, event/observability services and a local JSON HTTP API.

The Flutter client provides connected workspaces for Command Center, Chat / Ask, Projects / Build, Documents, Research, Live Conversation, Memory, Tools / Device Control and Settings. The same core is used by the different entry points so a request made in Chat can invoke the build system, while the Build workspace exposes richer engineering controls and live agent/process visibility.

RARE has a separate assistant layer. The default assistant name is **RARE**; a user may explicitly choose another name. The assistant can handle conversational requests, invoke RARE capabilities, and route explicit requests to a paired laptop or phone during development/testing. Login/account identity is deliberately deferred until the system is validated without it.

## Free local model setup

The default testing provider is local Ollama. The release configuration pins `qwen2.5-coder:7b` and allows fallback to any compatible model actually installed in Ollama. RARE does **not** automatically download a model and basic local operation does not require a paid API key.

Ollama is not required on an Android phone for the phone client to exist. In a connected deployment, heavier model work can be handled by the laptop/core or another RARE compute node.

## Windows core run

Preferred first run: open the folder in VS Code and use the automatic `RARE: Start` workspace task, or double-click `START_RARE.cmd`. It creates `.venv` and installs required packages when needed. The manual Python commands below are for development/testing after the environment exists.

```powershell
cd <extracted-release-folder>
.\.venv\Scripts\python.exe -m rare_core selftest
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m rare_core providers
.\.venv\Scripts\python.exe -m rare_core serve
```

The local API defaults to `127.0.0.1:8765`.

For development-time phone↔laptop communication over a private LAN:

```powershell
py -3.13 -m rare_core serve --host 0.0.0.0
```

Remote clients must use the generated bearer token stored in `.rare/api_token`. Do not expose the API to an untrusted network.

## Flutter app

Before the first Flutter build, prepare the optional local neural voice assets:

```powershell
.\scripts\prepare_voice_model.ps1
```

The script is safe to rerun: existing files are reused, and the model is SHA-256 verified. The source archive does not contain the roughly 63 MB model binary.


Open `rare_app` with a Flutter-capable IDE and run the app against the local RARE core. On the laptop the default core URL is `http://127.0.0.1:8765`. On a phone, use the laptop's private LAN IP and the API token when the two devices are paired.

The source tree contains the Flutter client code but this release does not claim an APK or Windows native binary unless the corresponding Flutter/Dart/native toolchains actually build and verify them.

## Verification principle

Passing tests is not treated as proof that the product is complete. Release checks cover syntax, imports, configuration, runtime services, model selection, persistence, API behavior, permissions, agent orchestration, repair/rollback paths, UI-source consistency and archive hygiene. Platform-specific builds remain platform tests.

### Windows first-run
Double-click `START_RARE.cmd`. It creates `.venv` and installs the required packages only when needed, then starts RARE.


## One-step VS Code startup

Open this folder in VS Code. The workspace automatically runs `START_RARE.cmd` on folder open; it creates the local Python environment and starts RARE.
