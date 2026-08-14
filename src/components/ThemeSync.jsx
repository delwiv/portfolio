'use client'

import { useEffect } from 'react'

/**
 * Ré-applique le thème après chaque rendu du layout racine.
 * Nécessaire car React contrôle le className de <html> : au re-render du
 * layout (ex. changement de langue → prop `lang`), la classe `dark` ajoutée
 * manuellement peut être écrasée. Priorité : localStorage, sinon préférence
 * système. Idempotent — aucun coût en boucle.
 */
export default function ThemeSync() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      const dark = saved
        ? saved === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', dark)
    } catch {
      /* noop */
    }
  })

  return null
}
