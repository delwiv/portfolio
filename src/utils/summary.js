export const getHeadingId = (children) => children.map((c) => CSS.escape(c))

export const extractSummary = (post) =>
  [{ style: 'h1', children: [{ text: post.title }] }].concat(
    post.body.filter((element) => element.style?.match(/^h[\d]$/))
  )
