'use client'

import { useEffect } from 'react'
import { useApp } from '~/contexts/appContext'

export default function TranslationsComponent({
  translations,
  language,
  basePath,
}) {
  const { setTranslations } = useApp()

  useEffect(() => {
    if (translations) {
      const trans = translations
        .filter((t) => t.language !== language)
        .map((t) => ({
          ...t,
          newPath: basePath
            .replace('$LANG', t.language)
            .replace('$SLUG', t.slug?.current),
        }))
      setTranslations(trans)
    }
  }, [setTranslations, translations, language, basePath])

  return null
}
