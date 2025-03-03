import { Refractor, registerLanguage } from 'react-refractor'

import jsx from 'refractor/lang/jsx'
import json from 'refractor/lang/json'
import sh from 'refractor/lang/shell-session'
import yaml from 'refractor/lang/yaml'
import lua from 'refractor/lang/lua'

registerLanguage(jsx)
registerLanguage(json)
registerLanguage(sh)
registerLanguage(yaml)
registerLanguage(lua)

export default function Code({ code, language = 'lua' }) {
  if (!language) {
    console.log('no language', { code })
    return 'no language'
  }
  return (
    <Refractor className='pt-8' language={language} value={code}></Refractor>
  )
}
