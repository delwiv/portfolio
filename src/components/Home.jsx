import { urlFor } from '~/sanity/lib/image'
import Content from './Content'
import FixedImage from './FixedImage'
import clsx from 'clsx'
import SkillList from './SkillList'
import Bio from './Bio'

export default function HomeComponent({
  page,
  children,
  searchParams,
  className,
}) {
  if (!page) {
    return null
  }

  const { heroText, sections, content } = page
  const heroImage = page.heroImage && urlFor(page.heroImage).url()

  const skills = sections?.find((c) => c._type === 'skills')
  const bio = sections.find((c) => c._type === 'bio')

  const otherContent = (content || []).concat(
    sections?.filter((c) => c._type !== 'skills' && c._type !== 'bio')
  )

  return (
    <div
      className={clsx(
        'flex flex-col gap-8 justify-center items-center pt-16',
        className
      )}
    >
      {!heroImage && (
        <FixedImage
          src={heroImage}
          text={heroText}
          position='top'
          fullWidth
          fullHeight
        ></FixedImage>
      )}
      <div className='md:px-12 px-4 flex flex-col justify-center items-center gap-16 w-full bg-transparent pt-4'>
        <Bio {...bio}></Bio>
        <div className='flex flex-col lg:flex-row w-full items-justify lg:items-start gap-4'>
          <div className='lg:sticky top-24 lg:flex-[1] w-full lg:overflow-y-scroll lg:overflow-x-hidden lg:max-h-[calc(100vh-110px)] thin-scrollbar'>
            <SkillList vertical {...skills}></SkillList>
          </div>
          <div className='flex flex-col justify-center items-center gap-16 w-full lg:flex-[4]'>
            {otherContent?.map((content) => (
              <Content
                key={content._key}
                item={content}
                searchParams={searchParams}
              ></Content>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
