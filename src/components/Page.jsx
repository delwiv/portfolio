import { urlFor } from '~/sanity/lib/image'
import Content from './Content'
import FixedImage from './FixedImage'

export default function PageComponent({ page, children, searchParams }) {
  const { heroText, title, sections } = page
  const heroImage =
    page.heroImage && urlFor(page.heroImage).width(1920).height(1080).url()
  return (
    <div className='flex flex-col gap-8 justify-center items-center scroll-smooth'>
      <FixedImage
        src={heroImage}
        text={heroText}
        position='top'
        fullWidth
      ></FixedImage>
      <div className='md:px-12 px-4 flex flex-col justify-center items-center gap-16 w-full'>
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
