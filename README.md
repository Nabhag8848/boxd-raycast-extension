# boxd for Raycast

Manage boxd machines from Raycast. Browse machines by region, create a machine, control its lifecycle, open its desktop or console, and connect from your local terminal.

Machine management uses the [boxd TypeScript SDK](https://docs.boxd.sh/reference/typescript-sdk). **Open in Terminal** uses your local `boxd` CLI.

## What you can do

### Raycast commands

Search for either command in Raycast to begin.

| Command            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| **List Machines**  | Browse, access, and manage the machines you can access. |
| **Create Machine** | Open the form to create a new boxd machine.             |

### Browse machines

Use **List Machines** to search the machines you can access. Each result shows its status and region. Select a region from the search-bar dropdown to narrow the list, or select all regions.

The action panel has three sections.

#### Access actions

| Action           | Availability                               | macOS shortcut | Windows shortcut |
| ---------------- | ------------------------------------------ | -------------- | ---------------- |
| Open Desktop     | When boxd provides a desktop URL           | `⌘D`           | `Ctrl+D`         |
| Open in Console  | Always                                     | `⌘C`           | `Ctrl+C`         |
| Open in Terminal | Running, suspended, or hibernated machines | `⌘T`           | `Ctrl+T`         |
| Copy URL         | When the machine has a public URL          | `⌘U`           | `Ctrl+U`         |
| Copy Name        | Always                                     | `⌘N`           | `Ctrl+N`         |

**Open Desktop** opens the machine desktop in your browser. **Open in Console** opens the machine page in the boxd console. **Copy URL** copies the machine's public HTTPS URL.

#### Commands

| Command        | What it does                     | macOS shortcut | Windows shortcut |
| -------------- | -------------------------------- | -------------- | ---------------- |
| Create Machine | Opens the machine creation form  | `⌘⇧N`          | `Ctrl+Shift+N`   |
| Refresh        | Reloads the current machine list | `⌘R`           | `Ctrl+R`         |

### Connect from your terminal

**Open in Terminal** is available for running, suspended, and hibernated machines. It starts a native terminal and runs the boxd CLI command for the selected machine. The action passes the machine ID and, when available, its region:

```sh
boxd machine connect --region <region> <machine-id>
```

A suspended or hibernated machine resumes or wakes when the connection opens. Start a stopped machine before you connect.

Install the [boxd CLI](https://boxd.sh) and authenticate it before using the action:

```sh
boxd auth login
```

The CLI must be available as `boxd` on your system `PATH`. If it is not installed or you are not authenticated, the terminal displays the CLI error and stays open.

#### macOS

Press `⌘T` on a machine, or select **Open in Terminal** from its action panel. Raycast opens the macOS **Terminal** app and starts the connection there.

To connect manually, open Terminal and run:

```sh
boxd machine connect --region <region> <machine-id>
```

#### Windows

Press `Ctrl+T` on a machine, or select **Open in Terminal** from its action panel. Raycast opens a new **Windows Terminal** tab when Windows Terminal is installed. Otherwise, it opens **Windows PowerShell**.

To connect manually, open Windows Terminal or PowerShell and run:

```powershell
boxd machine connect --region <region> <machine-id>
```

### Control a machine

**List Machines** exposes lifecycle actions that match the current machine status.

| Status                          | Available actions              |
| ------------------------------- | ------------------------------ |
| Running                         | Pause, Hibernate, Stop, Reboot |
| Suspended                       | Resume, Stop                   |
| Hibernated                      | Wake                           |
| Stopped or failed               | Start                          |
| Pending, starting, or migrating | Stop                           |

| Action    | Availability                                        | macOS shortcut | Windows shortcut |
| --------- | --------------------------------------------------- | -------------- | ---------------- |
| Pause     | Running                                             | `⌘⇧P`          | `Ctrl+Shift+P`   |
| Resume    | Suspended                                           | `⌘⇧R`          | `Ctrl+Shift+R`   |
| Hibernate | Running                                             | `⌘⇧H`          | `Ctrl+Shift+H`   |
| Wake      | Hibernated                                          | `⌘⇧W`          | `Ctrl+Shift+W`   |
| Stop      | Running, suspended, pending, starting, or migrating | `⌘⇧X`          | `Ctrl+Shift+X`   |
| Start     | Stopped or failed                                   | `⌘⇧S`          | `Ctrl+Shift+S`   |
| Reboot    | Running                                             | `⌘⇧R`          | `Ctrl+Shift+R`   |
| Delete    | Any machine except a destroyed machine              | `⌘⇧D`          | `Ctrl+Shift+D`   |

Resume and Reboot share a shortcut because they are never available for the same machine status.

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
