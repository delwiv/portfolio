import Image from './Image'

export default function StarRating({ rating }) {
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
