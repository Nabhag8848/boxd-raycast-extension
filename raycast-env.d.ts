/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - Your boxd API key. */
  "apiKey": string,
  /** API Base URL - The base URL for the boxd API. */
  "apiBaseUrl": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `list-machines` command */
  export type ListMachines = ExtensionPreferences & {}
  /** Preferences accessible in the `create-machine` command */
  export type CreateMachine = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `list-machines` command */
  export type ListMachines = {}
  /** Arguments passed to the `create-machine` command */
  export type CreateMachine = {}
}

