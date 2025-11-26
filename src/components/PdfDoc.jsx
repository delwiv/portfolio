import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { urlFor } from '~/sanity/lib/image'

const formatDate = (date, style) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function StarRating({ rating }) {
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
          style={{
            width: '8px',
            height: '8px',
          }}
          alt='star rating'
        ></Image>
      )
    })

  return <div style={{ display: 'flex', flexDirection: 'row' }}>{stars}</div>
}

const styles = StyleSheet.create({
  page: {
    fontSize: '11px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 'bold',
  },
  dark: {
    backgroundColor: '#1F2937',
    color: '#ffffff',
  },
})
export default function PdfDoc({ developer, skills, projects }) {
  return (
    <Document>
      <Page style={styles.page} size='A4'>
        <View
          style={[
            {
              padding: '15px',
              backgroundColor: '#e9e9e9',
              color: '#000000',
            },
            styles.dark,
          ]}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: '50px',
                  height: '50px',
                }}
              >
                <Image
                  alt={developer.name}
                  style={{
                    borderRadius: '50px',
                    border: '1px solid black',
                    height: '50px',
                    width: '50px',
                    objectFit: 'cover',
                  }}
                  src={urlFor(developer.image).width(250).height(250).url()}
                ></Image>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  width: '100%',
                }}
              >
                <Text style={styles.title}>{developer.name}</Text>
                <Text>{developer.role}</Text>
              </View>
              <View
                style={{
                  justifySelf: 'center',
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    width: '50px',
                    height: '50px',
                  }}
                >
                  <Image
                    alt='Up to date resume'
                    style={{
                      width: '50px',
                      height: '50px',
                      // borderRadius: '2px',
                    }}
                    width={50}
                    height={50}
                    src={urlFor(developer.resumeQrcode)
                      .width(200)
                      .height(200)
                      .url()}
                  ></Image>
                </View>
                <View
                  style={{
                    width: '50px',
                    height: '50px',
                    textAlign: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '7px',
                    }}
                  >
                    Last version
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          <View
            id='sidebar'
            style={[
              {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                backgroundColor: '#e9e9e9',
                color: '#000000',
                borderRight: '1px solid #1F2937',
                padding: '5px',
              },
              styles.dark,
            ]}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                paddingBottom: '10px',
                fontSize: '8px',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '5px',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={{
                    width: '50px',
                    height: '50px',
                    // borderRadius: '2px',
                  }}
                  alt='Portfolio'
                  src={urlFor(developer.homeQrcode)
                    .width(150)
                    .height(150)
                    .url()}
                ></Image>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text
                    style={{
                      fontSize: '10px',
                    }}
                  >
                    Portfolio
                  </Text>
                  <Text>www.wildredbeard.tech</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: '10px' }}>
              <Text style={styles.title}>Contact</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  paddingTop: '10px',
                  fontSize: '8px',
                }}
              >
                {(developer.social || []).map((social) => (
                  <View
                    key={social.platform}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '5px',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={{ width: '10px', height: '10px' }}
                      alt={`${social.platform}`}
                      src={urlFor(social.icon).width(150).height(150).url()}
                    ></Image>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text
                        style={{
                          fontSize: '10px',
                        }}
                      >
                        {social.platform}
                      </Text>
                      <Text>
                        {(social.href || social.url).replace('mailto:', '')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ paddingBottom: '10px' }}>
              <Text style={styles.title}>Skills</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '7px',
                }}
              >
                {skills
                  .sort((a, b) => b.expertise - a.expertise)
                  // .slice(0, 12)
                  .map((skill) => (
                    <View
                      wrap={false}
                      key={skill._id}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '10px',
                        gap: '5px',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <Text
                          style={{
                            fontSize: '10px',
                          }}
                        >
                          {skill.name}
                        </Text>
                        <StarRating rating={skill.expertise}></StarRating>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 3,
              padding: '5px 5px 0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <Text style={styles.title}>Summary</Text>
              <View
                style={{
                  fontSize: '9px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                {developer.bio.map((section) =>
                  section.children.map((s) => (
                    <Text key={s._key}>{s.text}</Text>
                  ))
                )}
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={styles.title}>Experience</Text>
              <View
                style={{
                  fontSize: '9px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                {projects
                  .filter((p) => p.company.name !== 'Wild Red Beard')
                  .map((project) => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '10px',
                      }}
                      key={project._id}
                      wrap={false}
                    >
                      <Text
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                        }}
                      >
                        {project.role} at {project.company.name}
                      </Text>
                      <Text>{project.name}</Text>

                      <Text
                        style={{
                          color: '#38383D',
                          fontSize: '9px',
                        }}
                      >
                        {formatDate(project.start)}
                        {project.end
                          ? ` - ${formatDate(project.end)}`
                          : ' - Ongoing'}
                      </Text>
                      <Text
                        style={{
                          fontSize: '10px',
                        }}
                      >
                        {project.shortDescription}
                      </Text>
                      <View style={{ fontSize: '8px' }}>
                        {project.description.map((d) =>
                          d.children.map((c) => (
                            <Text key={c._key}>{c.text}</Text>
                          ))
                        )}
                      </View>
                      <View>
                        <Text style={{ fontSize: '10px' }}>Skills</Text>
                        <Text style={{ fontSize: '8px' }}>
                          {project.skills.map((s) => s.name).join(', ')}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
