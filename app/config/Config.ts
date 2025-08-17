import * as Localization from 'expo-localization';

function getLocaleLanguageCode() {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    return locales[0].languageTag.split('-')[0];
  }
  return null;
}


function getCountryCode() {
  const locales = Localization.getLocales();

  if (locales && locales.length > 0) {
    return locales[0].regionCode;
  }

  return null;
}


export const Config = {
  AppName: '',
  supportEmail: '',
  API: 'https://holy.qstudio.org/api/v1/',
  EventsURL: '',
  enableMock: false,
  serverRetryDelay: 750,
  region: getCountryCode(),
  language: getLocaleLanguageCode(),
  defaultLanguage: 'en',
  usernameMinLength: 2,
  version: '1.0.1',
  productIDs: [''],
  subscriptionsIDs: [''],
};