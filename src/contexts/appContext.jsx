'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} = require('react')

const AppContext = createContext(null)

export default function AppProvider({ children }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [skillChanged, setSkillChanged] = useState(null)
  const [expandOverlay, setExpandOverlay] = useState(null)
  // const locale = useMemo(() => )

  const expandedProject = searchParams.get('project')

  const setExpandedProject = useCallback(
    (project) => {
      const search = new URLSearchParams(searchParams.toString())

      if (project) {
        search.set('project', project.name)
      } else {
        search.delete('project')
      }

      console.log(search.toString())
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
    // expandOverlay,
    // setExpandOverlay,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
