'use client'

import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import Header from './Header'
import AppProvider from '~/contexts/appContext'
import Footer from './Footer'

const queryClient = new QueryClient()

export default function Layout({ children, settings }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Header settings={settings.data}></Header>
        {children}
        <Footer></Footer>
      </AppProvider>
    </QueryClientProvider>
  )
}
