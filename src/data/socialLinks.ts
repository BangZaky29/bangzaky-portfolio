/**
 * Social & Contact Links
 * Centralized source of truth for all contact information
 */

export interface SocialLink {
  id: string;
  label: string;
  displayText: string;
  url: string;
  type: 'link' | 'phone' | 'email';
}

export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    label: 'email',
    displayText: 'bangzaky0029@gmail.com',
    url: 'mailto:bangzaky0029@gmail.com',
    type: 'email',
  },
  {
    id: 'github-1',
    label: 'github_1',
    displayText: '/BangZaky29',
    url: 'https://github.com/BangZaky29',
    type: 'link',
  },
  {
    id: 'github-2',
    label: 'github_2',
    displayText: '/BangZaky0029',
    url: 'https://github.com/BangZaky0029',
    type: 'link',
  },
  {
    id: 'linkedin',
    label: 'linkedin',
    displayText: '/in/zaky-aulia-qolbi',
    url: 'https://www.linkedin.com/in/zaky-aulia-qolbi-90647a395/',
    type: 'link',
  },
  {
    id: 'instagram',
    label: 'instagram',
    displayText: '@zaky_aulia_qolbi29',
    url: 'https://www.instagram.com/zaky_aulia_qolbi29?igsh=MWNqdzN4aGpoNXJ3Zg==',
    type: 'link',
  },
  {
    id: 'whatsapp',
    label: 'whatsapp',
    displayText: '+62 819-9577-0190',
    url: 'https://wa.me/6281995770190',
    type: 'phone',
  },
];
