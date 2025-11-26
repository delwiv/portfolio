import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import Html from 'react-pdf-html'
import { urlFor } from '~/sanity/lib/image'

const formatDate = (date) => {
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

  return <View style={{ display: 'flex', flexDirection: 'row' }}>{stars}</View>
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#1F2937',
    color: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#515566',
    color: '#ffffff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000000',
    objectFit: 'cover',
  },
  profileInfo: {
    flexDirection: 'column',
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 12,
  },
  resumeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  resumeImage: {
    width: 50,
    height: 50,
  },
  resumeLabel: {
    fontSize: 8,
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    flex: 1,
    padding: 15,
    // borderRight: '1px solid #e0e0e0',
    backgroundColor: '#515566',
    color: '#ffffff',
  },
  contentSection: {
    flex: 3,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    // textDecoration: 'underline',
    // marginBottom: 10,
    // color: '#1F2937',
  },
  contactSection: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactIcon: {
    width: 12,
    height: 12,
  },
  contactText: {
    fontSize: 10,
  },
  contactValue: {
    fontSize: 8,
  },
  skillsSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 10,
    marginBottom: 15,
  },
  skillItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // borderBottom: '1px solid #e0e0e0',
    // padding: '0 0 5 0',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  skillName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  experienceSection: {
    flexDirection: 'column',
  },
  experienceItem: {
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderBottom: '1px solid #e0e0e0',
    width: '100%',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  experiencePeriod: {
    fontSize: 10,
    color: '#38383D',
    // marginBottom: 5,
  },
  projectShortDescription: {
    fontSize: 9,
    // marginBottom: 5,
  },
  projectDescription: {
    fontSize: 9,
    marginTop: -5,
    marginBottom: -5,
  },
  experienceSkills: {
    fontSize: 9,
    color: '#38383D',
  },
  projectUrl: {
    fontSize: 9,
    textDecoration: 'underline',
  },
  summarySection: {
    flexDirection: 'column',
    gap: 10,
  },
  summaryText: {
    fontSize: 10,
  },
})

export default function PdfDoc({ developer, skills, projects }) {
  return (
    <Document>
      <Page style={styles.page} size='A4'>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              alt={developer.name}
              style={styles.profileImage}
              src={urlFor(developer.image).width(250).height(250).url()}
            ></Image>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{developer.name}</Text>
              <Text style={styles.role}>{developer.role}</Text>
            </View>
          </View>
          <View style={styles.resumeSection}>
            <Image
              alt='Resume QR Code'
              style={styles.resumeImage}
              src={urlFor(developer.resumeQrcode).width(200).height(200).url()}
            ></Image>
            <Text style={styles.resumeLabel}>Online version</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sidebar}>
            <View style={styles.contactSection}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  // alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  alt='Portfolio QR Code'
                  style={styles.resumeImage}
                  src={urlFor(developer.homeQrcode)
                    .width(200)
                    .height(200)
                    .url()}
                ></Image>
                <Text style={styles.resumeLabel}>www.wildredbeard.tech</Text>
              </View>
              <Text style={styles.sectionTitle}>Contact</Text>
              {developer.social?.map((social) => (
                <View style={styles.contactItem} key={social.platform}>
                  <Image
                    alt={social.platform}
                    style={styles.contactIcon}
                    src={urlFor(social.icon).width(150).height(150).url()}
                  ></Image>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 5,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text style={styles.contactText}>{social.platform}</Text>
                    <Text style={styles.contactValue}>
                      {(social.href || social.url).replace('mailto:', '')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills
                .sort((a, b) => b.expertise - a.expertise)
                .map((skill) => (
                  <View style={styles.skillItem} key={skill._id}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <StarRating rating={skill.expertise}></StarRating>
                  </View>
                ))}
            </View>
          </View>

          <View style={styles.contentSection}>
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Summary</Text>
              {developer.bio.map((section) =>
                section.children.map((s) => (
                  <Text style={styles.summaryText} key={s._key}>
                    {s.text}
                  </Text>
                ))
              )}
            </View>

            <View style={styles.experienceSection}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    paddingBottom: 10,
                  },
                ]}
              >
                Experience
              </Text>
              {projects.map((project, i) => (
                <View
                  wrap={false}
                  style={[
                    styles.experienceItem,
                    i === 0 ? { paddingTop: 0 } : { paddingTop: 15 },
                  ]}
                  key={project._id}
                >
                  <Text style={styles.experienceTitle}>
                    {project.role} at {project.company.name}
                  </Text>
                  {/* <Text style={styles.experienceDescription}> */}
                  {/*   {project.shortDescription} */}
                  {/* </Text> */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text style={styles.experiencePeriod}>
                      {formatDate(project.start)}
                      {project.end
                        ? ` - ${formatDate(project.end)}`
                        : ' - Ongoing'}
                    </Text>
                  </View>
                  <Text style={styles.projectShortDescription}>
                    {project.resumeSummary}
                  </Text>

                  {project.resumeDescription?.length > 0 ? (
                    <Html style={styles.projectDescription}>
                      {`<ul>
                        ${project.resumeDescription
                          .map((d) => `<li>${d}</li>`)
                          .join('')}
                      </ul>`}
                    </Html>
                  ) : (
                    <Html style={styles.projectDescription}>
                      {`<ul>
                        ${project.description
                          .map((d) =>
                            d.children.map((c) => `<li>${c.text}</li>`)
                          )
                          .join('')}
                      </ul>`}
                    </Html>
                  )}

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 4,
                    }}
                  >
                    <Text style={styles.experienceSkills}>Skills:</Text>
                    <Text style={styles.experienceSkills}>
                      {project.skills.map((s) => s.name).join(', ')}
                    </Text>
                  </View>
                  <Text style={styles.projectUrl}>{project.url}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
