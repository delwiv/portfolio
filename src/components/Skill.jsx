'use client'

import clsx from 'clsx'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { FaFilter } from 'react-icons/fa6'
import { undefined, StarRating } from './Skills'

export const Skill = ({ skill, handleClickInfo, showInfo }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleClickFilter = useCallback(() => {
    const search = new URLSearchParams(searchParams.toString())
    let anchor = ''
    if (search.skill === skill.name) {
      search.set('skill', undefined)
      anchor = '#skills'
    } else {
      search.set('skill', skill.name)
      anchor = '#projects'
    }
    router.push(`${pathname}/?${search.toString()}${anchor}`, { scroll: true })
  }, [pathname, router, searchParams, skill])

  const selectedSkill = useMemo(() => {
    return searchParams.get('skill') === skill.name
  }, [searchParams, skill.name])

  return (
    <div
      onClick={handleClickFilter}
      className={clsx(
        selectedSkill === null || selectedSkill === skill._id
          ? 'border-green-500'
          : 'border-transparent',
        'rounded-xl px-4 border py-2 bg-gray-500 flex flex-col items-center group relative cursor-pointer'
      )}
    >
      <div className='flex w-full justify-between'>
        <div className='text-lg'>{skill.name}</div>
        {skill.description && (
          <div
            onClick={() => handleClickInfo(skill._id)}
            className={clsx(
              'italic border rounded-full size-5 flex items-center justify-center cursor-pointer',
              showInfo
                ? 'border-yellow-500 text-yellow-500'
                : 'border-white text-white'
            )}
          >
            i
          </div>
        )}
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex w-full justify-between flex-col md:flex-row'>
          <div>
            {new Date().getFullYear() - new Date(skill.since).getFullYear()}{' '}
            years
          </div>
          <StarRating rating={skill.expertise}></StarRating>
        </div>
        <div className='flex gap-2 items-end'>
          <FaFilter
            color={selectedSkill === skill._id ? '#6BC451' : 'white'}
            className='cursor-pointer'
            onClick={handleClickFilter}
          />
        </div>
      </div>
      <div
        className={clsx(
          'absolute top-16 rounded-xl flex-col gap-2 bg-gray-600 z-10 p-4',
          showInfo ? 'flex' : 'hidden'
        )}
      >
        <div className='text-md'>{skill.description}</div>
        {skill.citation && (
          <div className='text-sm italic text-gray-300'>{skill.citation}</div>
        )}
      </div>
    </div>
  )
}
