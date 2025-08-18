import { I18n } from 'i18n-js';

// Импортируем файлы с переводами
import { getLocales } from 'expo-localization';
import en from './translations/en.json';
import ru from './translations/ru.json';

const i18n = new I18n({
  en,
  ru,
});


i18n.locale = getLocales()[0].languageCode ?? 'en';

// i18n.locale = 'ru';

i18n.enableFallback = true;

export default i18n;