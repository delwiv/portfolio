'use client'

import { formatDuration, intervalToDuration } from 'date-fns'
import Image from './Image'
import { urlFor } from '~/sanity/lib/image'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { useApp } from '~/contexts/appContext'
import { useSearchParams } from 'next/navigation'
import RichText from './RichText'
import { GiExpand } from 'react-icons/gi'

const formatDate = (date, style) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export default function Project({ project, index, loading }) {
  const { skillChanged, setSkillChanged, expandedProject, setExpandedProject } =
    useApp()
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

  const expanded = useMemo(() => {
    return expandedProject === project?.name
  }, [expandedProject, project?.name])

  if (!project) {
    return null
  }

  return (
    <div
      className={clsx(
        show && !loading ? 'opacity-100' : 'opacity-0',
        loading && 'aspect-[9/16] animate-pulse opacity-100',
        skillChanged && 'animate-pulse',
        'transition-all duration-1000 rounded-xl p-4 bg-gray-800 flex flex-col items-center justify-between group gap-4 w-full'
      )}
    >
      <div
        onClick={() => setExpandedProject(null)}
        className={clsx(
          expanded && show
            ? 'w-screen h-screen z-50 opacity-100 bg-gray-800/50 overflow-auto size-full top-16 left-0 '
            : 'opacity-0 z-[-1] overflow-hidden size-0 top-1/2 left-1/2',
          'fixed md:px-2 transition-all duration-300 cursor-pointer'
        )}
      >
        <div
          className='project-expanded rounded-xl bg-gray-800 pb-16 px-4 md:px-8 pt-16 md:m-8 gap-8 flex flex-col  cursor-auto cursor relative border-gray-600 border-2'
          onClick={(e) => {
            // e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div
            className='absolute top-4 right-4 cursor-pointer'
            onClick={() => setExpandedProject(null)}
          >
            <Image
              src={'/icon-cross.svg'}
              className='cursor-pointer'
              width={24}
              height={24}
              alt='Close this project'
            ></Image>
          </div>
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
                <div className='text-lg font-ubuntu'>
                  {project.shortDescription}
                </div>
              </div>
              {project.company?.logo && (
                <Image
                  src={urlFor(project.company?.logo).maxWidth(100).url()}
                  width={100}
                  height={100}
                  className='rounded-md max-h-[50px] max-w-[50px] md:max-h-[100px] md:max-w-[100px] w-auto h-auto object-contain aspect-auto'
                  alt={`${project.company?.name} logo`}
                ></Image>
              )}
            </div>
            <div className='project-description'>
              <RichText value={project.description} />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='text-xl'>Tech stack</div>

              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
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
              className='flex text-center flex-col gap-4 underline w-full'
            >
              {project.screenshot && (
                <Image
                  src={urlFor(project.screenshot)
                    .maxWidth(expanded ? 2560 : 360)
                    .url()}
                  className='rounded-xl w-full aspect-video object-contain'
                  width={expanded ? 2560 : 360}
                  height={expanded ? 1440 : 240}
                  alt={`${project.company?.name} screenshot`}
                ></Image>
              )}

              {project.url}
            </a>
          ) : (
            project.screenshot && (
              <div className='flex flex-col gap-4 text-center w-full'>
                <Image
                  src={urlFor(project.screenshot)
                    .maxWidth(expanded ? 2560 : 360)
                    .url()}
                  className='rounded-xl w-full aspect-video object-contain'
                  width={expanded ? 2560 : 360}
                  height={expanded ? 1440 : 240}
                  alt={`${project.company.name} screenshot`}
                ></Image>
                <div>Offline :/</div>
              </div>
            )
          )}
        </div>
      </div>
      {!loading && (
        <div
          onClick={() => setExpandedProject(project)}
          className='flex flex-col gap-4 cursor-pointer'
        >
          <div className='gap-4 flex flex-col justify-between w-full'>
            <div className='flex justify-between items-center'>
              <div>
                <div className='text-2xl'>{project.name}</div>
              </div>
              <GiExpand></GiExpand>
            </div>
          </div>
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
          <div className='text-lg font-ubuntu'>{project.shortDescription}</div>

          <div className='grid grid-cols-2 gap-2'>
            {(project.skills || []).slice(0, 3).map((skill) => (
              <div
                key={skill.name}
                className='text-md rounded-xl bg-gray-600 p-2 flex items-center justify-center'
              >
                {skill.name}
              </div>
            ))}
            <div className='text-md rounded-xl bg-gray-600 p-2 flex items-center justify-center'>
              ...
            </div>
          </div>
          {project.screenshot && (
            <Image
              src={urlFor(project.screenshot).maxWidth(500).url()}
              className='rounded-xl w-full aspect-auto object-contain'
              width={500}
              height={500}
              alt={`${project.company?.name} screenshot`}
            ></Image>
          )}
        </div>
      )}
    </div>
  )
}
