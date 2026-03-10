// src/components/ScrollRow.tsx
'use client';

// ═══════════════════════════════════════════════════════════════
// APPLE'S SCROLL ROW — reverse-engineered from apple.com source
//
// Architecture (matches Apple exactly):
//
// <div>                          ← scroll viewport (overflow-x-auto)
//   <ul>                         ← flex list (margin-inline-start for alignment)
//     <li>Card 1</li>            ← list items (snap-start, shrink-0)
//     <li>Card 2</li>
//   </ul>
// </div>
// <nav>                          ← arrows (inside constrained wrapper)
//   <button>←</button>
//   <button>→</button>
// </nav>
//
// KEY DECISIONS (from Apple's implementation):
// 1. Scroll viewport has NO padding. Zero. Just overflow-x-auto.
// 2. The <ul> has margin-inline-start: var(--section-padding).
//    This is what aligns the first card with the header above.
//    margin (not padding) on the flex child = reliable across browsers.
// 3. The <ul> has aria-labelledby pointing to the section heading.
// 4. Nav arrows are a SIBLING of the scroll viewport, not inside it.
// 5. Nav arrows wrapper uses the constrained max-width class.
// 6. Each <li> has tabindex="-1" (focusable via JS, not via Tab).
//
// This component is GENERIC — it knows nothing about services.
// Reuse it for testimonials, blog posts, team members, anything.
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useCallback, Children, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ScrollRowProps = {
  children: ReactNode;
  labelledBy?: string;
};

export function ScrollRow({ children, labelledBy }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const list = listRef.current;
    const viewport = scrollRef.current;
    if (!list || !viewport) return;

    // Get all li elements (the snap targets)
    const items = Array.from(list.querySelectorAll(':scope > li'));
    const viewportLeft = viewport.scrollLeft;

    let target: Element | null = null;

    if (direction === 'right') {
      // Find the first li whose left edge is past the current viewport
      target =
        items.find((item) => {
          const itemLeft = (item as HTMLElement).offsetLeft - list.offsetLeft;
          return itemLeft > viewportLeft + 10;
        }) || null;
    } else {
      // Find the last li whose left edge is before the current viewport left
      for (let i = items.length - 1; i >= 0; i--) {
        const itemLeft = (items[i] as HTMLElement).offsetLeft - list.offsetLeft;
        if (itemLeft < viewportLeft - 10) {
          target = items[i];
          break;
        }
      }
    }

    if (target) {
      // scrollIntoView with inline: 'start' respects snap points in Safari
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }

    setTimeout(checkScroll, 400);
  };

  return (
    <>
      {/* ── Scroll Viewport ── */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{
          scrollPaddingInlineStart: 'var(--section-padding)',
        }}
      >
        {/* ── Card List ── */}
        <ul
          ref={listRef}
          role="list"
          aria-labelledby={labelledBy}
          className="flex gap-4 list-none m-0 p-0 w-fit"
          style={{
            marginInlineStart: 'var(--section-padding)',
            marginInlineEnd: 'var(--section-padding)',
          }}
        >
          {Children.map(children, (child) => (
            <li
              role="listitem"
              tabIndex={-1}
              className="snap-start snap-always shrink-0 flex"
            >
              {child}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Navigation Arrows ── */}
      <nav
        className="max-w-7xl mx-auto px-5 flex justify-end gap-2 mt-5"
        aria-label="Navigazione galleria servizi"
      >
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Elemento precedente"
          className="
            w-9 h-9 rounded-full border border-border
            flex items-center justify-center
            text-foreground
            disabled:opacity-30 disabled:cursor-default
            hover:enabled:bg-black/[0.04]
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Elemento successivo"
          className="
            w-9 h-9 rounded-full border border-border
            flex items-center justify-center
            text-foreground
            disabled:opacity-30 disabled:cursor-default
            hover:enabled:bg-black/[0.04]
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
      </nav>
    </>
  );
}
