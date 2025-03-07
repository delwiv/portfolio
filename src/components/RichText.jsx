import { PortableText } from '@portabletext/react'
import { getHeadingId } from '~/utils/summary'

export default function RichText({ value }) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p className='pb-2'>{children}</p>,
          h1: ({ children }) => <h1 id={getHeadingId(children)}>{children}</h1>,
          h2: ({ children }) => <h2 id={getHeadingId(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={getHeadingId(children)}>{children}</h3>,
          h4: ({ children }) => <h4 id={getHeadingId(children)}>{children}</h4>,
          h5: ({ children }) => <h5 id={getHeadingId(children)}>{children}</h5>,
          h6: ({ children }) => <h6 id={getHeadingId(children)}>{children}</h6>,
        },
        list: {
          bullet: ({ children }) => (
            <ul className='list-disc pl-4'>{children}</ul>
          ),
          number: ({ children }) => (
            <ul className='list-decimal pl-8'>{children}</ul>
          ),
        },
        marks: {
          link: ({ value, children }) => {
            return (
              <a
                className='underline'
                href={value?.href}
                target='_blank'
                rel='noindex nofollow'
              >
                {children}
              </a>
            )
          },
        },
      }}
    ></PortableText>
  )
}
