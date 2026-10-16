import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { siteImages } from '../data/images'
import { company } from '../data/company'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const lines = ['Building the', 'infrastructure', 'of tomorrow.']

  return (
    <section id="home" ref={ref} className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-950" aria-label="Introduction">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20">
        <motion.img
          src={siteImages.hero}
          alt="Site crew fixing reinforcement steel for a concrete foundation at a mine"
          className="h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/25" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/85 via-ink-950/25 to-transparent" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <motion.div style={{ opacity: fade }} className="container-x pb-28 pt-40 sm:pb-36 lg:pb-40">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-copper-500 sm:w-16" aria-hidden="true" />
          <p className="font-display text-xs font-semibold uppercase tracking-wider3 text-copper-300 sm:text-sm">
            Rustenburg · South Africa<span className="hidden sm:inline"> · Level 1 B-BBEE</span>
          </p>
        </motion.div>

        <h1 className="display-xl mt-7 text-[2.5rem] text-white min-[360px]:text-[3rem] min-[400px]:text-[3.6rem] sm:text-[6rem] lg:text-[8.2rem] xl:text-[9rem]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 2 ? 'text-copper-500' : ''}`}
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.35 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-8 max-w-xl text-base leading-relaxed text-concrete-200 sm:text-lg"
        >
          Professional construction, civil works, structural steel, fencing and general supply solutions for South Africa&rsquo;s growing infrastructure and industrial sectors.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
          className="mt-10 flex flex-col gap-3 min-[480px]:flex-row"
        >
          <a href="#services" className="btn-primary group">
            View our services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a href="#contact" className="btn-ghost">
            Contact us
          </a>
        </motion.div>
      </motion.div>

      {/* Credentials strip */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-ink-950/60 backdrop-blur-md md:block">
        <div className="container-x flex items-center justify-between py-5">
          <dl className="flex gap-12">
            <div>
              <dt className="text-[11px] uppercase tracking-wider3 text-concrete-400">B-BBEE</dt>
              <dd className="font-display text-xl font-semibold tracking-wider text-white">{company.bbbee}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider3 text-concrete-400">Registration</dt>
              <dd className="font-display text-xl font-semibold tracking-wider text-white">{company.registrationNumber}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider3 text-concrete-400">Based in</dt>
              <dd className="font-display text-xl font-semibold tracking-wider text-white">{company.address.city}</dd>
            </div>
          </dl>
          <a href="#about" className="flex items-center gap-3 text-xs uppercase tracking-wider3 text-concrete-300 transition-colors hover:text-white" aria-label="Scroll to About section">
            Scroll
            <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="h-4 w-4 text-copper-400" aria-hidden="true" />
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  )
}
