'use client'

const { createContext, useState, useContext } = require('react')

const AppContext = createContext(null)

export default function AppProvider({ children }) {
  const [skillChanged, setSkillChanged] = useState(null)

  const value = {
    skillChanged,
    setSkillChanged,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
