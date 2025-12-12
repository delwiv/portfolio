/* eslint-disable @next/next/no-img-element */
import { urlFor } from '~/sanity/lib/image'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

const getFont = (baseUrl) =>
  fetch(`${baseUrl}/fonts/BebasNeue-Regular.ttf`).then((res) =>
    res.arrayBuffer()
  )

export async function generatePngFromDocument({ page, developer }, origin) {
  const {
    heroImage: image,
    SEO: { title },
  } = page

  // Prepare font data and settings for Satori
  const fontData = await getFont(origin)
  const options = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: 'BebasNeue',
        data: fontData,
        style: 'normal',
      },
    ],
  }

  // Create the SVG with satori
  const component = (
    <div
      style={{
        width: options.width,
        height: options.height,
        background: 'linear-gradient( 135deg, black 10%, #444 100%)',
        color: 'white',
        fontFamily: 'BebasNeue',
        letterSpacing: '-0.05em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        position: 'relative',
      }}
    >
      <img
        style={{
          width: options.width,
          height: options.height - 150,
          display: 'flex',
          zIndex: 0,
          alignItems: 'center',
          justifyContent: 'center',
          objectFit: 'cover',
        }}
        alt=''
        src={urlFor(image)
          .height(options.height)
          .width(options.width)
          .fit('max')
          .auto('format')
          .url()}
        width={options.width}
        height={options.height}
      />
      <img
        height={80}
        width={80}
        src={urlFor(developer.image).height(80).width(80).fit('max').url()}
        style={{
          position: 'absolute',
          top: 35,
          right: 35,
          borderRadius: '9999px',
          zIndex: 10,
          border: '1px solid black',
        }}
        alt=''
      />
      <h1
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 5,
          gap: 5,
          fontSize: 100,
        }}
      >
        {title}
      </h1>
      <h2>www.wildredbeard.tech</h2>
    </div>
  )

  return { image: component, options }
}
