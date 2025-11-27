import 'server-only'

export const dictionaries = {
  fr: () => import('../../locales/fr.json').then((module) => module.default),
  en: () => import('../../locales/en.json').then((module) => module.default),
}

export const getTranslation = async (locale = 'en') => dictionaries[locale]()
