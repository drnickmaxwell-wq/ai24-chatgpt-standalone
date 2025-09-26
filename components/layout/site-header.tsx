'use client';

import Link from 'next/link';
import MegaMenu from '@/components/nav/mega-menu';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-slate-200">
      <div className="mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-foreground">
            St Mary’s House Dental Care
          </span>
        </Link>
        <MegaMenu />
      </div>
    </header>
  );
}
