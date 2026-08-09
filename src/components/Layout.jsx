import Header from './Header'
import AppProvider from '~/contexts/appContext'
import Footer from './Footer'

export default function Layout({ children, settings }) {
  const data = settings?.data

  return (
    <AppProvider>
      <Header settings={data}></Header>
      <main className='min-h-[70vh]'>{children}</main>
      <Footer settings={data}></Footer>
    </AppProvider>
  )
}
