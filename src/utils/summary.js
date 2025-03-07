export const getHeadingId = (children) =>
  children.map((c) => encodeURIComponent(c))

export const extractSummary = (post) =>
  post.body.filter((element) => element.style?.match(/^h[\d]$/))
