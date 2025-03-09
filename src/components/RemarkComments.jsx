'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const insertScript = (id, config, parentElement) => {
  const script = window.document.createElement('script')

  script.type = 'text/javascript'
  script.async = true
  script.id = id

  let url = window.location.origin + window.location.pathname
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }

  script.innerHTML = `
    var remark_config = {
      host: "${config.remarkUrl}",
      site_id: "${config.remarkSite}",
      url: "${url}",
      theme: "dark",
      components: ["embed", "last-comments", "counter"],
      no_footer: true
    };
    !function(e,n) {
      for(var o=0;o<e.length;o++) {
        var r=n.createElement("script"),
          c=".js",
          d=n.head||n.body;
        "noModule"in r?(r.type="module",c=".mjs"):r.async=!0,
        r.defer=!0,
        r.src=remark_config.host+"/web/"+e[o]+c,
        d.appendChild(r)
      }
    }(remark_config.components||["embed"],document);
  `
  parentElement.appendChild(script)
}

const removeScript = (id, parentElement) => {
  const script = window.document.getElementById(id)
  if (script) {
    parentElement.removeChild(script)
  }
}

const manageScript = ({ remarkUrl, remarkSite }) => {
  if (!window) {
    return
  }
  const document = window.document
  if (document.getElementById('remark42')) {
    insertScript('comments-script', { remarkUrl, remarkSite }, document.body)
  }
  return () => removeScript('comments-script', document.body)
}

const recreateRemark42Instance = () => {
  if (!window) {
    return
  }
  const remark42 = window.REMARK42
  if (remark42) {
    remark42.destroy()
    remark42.createInstance(window.remark_config)
  }
}

export default function RemarkComments({ remarkUrl, remarkSite }) {
  const location = usePathname()
  useEffect(
    () => manageScript({ remarkUrl, remarkSite }),
    [location, remarkSite, remarkUrl]
  )
  useEffect(recreateRemark42Instance, [location])

  return (
    <>
      <h2>Comments</h2>
      <div id='remark42'></div>
    </>
  )
}
