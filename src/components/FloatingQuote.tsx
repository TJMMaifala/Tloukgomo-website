import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/** Mobile-only floating CTA: appears after the hero, hides once the contact section is on screen. */
export default function FloatingQuote() {
  const [pastHero, setPastHero] = useState(false)
  const [atContact, setAtContact] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const contact = document.getElementById('contact')
    let obs: IntersectionObserver | undefined
    if (contact) {
      obs = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.1 })
      obs.observe(contact)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs?.disconnect()
    }
  }, [])

  const show = pastHero && !atContact

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 flex min-h-[52px] items-center justify-center gap-2 bg-copper-500 font-display text-base font-bold uppercase tracking-[0.16em] text-ink-950 shadow-[0_14px_40px_-8px_rgba(224,112,42,.55)] lg:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
