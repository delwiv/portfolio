import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, settings }) {
  return (
    <>
      <Header settings={settings.data}></Header>
      {children}
      <Footer></Footer>
    </>
  )
}
