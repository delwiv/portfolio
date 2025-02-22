'use client'

import clsx from 'clsx'
import { FaFilter } from 'react-icons/fa6'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => {
      let src = '/star-empty.png'
      if (i < Math.floor(rating)) {
        src = '/star-full.png'
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        src = '/star-half.png'
      }
      return (
        <Image
          key={i}
          src={src}
          width={20}
          height={20}
          alt='star rating'
        ></Image>
      )
    })

  return <div className='flex items-center'>{stars}</div>
}

const Skill = ({ skill, handleClickInfo, showInfo }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleClickFilter = useCallback(() => {
    const search = new URLSearchParams(searchParams.toString())
    let anchor = ''
    if (search.get('skill') === skill.name) {
      search.delete('skill')
      anchor = '#skills'
    } else {
      search.set('skill', skill.name)
      anchor = '#projects'
    }
    router.push(`${pathname}/?${search.toString()}${anchor}`)
  }, [pathname, router, searchParams, skill])

  const selectedSkill = useMemo(() => {
    return searchParams.get('skill') === skill.name
  }, [searchParams, skill.name])

  return (
    <div
      onClick={handleClickFilter}
      className={clsx(
        selectedSkill
          ? 'border-green-500 bg-green-800'
          : 'border-transparent bg-gray-500 ',
        'rounded-xl px-4 border py-2 flex flex-col items-center group relative cursor-pointer'
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
            color={selectedSkill ? '#6BC451' : 'white'}
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

export default function Skills({ skills }) {
  const [showInfo, setShowInfo] = useState(null)

  const handleClickInfo = useCallback(
    (id) => {
      if (id === showInfo) {
        setShowInfo(null)
      } else {
        setShowInfo(id)
      }
    },
    [showInfo]
  )

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full'>
      {skills.map((skill) => (
        <Skill
          key={skill._id}
          showInfo={showInfo === skill._id}
          handleClickInfo={handleClickInfo}
          skill={skill}
        ></Skill>
      ))}
    </div>
  )
}
