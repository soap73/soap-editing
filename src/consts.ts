export const site = {
  name: 'Soap Edit',
  tagline: 'Video Editor / Motion Designer / Sound Designer',
  email: 'anthony.vuillerot@gmail.com',
  socials: {
    instagram: 'https://instagram.com/soap731',
    linkedin: 'https://www.linkedin.com/in/anthony-vuillerot/',
  },
} as const;

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'court-metrage', label: 'Courts-Métrages' },
  { id: 'reseaux-sociaux', label: 'Réseaux Sociaux' },
] as const;
