/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - boxd API key (bxd_…). Create with `boxd auth keys create NAME` or in the boxd console. */
  "apiKey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `list-machines` command */
  export type ListMachines = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `list-machines` command */
  export type ListMachines = {}
}

