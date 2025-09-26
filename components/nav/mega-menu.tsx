'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// tiny helper so we don't rely on any utils lib
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Navigation data: matches the routes we planned */
export const menu = {
  root: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Treatments', href: '/treatments', mega: true },
    {
      label: 'Fees & Plans',
      href: '/fees',
      subs: [
        { label: 'Fees', href: '/fees' },
        { label: 'Dental Plan', href: '/dental-plan' },
      ],
    },
    {
      label: 'Patient Info',
      href: '/patient-info',
      subs: [
        { label: 'Blog', href: '/patient-info/blog' },
        { label: 'Newsletter', href: '/patient-info/newsletter' },
        { label: 'Leaflets', href: '/patient-info/leaflets' },
        { label: 'Patient Stories', href: '/patient-info/stories' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ],
  treatments: [
    {
      label: 'General Dentistry',
      items: [
        { label: 'Check-ups', href: '/treatments/general/check-ups' },
        { label: 'Tooth-coloured Fillings', href: '/treatments/general/tooth-coloured-fillings' },
        { label: 'Crowns & Bridges', href: '/treatments/general/crowns-and-bridges' },
        { label: 'Extractions', href: '/treatments/general/extractions' },
        { label: 'Root Canal Treatment', href: '/treatments/general/root-canal-treatment' },
        { label: 'Children’s Dentistry', href: '/treatments/general/childrens-dentistry' },
        { label: 'Sedation', href: '/treatments/general/sedation' },
        { label: 'Emergency Dentistry', href: '/treatments/general/emergency-dentistry' },
      ],
    },
    {
      label: 'Cosmetic Dentistry',
      items: [
        { label: 'Veneers', href: '/treatments/cosmetic/veneers' },
        { label: 'Teeth Whitening', href: '/treatments/cosmetic/teeth-whitening' },
        { label: 'Composite Bonding', href: '/treatments/cosmetic/composite-bonding' },
      ],
    },
    {
      label: '3D Dentistry',
      items: [
        { label: '3D Printed Veneers', href: '/treatments/3d-dentistry/3d-printed-veneers' },
        { label: '3D Same-Day Dentures', href: '/treatments/3d-dentistry/3d-same-day-dentures' },
        { label: '3D Restorative Dentistry', href: '/treatments/3d-dentistry/3d-restorative-dentistry' },
        { label: '3D Implants Overview', href: '/treatments/3d-dentistry/3d-implants-overview' },
      ],
    },
    {
      label: 'Orthodontics',
      items: [
        { label: 'Spark Aligners', href: '/treatments/orthodontics/spark-aligners' },
        { label: 'Fixed Braces', href: '/treatments/orthodontics/fixed-braces' },
      ],
    },
    {
      label: 'Implants',
      items: [
        { label: 'Implants (Overview)', href: '/treatments/implants' },
        { label: '3D Surgically-Guided', href: '/treatments/implants/3d-surgically-guided-implants' },
        { label: 'Same-day Implants', href: '/treatments/implants/same-day-implants' },
        { label: '3D Printed Restorations', href: '/treatments/implants/3d-printed-restorations' },
        { label: 'All-on-4/6 Same Day', href: '/treatments/implants/all-on-4-6-same-day' },
      ],
    },
    {
      label: 'Technology',
      items: [
        { label: 'Soft Tissue Laser', href: '/treatments/technology/soft-tissue-laser' },
        { label: '3D Scanning & Printing', href: '/treatments/technology/3d-scanning-and-printing' },
        { label: 'The Wand — Painless Numbing', href: '/treatments/technology/the-wand-painless-numbing' },
      ],
    },
  ],
} as const;

export default function MegaMenu() {
  const pathname = usePathname();

  return (
    <nav className="relative z-50">
      <ul className="hidden md:flex items-center gap-6">
        {menu.root.map((item) => (
          <li key={item.label} className="group relative">
            <Link
              href={item.href}
              className={cx(
                'px-2 py-1 rounded-md transition',
                pathname?.startsWith(item.href)
                  ? 'text-teal-500'
                  : 'text-foreground hover:text-teal-600'
              )}
            >
              {item.label}
            </Link>

            {/* Simple dropdowns */}
            {item.subs && (
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition
                              absolute left-0 mt-2 w-56 rounded-xl bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 p-3">
                <ul className="space-y-1">
                  {item.subs.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="block px-3 py-2 rounded-md hover:bg-slate-100">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mega menu for Treatments */}
            {item.mega && (
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition
                              absolute left-0 mt-2 w-[min(92vw,1100px)] rounded-2xl bg-white/90 backdrop-blur-md
                              shadow-2xl border border-slate-200 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {menu.treatments.map((col) => (
                    <div key={col.label}>
                      <div className="mb-2 text-sm font-semibold text-slate-900">{col.label}</div>
                      <ul className="space-y-1">
                        {col.items.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block text-sm text-slate-600 hover:text-teal-600"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile fallback */}
      <details className="md:hidden">
        <summary className="cursor-pointer px-3 py-2 rounded-md border border-slate-200 bg-white">
          Menu
        </summary>
        <div className="mt-2 p-3 rounded-xl border border-slate-200 bg-white">
          <ul className="space-y-2">
            {menu.root.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="block py-1">
                  {item.label}
                </Link>
                {item.mega && (
                  <ul className="ml-3 mt-1 space-y-1">
                    {menu.treatments.flatMap((col) =>
                      col.items.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="block text-sm text-slate-600">
                            {link.label}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                )}
                {item.subs && (
                  <ul className="ml-3 mt-1 space-y-1">
                    {item.subs.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="block text-sm text-slate-600">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </details>
    </nav>
  );
}
