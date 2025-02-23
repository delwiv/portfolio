import Image from 'next/image'
import { use } from 'react'
import { urlFor } from '~/sanity/lib/image'
import { sanityFetch } from '~/sanity/lib/live'
import { DEVELOPER_QUERY } from '~/sanity/lib/queries'

export default function Bio({ developer }) {
  const { data: bio } = use(
    sanityFetch({
      query: DEVELOPER_QUERY,
      params: { developerId: developer._ref },
    })
  )

  return (
    <div className='flex gap-4 justify-start w-full items-center'>
      <Image
        alt={bio.name}
        className='rounded-full border border-gray-100 size-[200px] object-cover'
        width={200}
        height={200}
        src={urlFor(bio.image).width(200).height(200).url()}
      ></Image>
      <div className='flex flex-col gap-4'>
        <div className='text-2xl'>{bio.name}</div>
        <div className='text-lg'>
          <a href={`mailto:${bio.email}`}>{bio.email}</a>
        </div>
        <div className='text-md'>{bio.bio}</div>
        <div className='flex gap-4'>
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
    </div>
  )
}
