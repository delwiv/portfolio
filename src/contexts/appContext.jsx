'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const { createContext, useState, useContext, useCallback } = require('react')

const AppContext = createContext(null)

export default function AppProvider({ children }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [skillChanged, setSkillChanged] = useState(null)
  const [translations, setTranslations] = useState(null)

  const expandedProject = searchParams.get('project')

  const setExpandedProject = useCallback(
    (project) => {
      const search = new URLSearchParams(searchParams.toString())

      if (project) {
        search.set('project', project.name)
      } else {
        search.delete('project')
      }

      router.push(`${pathname}/?${search.toString()}#projects`, {
        scroll: false,
      })
    },
    [pathname, router, searchParams]
  )

  const value = {
    expandedProject,
    setExpandedProject,
    skillChanged,
    setSkillChanged,
    setTranslations,
    translations,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
