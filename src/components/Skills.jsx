'use client'

import { useCallback, useState } from 'react'
import Skill from './Skill'

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
