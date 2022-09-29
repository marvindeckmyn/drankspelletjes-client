import { writable, Writable } from "svelte/store";

class GlobalStore {
  lang: Writable<string>;
  supportedLanguages: Writable<Array<{short: string, long: string}>>
  currentPath: Writable<string>;

  constructor() {
    this.lang = writable(undefined);
    this.currentPath = writable(window.location.pathname)
    this.supportedLanguages = writable([
      {short: 'en', long: 'English'},
      {short: 'nl', long: 'Nederlands'},
      {short: 'fr', long: 'Français'},
      {short: 'de', long: 'Deutsch'},
      {short: 'es', long: 'Español'},
      {short: 'it', long: 'Italiano'},
      {short: 'pt', long: 'Português'},
      {short: 'tr', long: 'Türkçe'},
      {short: 'hr', long: 'Hrvatski'},
      {short: 'ceb', long: 'Cebuano'},
    ]);
  }
}

export default new GlobalStore();
