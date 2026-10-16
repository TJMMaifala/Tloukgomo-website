import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { industries } from '../data/industries'

export default function Industries() {
  return (
    <section id="industries" className="relative bg-ink-950" aria-labelledby="industries-title">
      <div className="container-x section-y">
        <div id="industries-title">
          <SectionHeading
            number="04"
            label="Target markets"
            title={
              <>
                Built for the industries that move <span className="text-copper-500">South Africa forward.</span>
              </>
            }
          />
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 sm:mt-20 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.id} delay={(i % 3) * 0.08}>
              <motion.article
                tabIndex={0}
                whileHover="hover"
                whileFocus="hover"
                initial="rest"
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-ink-800 outline-none focus-visible:ring-2 focus-visible:ring-copper-400 sm:aspect-[4/4.4]"
                aria-label={`${ind.title}: ${ind.description}`}
              >
                <img
                  src={ind.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110 group-focus-visible:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30 transition-colors duration-500 group-hover:from-ink-950 group-hover:via-ink-950/85" aria-hidden="true" />
                <div className="absolute inset-3 border border-white/10 transition-colors duration-500 group-hover:border-copper-500/60" aria-hidden="true" />

                <ind.icon className="absolute right-7 top-7 h-6 w-6 text-white/70 transition-colors group-hover:text-copper-400" strokeWidth={1.5} aria-hidden="true" />
                <span className="absolute left-7 top-7 font-display text-sm font-semibold tracking-wider3 text-copper-400">0{i + 1}</span>

                <div className="relative p-7 sm:p-8">
                  <h3 className="font-display text-4xl font-bold leading-none tracking-wide text-white">{ind.label}</h3>
                  <p className="mt-1 text-sm text-concrete-400">{ind.title}</p>
                  {/* Description reveals on hover/focus; always visible on touch (no hover) */}
                  <div className="grid grid-rows-[1fr] transition-all duration-500 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-4 text-sm leading-relaxed text-concrete-200">{ind.description}</p>
                    </div>
                  </div>
                  <span className="mt-5 block h-[2px] w-10 bg-copper-500 transition-all duration-500 group-hover:w-24" aria-hidden="true" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
