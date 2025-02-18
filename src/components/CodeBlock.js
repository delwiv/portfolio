import { Refractor, registerLanguage } from 'react-refractor'

import jsx from 'refractor/lang/jsx'
import json from 'refractor/lang/json'

registerLanguage(jsx)
registerLanguage(json)

export default function CodeBlock({ code, language }) {
  return (
    <Refractor
      className='text-wrap'
      language={language}
      value={code}
    ></Refractor>
  )
}
