'use client'

import { formatDuration, intervalToDuration } from 'date-fns'
import Image from 'next/image'
import { urlFor } from '~/sanity/lib/image'
import UnfoldableBox from './UnfoldableBox'
import { PortableText } from '@portabletext/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useApp } from '~/contexts/appContext'
import { useSearchParams } from 'next/navigation'

const isServer = typeof window === 'undefined'

const formatDate = (date, style) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export default function Project({ project, index, loading }) {
  const { skillChanged, setSkillChanged } = useApp()
  const [show, setShow] = useState(!skillChanged)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (show) {
      return
    }

    const timeout = setTimeout(() => setShow(true), 100 * index)

    return () => clearTimeout(timeout)
  }, [index, show])

  useEffect(() => {
    setSkillChanged(false)
  }, [searchParams, setSkillChanged])

  return (
    <div
      className={clsx(
        show && !loading ? 'opacity-100' : 'opacity-0',
        loading && 'aspect-[9/16] animate-pulse opacity-100',
        skillChanged && 'animate-pulse',
        'transition-opacity duration-300 rounded-xl p-4 bg-gray-500 flex flex-col items-center justify-between group relative gap-4 w-full'
      )}
    >
      {!loading && (
        <>
          <div className='h-full gap-4 flex flex-col justify-between w-full'>
            <div className='flex justify-between'>
              <div>
                <div className='text-2xl'>{project.name}</div>
                <div className='text-xl'>{project.role}</div>
                <div className='italic'>
                  {formatDate(project.start)} -{' '}
                  {project.end
                    ? formatDuration(
                        intervalToDuration({
                          start: new Date(project.start),
                          end: new Date(project.end),
                        }),
                        { format: ['years', 'months', 'weeks'] }
                      )
                    : 'Ongoing'}
                </div>
              </div>
              {project.company?.logo && (
                <Image
                  src={urlFor(project.company?.logo).maxWidth(100).url()}
                  width={100}
                  height={100}
                  className='rounded-xl aspect-auto max-h-[100px] max-w-[100px] w-auto'
                  alt={`${project.company?.name} logo`}
                ></Image>
              )}
            </div>
            <div className='project-description'>
              <UnfoldableBox>
                <PortableText
                  value={project.description.content}
                  components={{
                    list: {
                      bullet: ({ children }) => (
                        <ul className='list-disc pl-4'>{children}</ul>
                      ),
                      number: ({ children }) => (
                        <ul className='list-decimal pl-8'>{children}</ul>
                      ),
                    },
                  }}
                ></PortableText>
              </UnfoldableBox>
            </div>
            <div>
              <div className='text-lg'>Tech</div>

              <div className='grid grid-cols-2 gap-2'>
                {(project.skills || []).map((skill) => (
                  <div
                    key={skill.name}
                    className='text-md rounded-xl bg-gray-600 p-2'
                  >
                    {skill.name}
                  </div>
                ))}
                {(project.tools || []).map((tool) => (
                  <div
                    key={tool}
                    className='text-md rounded-xl bg-gray-600 p-2'
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {project.url ? (
            <a
              href={project.url}
              target='_blank'
              className='text-center flex flex-col gap-4'
            >
              {project.screenshot && (
                <Image
                  src={urlFor(project.screenshot).maxWidth(500).url()}
                  className='rounded-xl w-full aspect-square'
                  width={500}
                  height={500}
                  alt={`${project.company?.name} logo`}
                ></Image>
              )}

              {project.url}
            </a>
          ) : (
            project.screenshot && (
              <div className='flex flex-col gap-4 text-center'>
                <Image
                  src={urlFor(project.screenshot).maxWidth(500).url()}
                  className='rounded-xl w-full aspect-square'
                  width={500}
                  height={500}
                  alt={`${project.company.name} logo`}
                ></Image>
                <div>Offline :/</div>
              </div>
            )
          )}
        </>
      )}
    </div>
  )
}
