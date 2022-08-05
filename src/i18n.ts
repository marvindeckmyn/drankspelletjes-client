import locales from './assets/locales/locales.json'

export const translate = (id: string, lang: string, replacements: {[key: string]: string} = {}) => {
  let result = '';

  const keys = Object.keys(locales);
  const values = Object.values(locales);

  const messagesFromLang = keys.reduce((obj, key, index) => {
    obj[key] = values[index][lang?.toLowerCase()];
    return obj;
  }, {});

  if (messagesFromLang[id?.toLowerCase()] !== undefined) {
    const keys = Object.keys(replacements);
    const values = Object.values(replacements);

    result = keys.reduce((translation, key, index) => {
      const regex = new RegExp(`{${key}}`, 'g');
      translation = translation.replace(regex, values[index]);
      return translation;
    }, messagesFromLang[id?.toLowerCase()]);
  }

  if (result === '') {
    return id
  }

  return result
}


