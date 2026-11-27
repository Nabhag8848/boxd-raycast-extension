# boxd for Raycast

Manage boxd machines from Raycast. Browse machines by region, create a machine, control its lifecycle, open its desktop or console, and connect from your local terminal.

Machine management uses the [boxd TypeScript SDK](https://docs.boxd.sh/reference/typescript-sdk). **Open in Terminal** uses your local `boxd` CLI.

## What you can do

### Browse machines

Use **List Machines** to search the machines you can access. Each result shows its status and region. Select a region from the search-bar dropdown to narrow the list, or select all regions.

The action panel has three sections.

| Section  | Action           | Availability                               | Shortcut               |
| -------- | ---------------- | ------------------------------------------ | ---------------------- |
| Access   | Open Desktop     | When boxd provides a desktop URL           | `⌘D` / `Ctrl+D`        |
| Access   | Open in Console  | Always                                     | `⌘C` / `Ctrl+C`        |
| Access   | Open in Terminal | Running, suspended, or hibernated machines | `⌘T` / `Ctrl+T`        |
| Access   | Copy URL         | When the machine has a public URL          | `⌘U` / `Ctrl+U`        |
| Access   | Copy Name        | Always                                     | `⌘N` / `Ctrl+N`        |
| Commands | Create Machine   | Always                                     | `⌘⇧N` / `Ctrl+Shift+N` |
| Commands | Refresh          | Always                                     | `⌘R` / `Ctrl+R`        |

**Open Desktop** opens the machine desktop in your browser. **Open in Console** opens the machine page in the boxd console. **Copy URL** copies the machine's public HTTPS URL.

### Connect from your terminal

**Open in Terminal** starts a native terminal and runs:

```sh
boxd machine connect --region <region> <machine-id>
```

The action passes the region when boxd reports one. A suspended or hibernated machine resumes or wakes when the connection opens. A stopped machine must be started first.

Before you use this action, install the [boxd CLI](https://boxd.sh) and authenticate it:

```sh
boxd auth login
```

On macOS, the action opens Terminal. On Windows, it opens Windows Terminal when available and falls back to PowerShell. The terminal shows any Boxd CLI installation or authentication error.

### Control a machine

**List Machines** exposes lifecycle actions that match the current machine status.

| Status                          | Available actions              |
| ------------------------------- | ------------------------------ |
| Running                         | Pause, Hibernate, Stop, Reboot |
| Suspended                       | Resume, Stop                   |
| Hibernated                      | Wake                           |
| Stopped or failed               | Start                          |
| Pending, starting, or migrating | Stop                           |

You can delete every machine except one that is already destroyed. Delete uses `⌘⇧D` on macOS and `Ctrl+Shift+D` on Windows.

### Create a machine

Use **Create Machine** to choose:

- An optional name. boxd generates one when you leave it blank.
- A region, or the organization default.
- Linux or Windows.
- The organization default size, or a vCPU and memory size.
- Whether the machine is isolated.

## Setup

You need:

- [Raycast](https://raycast.com) on macOS or Windows.
- A boxd API key that starts with `bxd_`.
- The boxd CLI if you want to use **Open in Terminal**.

Set the API key in Raycast:

1. Open **Raycast Settings**.
2. Open **Extensions**, then **boxd**.
3. Set **API Key**.

Create a key from the boxd CLI:

```sh
boxd auth keys create raycast
```

You can also create a key in the [boxd console](https://app.boxd.sh).

## Preferences

| Preference   | Required | Default                | Purpose                                                                                          |
| ------------ | -------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| API Key      | Yes      | —                      | Authenticates SDK requests to boxd.                                                              |
| API Base URL | No       | `https://boxd.sh:9443` | Sets the SDK API endpoint. The console URL derives the `app.` subdomain and omits the gRPC port. |

For the default endpoint, the console action opens URLs in this form:

```text
https://app.boxd.sh/machines?m=<machine-name>&r=<region>
```

## Install for development

```sh
git clone https://github.com/Nabhag8848/boxd-ext.git
cd boxd-ext
npm install
npm run dev
```

Raycast loads the extension in development mode. Run the checks before you publish a change:

```sh
npm run lint
npm run build
```

## Publish to the Raycast Store

```sh
npm run publish
```

See the [Raycast publishing guide](https://developers.raycast.com/basics/publish-an-extension) for submission requirements.

## Project layout

| Path                     | Purpose                                                                          |
| ------------------------ | -------------------------------------------------------------------------------- |
| `src/list-machines.tsx`  | Machine list command                                                             |
| `src/create-machine.tsx` | Machine creation command                                                         |
| `src/lib/boxd/`          | SDK client and API or console URL configuration                                  |
| `src/modules/machine/`   | Machine actions, list UI, creation form, lifecycle logic, and terminal launchers |
| `src/modules/region/`    | Region discovery and list filtering                                              |

## License

MIT. See [package.json](package.json).
