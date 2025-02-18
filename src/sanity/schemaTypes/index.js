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
  ],
}
