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
    <div
      style={{
        height: 'calc(100vh - 138px)',
      }}
      className='mt-[56px] w-lvw flex items-center justify-center'
    >
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
              if (loaded) {
                return (
                  <button className='border border-white p-4 rounded-md cursor-pointer sm:hidden block'>
                    {t.resume.download}
                  </button>
                )
              }
            }}
          </PDFDownloadLink>
          <div className={clsx(loaded ? 'sm:block' : 'hidden', 'hidden')}>
            <PDFViewer
              style={{
                height: 'calc(100vh - 138px)',
              }}
              className='w-lvw'
            >
              {doc}
            </PDFViewer>
          </div>
        </>
      )}
    </div>
  )
}
