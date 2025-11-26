'use client'

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import PdfDoc from './PdfDoc'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'

export default function PdfResume({ data, instantDownload = false }) {
  const { developer, skills, projects } = data
  const router = useRouter()

  const [downloadLink, setDownloadLink] = useState(null)

  const doc = PdfDoc({ developer, skills, projects })

  useEffect(() => {
    if (instantDownload && downloadLink !== null) {
      router.push(downloadLink)
    }
  }, [downloadLink, instantDownload, router])

  return (
    <div className='pt-[56px] pb-[82px] h-dvh overflow-y-scroll'>
      {instantDownload === false && (
        <PDFViewer className='w-full h-full'>{doc}</PDFViewer>
      )}
      <PDFDownloadLink fileName='louis-cathala-resume.pdf' document={doc}>
        {({ blob, url, loading, error }) => {
          if (loading) {
            return 'Generating resume...'
          }
          if (downloadLink === null) {
            setDownloadLink(url)
          }
          return ''
        }}
      </PDFDownloadLink>
    </div>
  )
}
