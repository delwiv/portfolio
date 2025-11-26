import Image from 'next/image'
import { use } from 'react'
import { urlFor } from '~/sanity/lib/image'
import { sanityFetch } from '~/sanity/lib/live'
import { DEVELOPER_QUERY } from '~/sanity/lib/queries'
import RichText from './RichText'
import { parseHeaders } from '~/utils/headers'

export default function Bio({ developer }) {
  const { locale: language } = use(parseHeaders())
  const { data: bio } = use(
    sanityFetch({
      query: DEVELOPER_QUERY,
      params: { developerId: developer._ref, language },
    })
  )

  return (
    <section className='flex gap-8 justify-start w-full items-center flex-col md:flex-row rounded-xl p-4 bg-gray-800'>
      <div className='flex flex-col md:self-start gap-4'>
        <Image
          alt={bio.name}
          className='rounded-full border border-gray-100  min-w-[200px] size-[200px] object-cover self-start'
          width={200}
          height={200}
          src={urlFor(bio.image).width(200).height(200).url()}
        ></Image>
        <div className='flex gap-4 w-full justify-center'>
          {(bio.social || []).map((social) => (
            <a
              href={social.href || social.url}
              target='_blank'
              key={social.platform}
            >
              <Image
                width={25}
                height={25}
                alt={`${social.platform}`}
                src={urlFor(social.icon).width(50).height(50).url()}
              ></Image>
            </a>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-8 w-full items-center md:items-start'>
        <div className='flex flex-col gap-2 items-center md:items-start'>
          <div className='flex flex-col gap-2 text-center md:text-left md:items-start'>
            <div className='text-3xl p-0'>{bio.name}</div>
            <div className='text-2xl p-0'>{bio.role}</div>
          </div>
          <div className='text-lg'>
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
          </div>
        </div>
        <div className='text-md'>
          <RichText value={bio.bio} />
        </div>
      </div>
    </section>
  )
}
