import { Refractor, registerLanguage } from 'react-refractor'

import jsx from 'refractor/jsx'
import json from 'refractor/json'
import sh from 'refractor/shell-session'
import yaml from 'refractor/yaml'
import lua from 'refractor/lua'

registerLanguage(jsx)
registerLanguage(json)
registerLanguage(sh)
registerLanguage(yaml)
registerLanguage(lua)

export default function Code({ code, language = 'lua' }) {
  return (
    <Refractor
      className='pt-8 rounded-xl'
      language={language}
      value={code}
    ></Refractor>
  )
}
