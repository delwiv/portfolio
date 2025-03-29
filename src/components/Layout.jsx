import Header from './Header'
import AppProvider from '~/contexts/appContext'
import Footer from './Footer'
import Overlay from './Overlay'

export default function Layout({ children, settings }) {
  return (
    <AppProvider>
      <Overlay></Overlay>
      <Header settings={settings.data}></Header>
      {children}
      <Footer settings={settings.data}></Footer>
    </AppProvider>
  )
}
