import { urlFor } from '~/sanity/lib/image'
import Content from './Content'
import FixedImage from './FixedImage'
import clsx from 'clsx'

export default function PageComponent({
  page,
  children,
  searchParams,
  className,
}) {
  const { heroText, title, sections, content } = page
  const heroImage = page.heroImage && urlFor(page.heroImage).url()
  return (
    <div
      className={clsx(
        'flex flex-col gap-8 justify-center items-center scroll-smooth',
        className
      )}
    >
      <FixedImage
        src={heroImage}
        text={heroText}
        position='top'
        fullWidth
        fullHeight
      ></FixedImage>
      <div className='md:px-12 px-4 flex flex-col justify-center items-center gap-16 w-full'>
        {content?.map((content) => (
          <Content
            key={content._key}
            item={content}
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
  )
}
