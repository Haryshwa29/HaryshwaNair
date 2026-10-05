export type Resume = { url: string; filename: string };
export const profile: {
  name: string; fullName: string; email: string | null; resume: Resume | null;
  linkedin: string; github: string; portrait: { src: string; alt: string } | null;
} = {
  name: 'Haryshwa Nair',
  fullName: 'Thaithe Kalathil Haryshwa Nair',
  email: 'haryshwanair29@gmail.com',
  resume: { url: '/resume/Haryshwa-Nair-Resume.pdf', filename: 'Haryshwa-Nair-Resume.pdf' },
  portrait: { src: '/images/teal_suite.jpg', alt: 'Professional portrait of Thaithe Kalathil Haryshwa Nair' },
  linkedin: 'https://www.linkedin.com/in/thaithe-haryshwa-nair/',
  github: 'https://github.com/Haryshwa29',
};
