export type Localized = { zh: string; en: string };
export type Link = { label: string; url: string };
export type Publication = {
  year: string;
  title: Localized;
  authors: string;
  venue: string;
  featured?: boolean;
  links?: Link[];
};
export type SiteContent = {
  profile: {
    name: Localized;
    role: Localized;
    affiliation: Localized;
    location: Localized;
    email: string;
    intro: Localized;
    interests: Localized[];
    portrait: string;
    links: Link[];
  };
  news: { date: string; text: Localized }[];
  publications: Publication[];
  projects: { period: string; title: Localized; description: Localized; url?: string }[];
  teaching: { term: string; title: Localized; role: Localized }[];
  education: { period: string; degree: Localized; institution: Localized }[];
};
