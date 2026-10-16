import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-950" aria-labelledby="services-title">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x section-y relative">
        <div id="services-title">
          <SectionHeading
            number="02"
            label="Core services"
            title={
              <>
                Five disciplines. <span className="text-copper-500">One accountable partner.</span>
              </>
            }
            intro="From civil works to general supply, Tloukgomo has the capacity to deliver the services below to mining, government and private-sector clients."
          />
        </div>

        <div className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            // 3 on top row, 2 wide cards below
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
            return (
              <Reveal as="article" key={s.id} delay={(i % 3) * 0.08} className={span}>
                <motion.a
                  href="#contact"
                  data-service={s.formValue}
                  onClick={() => window.dispatchEvent(new CustomEvent('select-service', { detail: s.formValue }))}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  aria-label={`${s.title} — enquire about this service`}
                  className="group relative flex h-full min-h-[460px] flex-col justify-end overflow-hidden bg-ink-800 shadow-card"
                >
                  <img
                    src={s.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/20 transition-colors duration-500 group-hover:from-ink-950/95" aria-hidden="true" />

                  <span className="absolute left-6 top-4 font-display text-[7rem] font-bold leading-none text-transparent transition-all duration-500 [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] group-hover:text-copper-500/90 group-hover:[-webkit-text-stroke:1px_transparent]">
                    {s.number}
                  </span>
                  <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center border border-white/25 bg-ink-950/40 backdrop-blur transition-colors duration-300 group-hover:border-copper-500 group-hover:bg-copper-500">
                    <s.icon className="h-5 w-5 text-white transition-colors group-hover:text-ink-950" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <div className="relative p-6 sm:p-8">
                    <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-wide text-white sm:text-4xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-concrete-300">{s.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-wider2 text-concrete-400">
                      {s.scope.map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span className="h-1 w-1 bg-copper-500" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-wider2 text-white">
                      Explore Service
                      <ArrowRight className="h-4 w-4 text-copper-400 transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-copper-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                  </div>
                </motion.a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
