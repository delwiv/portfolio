'use client'

import { formatDuration, intervalToDuration } from 'date-fns'
import Image from 'next/image'
import { urlFor } from '~/sanity/lib/image'
import UnfoldableBox from './UnfoldableBox'
import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

const formatDate = (date, style) => {
  return new Intl.DateTimeFormat(navigator.language || 'en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export default function Project({ project }) {
  return (
    <div className='rounded-xl p-4 bg-gray-500 flex flex-col items-center justify-between group relative gap-4 w-full'>
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
              className='rounded-xl'
              alt={`${project.company?.name} logo`}
            ></Image>
          )}
        </div>
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
                marks: {
                  // Ex. 1: custom renderer for the em / italics decorator
                  em: ({ children }) => (
                    <em className='text-gray-600 font-semibold'>{children}</em>
                  ),

                  // Ex. 2: rendering a custom `link` annotation
                  link: ({ value, children }) => {
                    console.log({ value, children })
                    const target = (value?.href || '').startsWith('http')
                      ? '_blank'
                      : undefined
                    return (
                      <a
                        href={value?.href}
                        target={target}
                        rel={target === '_blank' && 'noindex nofollow'}
                      >
                        {children}
                      </a>
                    )
                  },
                },
                link: ({ children }) => {
                  console.log({ children })
                  return (
                    <a
                      className='text-blue-500 hover:text-blue-700'
                      href={children}
                    >
                      {children}
                    </a>
                  )
                },
              },
            }}
          ></PortableText>
        </UnfoldableBox>
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
              <div key={tool} className='text-md rounded-xl bg-gray-600 p-2'>
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
    </div>
  )
}

export const LoadingProjects = ({ count, invisible }) => {
  return new Array(count)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className={clsx(
          invisible && 'opacity-0',
          'rounded-xl bg-gray-500 animate-pulse w-full aspect-[9/16]'
        )}
      ></div>
    ))
}
