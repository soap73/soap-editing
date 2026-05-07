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
    "Monteur vidéo et motion designer freelance basé à Paris. Je transforme vos rushes en récits visuels percutants — du montage narratif au sound design, chaque projet est traité avec une direction artistique soignée.",
  stack: [
    'Adobe Premiere Pro',
    'DaVinci Resolve',
    'After Effects',
    'Cinema 4D',
    'Pro Tools',
  ],
  clients: ['Nike', 'LVMH', 'Arte', 'BMW', 'Deezer'],
} as const;

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'court-metrage', label: 'Courts-Métrages' },
  { id: 'reseaux-sociaux', label: 'Réseaux Sociaux' },
] as const;
