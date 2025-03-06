import { PortableText } from '@portabletext/react'

export default function RichText({ value }) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p className='pb-2'>{children}</p>,
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
            console.log({ value, children })
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
