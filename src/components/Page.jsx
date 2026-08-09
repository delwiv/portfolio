import { urlFor } from '~/sanity/lib/image'
import Content from './Content'
import FixedImage from './FixedImage'
import clsx from 'clsx'
import Reveal from './Reveal'

export default function PageComponent({
  page,
  children,
  searchParams,
  className,
}) {
  if (!page) {
    return null
  }
  const { heroText, title, sections, content } = page
  const heroImage = page.heroImage && urlFor(page.heroImage).url()

  return (
    <div id='top' className={clsx('', className)}>
      {heroImage && (
        <section className='relative overflow-hidden'>
          <FixedImage src={heroImage} position='top' />
          <div className='absolute inset-0 bg-gradient-to-b from-base/70 via-base/40 to-base' />
          <div className='container-blog relative flex min-h-[38vh] flex-col justify-end pb-10 pt-32'>
            <Reveal>
              <h1 className='text-6xl md:text-7xl'>{heroText || title}</h1>
            </Reveal>
          </div>
        </section>
      )}

      <div className='container-blog flex flex-col items-center py-10'>
        <div className='prose-blog flex w-full max-w-3xl flex-col'>
          {content?.map((item) => (
            <Content
              key={item._key}
              item={item}
              searchParams={searchParams}
            ></Content>
          ))}
          {sections?.map((section) => (
            <Content
              key={section._key}
              item={section}
              searchParams={searchParams}
            ></Content>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}
