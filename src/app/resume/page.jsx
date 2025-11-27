import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  return (
    <div className='w-dvw h-dvh flex items-center justify-center gap-4'>
      <Link
        href='/resume/en'
        className='justify-center h-20 flex gap-2 items-center px-4'
      >
        <Image src='/flag-uk.svg' width={60} height={40} alt='UK flag'></Image>
      </Link>
      <Link
        href='/resume/fr'
        className='justify-center h-20 flex gap-2 items-center px-4'
      >
        <Image
          src='/flag-france.svg'
          width={60}
          height={40}
          alt='France flag'
        ></Image>
      </Link>
    </div>
  )
}
