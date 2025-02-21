'use client'

const { createContext, useState, useContext } = require('react')

const AppContext = createContext(null)

export default function AppProvider({ children }) {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const value = {
    selectedSkill,
    setSelectedSkill,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
