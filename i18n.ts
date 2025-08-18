import { I18n } from 'i18n-js';

import en from './translations/en.json';
import ru from './translations/ru.json';

const i18n = new I18n({
  en,
  ru,
});


// i18n.locale = getLocales()[0].languageCode ?? 'en';

i18n.locale = 'en';

i18n.enableFallback = true;

export default i18n;