import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export const locales = ['en', 'fr']

export const getUserLocale = (acceptLanguage) => {
  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages()

  return match(languages, locales, locales[0])
}
