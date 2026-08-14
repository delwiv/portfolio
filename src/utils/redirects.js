// Redirects d'anciens slugs d'articles vers les nouveaux (301).
// Ancien slug -> nouveau slug (sans locale ; le proxy reconstruit le chemin).
// Ajouter ici toute future migration de slug.
export const SLUG_REDIRECTS = {
  'my-local-ai-stack': 'local-ai-tools',
  'stack-ia-locale': 'outils-ia-en-local',
  'docker-ai-stack': 'ai-coding-essentials',
  'stack-ia-docker': 'essentiels-ia-pour-le-code',
}
