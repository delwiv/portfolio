'use client'

import clsx from 'clsx'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import StarRating from './StarRating'
import { useApp } from '~/contexts/appContext'

export default function Skill({ skill }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { setSkillChanged } = useApp()

  const handleClickFilter = useCallback(() => {
    const search = new URLSearchParams(searchParams.toString())

    let anchor = '#projects'

    if (search.get('skill') === skill.name) {
      search.delete('skill')
      // anchor = '#skills'
    } else {
      search.set('skill', skill.name)
      // anchor = '#highlight-skill'
    }

    setSkillChanged(true)

    router.push(`${pathname}/?${search.toString()}${anchor}`)
  }, [pathname, router, searchParams, setSkillChanged, skill.name])

  const selectedSkill = useMemo(() => {
    return searchParams.get('skill') === skill.name
  }, [searchParams, skill.name])

  return (
    <div
      onClick={handleClickFilter}
      className={clsx(
        selectedSkill
          ? 'border-green-500 bg-green-800'
          : 'border-transparent bg-gray-800 ',
        'rounded-xl px-4  border py-4 flex flex-col items-center group relative cursor-pointer'
      )}
    >
      <div className='flex flex-col w-full justify-between'>
        <div className='text-lg'>{skill.name}</div>
        <StarRating rating={skill.expertise}></StarRating>
      </div>
    </div>
  )
}
