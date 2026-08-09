'use client'

const { createContext, useState, useContext } = require('react')

const AppContext = createContext(null)

export default function AppProvider({ children }) {
  const [translations, setTranslations] = useState(null)

  return (
    <AppContext.Provider value={{ translations, setTranslations }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
