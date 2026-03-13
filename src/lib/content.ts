import { aboutContent } from '@/lib/about';
import { servizi } from '@/lib/services';

export function getServices() {
  return servizi;
}

export function getServiceSlugs() {
  return servizi.map((service) => service.slug);
}

export function getServiceBySlug(slug: string) {
  return servizi.find((service) => service.slug === slug);
}

export function getAboutContent() {
  return aboutContent;
}

export function getHomeAboutTeaser() {
  return aboutContent.homeTeaser;
}

export function getAboutPageContent() {
  return aboutContent.page;
}
