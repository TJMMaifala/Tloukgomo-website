import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { company } from '../data/company'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Body scroll is locked while the menu is open, so close first, then scroll.
  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', href)
    }, 60)
  }

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink-950/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-3" aria-label={`${company.shortName} — home`} onClick={() => setOpen(false)}>
          <span className="h-9 w-1 bg-copper-500 transition-all duration-300 group-hover:h-10" aria-hidden="true" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[26px] font-bold tracking-[0.12em] text-white">TLOUKGOMO</span>
            <span className="mt-1 font-display text-[10px] font-semibold tracking-[0.34em] text-copper-400">TRADING &amp; PROJECTS</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'page' : undefined}
                className={`relative py-2 font-display text-[15px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-white ${
                  active === l.href ? 'text-white' : 'text-concrete-300'
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-copper-500 transition-all duration-300 ${active === l.href ? 'w-full' : 'w-0'}`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a href="#contact" className="btn-primary hidden !min-h-[42px] !px-5 !text-[13px] lg:inline-flex">
            Request a Quote
          </a>
          <button
            type="button"
            className="relative z-[70] flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <motion.span
                className="absolute left-0 top-0 block h-[2px] w-6 bg-white"
                animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-[7px] block h-[2px] w-6 bg-copper-400"
                animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[14px] block h-[2px] w-6 bg-white"
                animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </button>
        </div>
      </nav>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-[65] flex flex-col overflow-y-auto bg-ink-950 px-6 pb-10 pt-8 lg:hidden"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <ul className="relative flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/10"
                >
                  <a
                    href={l.href}
                    onClick={goTo(l.href)}
                    className="flex items-baseline gap-4 py-5 font-display text-4xl font-bold uppercase tracking-wide text-white"
                  >
                    <span className="text-sm font-semibold text-copper-500">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-10 flex flex-col gap-3">
              <a href="#contact" onClick={goTo('#contact')} className="btn-primary">
                Request a Quote
              </a>
              <a href={company.mobileHref} className="btn-ghost">
                Call {company.mobile}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
