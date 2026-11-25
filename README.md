# boxd for Raycast

Manage [boxd](https://boxd.sh) cloud machines from Raycast. Browse computers across regions, see status at a glance, and open or copy machine URLs without switching apps.

Built with [@boxd-sh/sdk](https://docs.boxd.sh/reference/typescript-sdk) — no local `boxd` CLI required for the extension itself.

## Commands

| Command           | Description                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **List Machines** | Searchable list of your machines (all regions). Status tags, region label, open in browser, copy URL or name, refresh. |

## Requirements

- [Raycast](https://raycast.com) on macOS or Windows
- A boxd API key (`bxd_…`)

## Install & run

```bash
git clone https://github.com/Nabhag8848/boxd-ext.git
cd boxd-ext
npm install
npm run dev
```

Raycast loads the extension in development mode. Import this folder as an extension in Raycast if you are not using `ray develop`.

### API key

1. Raycast → **Settings** → **Extensions** → **boxd** → **API Key**
2. Create a key:

```bash
boxd auth keys create raycast
```

Or create one in the [boxd console](https://boxd.sh).

## Preferences

| Name    | Type     | Required | Description                                         |
| ------- | -------- | -------- | --------------------------------------------------- |
| API Key | password | yes      | `bxd_…` from `boxd auth keys create` or the console |

## Project layout

| Path                     | Role                       |
| ------------------------ | -------------------------- |
| `src/list-machines.tsx`  | List Machines command      |
| `src/lib/boxd-client.ts` | SDK wrapper (machines API) |
| `package.json`           | Raycast manifest           |

## Development

```bash
npm run lint
npm run fix-lint   # auto-fix formatting
npm run build      # production bundle
```

Optional: copy `.env.example` to `.env` and set `BOXD_API_KEY` for local scripts outside Raycast (`.env` is gitignored).

## Publish to the Raycast Store

```bash
npm run publish
```

See [Raycast publishing](https://developers.raycast.com/basics/publish-an-extension).

## License

MIT — see `package.json`.

## Links

- [boxd](https://boxd.sh)
- [Raycast extension docs](https://developers.raycast.com)
- [boxd TypeScript SDK](https://docs.boxd.sh/reference/typescript-sdk)
