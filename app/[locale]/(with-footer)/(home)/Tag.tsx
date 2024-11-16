'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TagItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[38px] items-center justify-center gap-[2px] whitespace-nowrap rounded-lg bg-gray-100 px-3 text-xs text-link-color'>
      {children}
    </div>
  );
}

export function TagLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} title={name}>
      <TagItem>{name}</TagItem>
    </Link>
  );
}

export function TagList({ data }: { data: { name: string; href: string; id: string }[] }) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
    }
    return () => container?.removeEventListener('scroll', checkScroll);
  }, []);
  return (
    <div className='relative'>
      {showLeftArrow && (
        <button
          type='button'
          aria-label='Left Arrow'
          className='absolute left-0 top-1/2 z-10 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center border border-maomaoyu-orange bg-gray-200 text-maomaoyu-orange'
          onClick={() => scroll('left')}
        >
          <ChevronLeft className='h-4 w-4' />
        </button>
      )}
      <ul ref={scrollContainerRef} className='no-scrollbar flex max-w-full flex-1 items-center gap-3 overflow-x-auto'>
        {data.map((item) => (
          <li key={item.href}>
            <TagLink name={item.name} href={item.href} />
          </li>
        ))}
      </ul>

      {showRightArrow && (
        <button
          type='button'
          aria-label='Right Arrow'
          className='absolute right-0 top-1/2 z-10 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center border border-maomaoyu-orange bg-gray-200 text-maomaoyu-orange'
          onClick={() => scroll('right')}
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}
