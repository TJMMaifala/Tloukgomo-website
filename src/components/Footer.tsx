import { ArrowUp, Mail, MapPin, Phone, PhoneCall } from 'lucide-react'
import { company } from '../data/company'
import { services } from '../data/services'
import { siteImages } from '../data/images'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950" aria-label="Site footer">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="h-12 w-1 bg-copper-500" aria-hidden="true" />
              <div className="leading-none">
                <p className="font-display text-4xl font-bold tracking-[0.12em] text-white">TLOUKGOMO</p>
                <p className="mt-1.5 font-display text-xs font-semibold tracking-[0.34em] text-copper-400">TRADING &amp; PROJECTS</p>
              </div>
            </div>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-concrete-300">{company.tagline}</p>
            <div className="mt-8 inline-flex items-center gap-4 border border-white/15 p-3 pr-5">
              <img src={siteImages.logo} alt="Tloukgomo company logo" width={72} height={51} loading="lazy" className="h-[51px] w-[72px] bg-white object-contain" />
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-wider2 text-white">{company.bbbee} B-BBEE</p>
                <p className="text-xs text-concrete-400">Reg. No. {company.registrationNumber}</p>
              </div>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider3 text-copper-400">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-concrete-300 transition-colors hover:text-white">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider3 text-copper-400">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#contact"
                    onClick={() => window.dispatchEvent(new CustomEvent('select-service', { detail: s.formValue }))}
                    className="text-concrete-300 transition-colors hover:text-white"
                  >
                    {s.formValue === 'Structural Steel Works & Erection' ? 'Structural Steel' : s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider3 text-copper-400">Contact</h2>
            <ul className="mt-5 space-y-4 text-concrete-300">
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-copper-500" aria-hidden="true" /><a className="hover:text-white" href={company.mobileHref}>{company.mobile}</a></li>
              <li className="flex gap-3"><PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-copper-500" aria-hidden="true" /><a className="hover:text-white" href={company.telHref}>{company.tel}</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-copper-500" aria-hidden="true" /><a className="break-all hover:text-white" href={`mailto:${company.email}`}>{company.email}</a></li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper-500" aria-hidden="true" />
                <a className="hover:text-white" href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {company.address.street}, {company.address.city}, {company.address.postalCode}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 text-sm text-concrete-400 sm:flex-row sm:items-center">
          <p>© 2026 {company.legalName}. All Rights Reserved.</p>
          <a href="#home" className="group inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider2 text-concrete-300 hover:text-white" aria-label="Back to top">
            Back to top <ArrowUp className="h-4 w-4 text-copper-400 transition-transform group-hover:-translate-y-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
