import i18next from 'i18next';
import * as resources from '../../i18n/translations.json';

export const defaultLocale = 'sv-SE';

export const supportedLocales = [
	'sv-SE'
];

i18next.init({
	lng: defaultLocale,
	resources,
	debug: false,
	fallbackNS: 'common',
	interpolation: {
		escapeValue: false
	}
});

export default i18next;
