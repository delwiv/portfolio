import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { pageType } from './pageType'
import { richTextType } from './richTextType'
import { richImageType } from './richImageType'
import { settingsType } from './settingsType'
import { skillType } from './skillType'
import { companyType } from './companyType'
import { projectType } from './projectType'
import { projectGrid } from './projectsGrid'
import { skills } from './skills'
import { developerType } from './developerType'
import { socialType } from './socialType'
import { bio } from './bio'
import { postsGrid } from './postsGrid'
import { seoType } from './seoType'

export const schema = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    richTextType,
    richImageType,
    settingsType,
    skillType,
    companyType,
    projectType,
    projectGrid,
    skills,
    developerType,
    socialType,
    bio,
    postsGrid,
    seoType,
  ],
}
