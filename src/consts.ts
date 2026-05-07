export const site = {
  name: 'Soap Editing',
  tagline: 'Video Editor / Motion Designer / Sound Designer',
  email: 'anthony.vuillerot@gmail.com',
  socials: {
    instagram: 'https://instagram.com/soap731',
    linkedin: 'https://www.linkedin.com/in/anthony-vuillerot/',
  },
} as const;

export const about = {
  intro:
    "L'art de raconter des histoires par le montage. Mon approche combine storytelling, motion design et sound design pour transformer vos idées en vidéos percutantes, au rendu professionnel et mémorable.",
  stack: [
    'Adobe Premiere Pro',
    'DaVinci Resolve',
    'After Effects',
  ],
  clients: ['VZION', 'McSkyz', 'PROFESSION GANGSTER', 'WhenToCop?'],
} as const;

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'court-metrage', label: 'Courts-Métrages' },
  { id: 'reseaux-sociaux', label: 'Réseaux Sociaux' },
] as const;
