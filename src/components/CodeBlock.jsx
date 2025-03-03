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

export default function CodeBlock({ code, language = 'lua' }) {
  console.log({ language })
  return (
    <Refractor
      className='text-wrap overflow-x-hidden'
      language={language}
      value={code}
    ></Refractor>
  )
}
