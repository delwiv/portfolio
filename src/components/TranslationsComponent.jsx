'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useApp } from '~/contexts/appContext'

export default function TranslationsComponent({
  translations,
  language,
  basePath,
}) {
  const { setTranslations } = useApp()
  const searchParams = useSearchParams()

  const strParams = searchParams.toString()

  useEffect(() => {
    if (translations) {
      const trans = translations
        .filter((t) => t.language !== language)
        .map((t) => ({
          ...t,
          newPath: basePath
            .concat(strParams.length > 0 ? `?${strParams}` : '')
            .replace('$LANG', t.language)
            .replace('$SLUG', t.slug?.current),
        }))
      setTranslations(trans)
    }
  }, [setTranslations, translations, language, basePath, strParams])

  return null
}
