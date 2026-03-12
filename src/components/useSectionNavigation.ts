'use client';

import { useEffect, useState, type MouseEvent } from 'react';

export type SectionNavItem = {
  slug: string;
  title: string;
};

function getActiveSlug() {
  return window.location.hash.replace(/^#/, '');
}

export function useSectionNavigation() {
  const [activeSlug, setActiveSlug] = useState('');

  useEffect(() => {
    function syncActiveSlug() {
      setActiveSlug(getActiveSlug());
    }

    syncActiveSlug();
    window.addEventListener('hashchange', syncActiveSlug);

    return () => window.removeEventListener('hashchange', syncActiveSlug);
  }, []);

  function handleAnchorClick(
    event: MouseEvent<HTMLAnchorElement>,
    slug: string
  ) {
    event.preventDefault();

    const target = document.getElementById(slug);
    if (!target) return;

    setActiveSlug(slug);
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.history.pushState(null, '', `#${slug}`);
  }

  return {
    activeSlug,
    handleAnchorClick,
  };
}
