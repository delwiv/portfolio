'use client'

import PdfDoc from './PdfDoc'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

export default function PdfResume({ data, t }) {
  const { developer, skills, projects } = data

  const [isClient, setIsClient] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const doc = PdfDoc({ developer, skills, projects, t })
  return (
    <div className='flex grow w-full h-dvh items-center justify-center flex-col'>
      {!loaded && <div>{t.resume.generating}</div>}
      {isClient && (
        <>
          <PDFDownloadLink fileName='louis-cathala-resume.pdf' document={doc}>
            {({ loading }) => {
              if (loading) {
                return
              }
              if (loaded === false) {
                setTimeout(() => setLoaded(true), 2000)
              }
              return
            }}
          </PDFDownloadLink>
          <div className={clsx(loaded ? 'block' : 'hidden')}>
            <PDFViewer className='w-dvw h-dvh'>{doc}</PDFViewer>
          </div>
        </>
      )}
    </div>
  )
}
