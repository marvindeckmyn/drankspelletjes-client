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
      {short: 'dk', long: 'Dansk'},
      {short: 'sv', long: 'Svenska'},
      {short: 'pl', long: 'Polski'},
      {short: 'cs', long: 'Čeština'},
      {short: 'sk', long: 'Slovenčina'},
      {short: 'sl', long: 'Slovenščina'},
      {short: 'et', long: 'Eesti keel'},
      {short: 'fi', long: 'Suomen kieli'},
      {short: 'id', long: 'Bahasa Indonesia'},
      {short: 'hu', long: 'Magyar nyelv'},
      {short: 'lv', long: 'Latviešu valoda'},
      {short: 'lt', long: 'Lietuvių kalba'},
      {short: 'ro', long: 'Limba română'},
      {short: 'ru', long: 'Русский язык'},
      {short: 'el', long: 'ελληνικά'},
      {short: 'bg', long: 'български'},
      {short: 'ja', long: '日本語'},
      {short: 'zh', long: '汉语/漢語'},
    ]);
  }
}

export default new GlobalStore();
