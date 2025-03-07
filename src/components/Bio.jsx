import Image from 'next/image'
import { use } from 'react'
import { urlFor } from '~/sanity/lib/image'
import { sanityFetch } from '~/sanity/lib/live'
import { DEVELOPER_QUERY } from '~/sanity/lib/queries'
import RichText from './RichText'

export default function Bio({ developer }) {
  const { data: bio } = use(
    sanityFetch({
      query: DEVELOPER_QUERY,
      params: { developerId: developer._ref },
    })
  )

  return (
    <section className='flex gap-8 justify-start w-full items-center flex-col md:flex-row rounded-xl p-4 bg-gray-800'>
      <Image
        alt={bio.name}
        className='rounded-full border border-gray-100 size-[200px] object-cover'
        width={200}
        height={200}
        src={urlFor(bio.image).width(200).height(200).url()}
      ></Image>
      <div className='flex flex-col gap-8 w-full items-center md:items-start'>
        <div className='flex flex-col gap-2 items-center md:items-start'>
          <div className='flex flex-col gap-2 items-start'>
            <div className='text-3xl p-0'>{bio.name}</div>
            <div className='text-2xl p-0'>{bio.role}</div>
          </div>
          <div className='text-xl'>
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
          </div>
        </div>
        <div className='text-md'>
          <RichText value={bio.bio} />
        </div>
        <div className='flex gap-4 w-full justify-center md:justify-start'>
          {(bio.social || []).map((social) => (
            <a href={social.url} target='_blank' key={social.platform}>
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
    </section>
  )
}
