export const formatDate = (date, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
