import Header from './Header'
import AppProvider from '~/contexts/appContext'
import Footer from './Footer'

export default function Layout({ children, settings }) {
  return (
    <AppProvider>
      <Header settings={settings.data}></Header>
      {children}
      <Footer></Footer>
    </AppProvider>
  )
}
