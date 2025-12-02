import Image from './Image'
import StarRating from './StarRating'
import Link from 'next/link'
import clsx from 'clsx'

export default function HighlightSkill({ skill, pathname, className }) {
  return (
    <div
      id='highlight-skill'
      className={clsx(
        'transition-all duration-700',
        skill && className,
        skill
          ? 'w-full flex flex-col gap-4 border-green-500 border bg-green-800 p-4 rounded-xl relative max-h-fit'
          : 'max-h-0 overflow-y-hidden'
      )}
    >
      <div className='flex justify-between items-center'>
        <div className='text-2xl'>{skill?.name}</div>
        <Link href={`${pathname}#projects`}>
          <Image
            src={'/icon-cross.svg'}
            className='cursor-pointer'
            width={24}
            height={24}
            alt='Remove this filter'
          ></Image>
        </Link>
      </div>
      <div className='flex justify-start w-full gap-4 items-center'>
        <StarRating rating={skill?.expertise}></StarRating>
        {new Date().getFullYear() - new Date(skill?.since)?.getFullYear()} years
      </div>

      <div>{skill?.description}</div>
      {skill?.citation && (
        <div className='italic'>&laquo; {skill?.citation} &raquo;</div>
      )}
    </div>
  )
}
