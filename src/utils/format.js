export const formatDate = (date, locale) => {
  return new Intl.DateTimeFormat(locale || 'en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
