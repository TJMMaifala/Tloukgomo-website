import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { formatZAR, projectCategories, projects, type Project, type ServiceTag } from '../data/projects'

const pad = (n: number) => String(n).padStart(2, '0')
const FEATURED_ID = 14 // Wheel Washing Bay — opening feature

function clientLine(p: Project) {
  return p.location ? `${p.client}, ${p.location}` : p.client
}

/* ---------- Desktop gallery ---------- */
function DesktopGallery({ list }: { list: Project[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(() => Math.max(0, list.findIndex((p) => p.id === FEATURED_ID)))
  const [dir, setDir] = useState(1)
  const safeIndex = Math.min(index, list.length - 1)
  const project = list[safeIndex]

  const go = useCallback(
    (next: number) => {
      const target = (next + list.length) % list.length
      setDir(next > safeIndex ? 1 : -1)
      setIndex(target)
    },
    [list.length, safeIndex],
  )

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(safeIndex + 1)
    if (e.key === 'ArrowLeft') go(safeIndex - 1)
  }

  return (
    <div className="hidden lg:block" role="region" aria-roledescription="carousel" aria-label="Project gallery" onKeyDown={onKey}>
      <div className="grid grid-cols-12 gap-0 border border-white/10 bg-ink-900">
        {/* Image */}
        <div className="relative col-span-7 min-h-[600px] overflow-hidden bg-ink-800">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={project.id}
              custom={dir}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80, scale: 1.06 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={project.image} alt={project.imageAlt} className="h-full w-full object-cover" decoding="async" />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" aria-hidden="true" />
          <span className="pointer-events-none absolute left-8 top-6 font-display text-sm font-semibold uppercase tracking-wider3 text-white/80">
            {project.category}
          </span>
          <span
            key={'big' + project.id}
            className="pointer-events-none absolute bottom-3 left-7 font-display text-[9rem] font-bold leading-none text-white/15"
            aria-hidden="true"
          >
            {pad(project.id)}
          </span>
        </div>

        {/* Info */}
        <div className="col-span-5 flex flex-col justify-between p-10 xl:p-12">
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-sm font-semibold uppercase tracking-wider3 text-copper-400">Project {pad(project.id)}</p>
                <p className="mt-3 font-display text-3xl font-bold uppercase tracking-wide text-white">{project.client}</p>
                {project.location && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-concrete-400">
                    <MapPin className="h-4 w-4 text-copper-500" aria-hidden="true" />
                    {project.location}
                  </p>
                )}
                <div className="my-6 h-px w-full bg-white/10" aria-hidden="true" />
                <h3 className="font-display text-[2.4rem] font-semibold normal-case leading-[1.05] tracking-tight text-white xl:text-5xl">{project.title}</h3>

                <dl className="mt-10 grid grid-cols-2 gap-y-8">
                  <div>
                    <dt className="flex items-center gap-2 text-[11px] uppercase tracking-wider3 text-concrete-400">
                      <CalendarDays className="h-3.5 w-3.5 text-copper-500" aria-hidden="true" /> Year
                    </dt>
                    <dd className="mt-1 font-display text-4xl font-bold text-white">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-[11px] uppercase tracking-wider3 text-concrete-400">
                      <Clock className="h-3.5 w-3.5 text-copper-500" aria-hidden="true" /> {project.status ? 'Status' : 'Duration'}
                    </dt>
                    <dd className="mt-1 font-display text-4xl font-bold uppercase text-white">{project.duration}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[11px] uppercase tracking-wider3 text-concrete-400">Contract value</dt>
                    <dd className="mt-1 font-display text-6xl font-bold text-copper-500 xl:text-7xl">{formatZAR(project.value)}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
            <p className="font-display text-2xl font-semibold tracking-wider text-white" aria-label={`Project ${safeIndex + 1} of ${list.length}`}>
              {pad(safeIndex + 1)} <span className="text-concrete-500">/ {pad(list.length)}</span>
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(safeIndex - 1)} className="group flex h-12 items-center gap-2 border border-white/20 px-4 font-display text-sm font-semibold uppercase tracking-wider2 text-white transition-colors hover:border-copper-500 hover:bg-copper-500 hover:text-ink-950" aria-label="Previous project">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Previous
              </button>
              <button type="button" onClick={() => go(safeIndex + 1)} className="group flex h-12 items-center gap-2 bg-copper-500 px-4 font-display text-sm font-semibold uppercase tracking-wider2 text-ink-950 transition-colors hover:bg-copper-400" aria-label="Next project">
                Next <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <ul className="mt-3 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(list.length, 8)}, minmax(0, 1fr))` }}>
        {list.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`Show project ${pad(p.id)}: ${p.title}`}
              aria-current={i === safeIndex}
              className={`group relative block aspect-[4/3] w-full overflow-hidden bg-ink-800 transition-opacity ${i === safeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-90'}`}
            >
              <img src={p.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className={`absolute inset-x-0 bottom-0 h-[3px] bg-copper-500 transition-transform duration-500 ${i === safeIndex ? 'scale-x-100' : 'scale-x-0'} origin-left`} aria-hidden="true" />
              <span className="absolute left-2 top-1 font-display text-sm font-bold text-white drop-shadow">{pad(p.id)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Mobile / tablet swipe carousel ---------- */
function MobileCarousel({ list }: { list: Project[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const first = track.children[0] as HTMLElement | undefined
        if (!first) return
        const step = first.offsetWidth + 16
        setActive(Math.min(list.length - 1, Math.max(0, Math.round(track.scrollLeft / step))))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [list.length])

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 })
    setActive(0)
  }, [list])

  const scrollToIndex = (i: number) => {
    const track = trackRef.current
    const el = track?.children[i] as HTMLElement | undefined
    if (track && el) track.scrollTo({ left: el.offsetLeft - track.offsetLeft - 20, behavior: 'smooth' })
  }

  return (
    <div className="lg:hidden" role="region" aria-roledescription="carousel" aria-label="Project carousel">
      <ul ref={trackRef} className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8" style={{ scrollPaddingLeft: 20 }}>
        {list.map((p) => (
          <li key={p.id} className="w-[84%] shrink-0 snap-start sm:w-[62%]">
            <article className="flex h-full flex-col border border-white/10 bg-ink-900">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                <img src={p.image} alt={p.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-2 left-4 font-display text-6xl font-bold leading-none text-white/25" aria-hidden="true">{pad(p.id)}</span>
                <span className="absolute right-3 top-3 bg-ink-950/70 px-2 py-1 font-display text-[11px] font-semibold uppercase tracking-wider2 text-white backdrop-blur">{p.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-display text-xs font-semibold uppercase tracking-wider3 text-copper-400">Project {pad(p.id)}</p>
                <p className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-white">{clientLine(p)}</p>
                <h3 className="mt-2 font-display text-[1.7rem] font-semibold normal-case leading-tight text-white">{p.title}</h3>
                <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider2 text-concrete-400">Year</dt>
                    <dd className="font-display text-xl font-bold text-white">{p.year}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider2 text-concrete-400">{p.status ? 'Status' : 'Duration'}</dt>
                    <dd className="font-display text-xl font-bold uppercase leading-tight text-white">{p.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider2 text-concrete-400">Value</dt>
                    <dd className="font-display text-xl font-bold leading-tight text-copper-500">{formatZAR(p.value)}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between">
        <p className="font-display text-xl font-semibold tracking-wider text-white" aria-live="polite">
          {pad(active + 1)} <span className="text-concrete-500">/ {pad(list.length)}</span>
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollToIndex(Math.max(0, active - 1))} className="flex h-11 w-11 items-center justify-center border border-white/20 text-white active:bg-copper-500" aria-label="Previous project">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollToIndex(Math.min(list.length - 1, active + 1))} className="flex h-11 w-11 items-center justify-center bg-copper-500 text-ink-950" aria-label="Next project">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [category, setCategory] = useState<'All' | ServiceTag>('All')
  const list = useMemo(() => (category === 'All' ? projects : projects.filter((p) => p.category === category)), [category])

  return (
    <section id="projects" className="relative bg-ink-900" aria-labelledby="projects-title">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x section-y relative">
        <div id="projects-title">
          <SectionHeading
            number="03"
            label="Referenced projects"
            title={<>Project <span className="text-copper-500">experience</span></>}
            intro="Experience built through years of delivering construction and infrastructure solutions."
          />
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects by discipline">
            {projectCategories.map((c) => {
              const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
              const on = c === category
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(c)}
                  className={`min-h-[44px] border px-4 font-display text-sm font-semibold uppercase tracking-wider2 transition-colors ${
                    on ? 'border-copper-500 bg-copper-500 text-ink-950' : 'border-white/20 text-concrete-300 hover:border-copper-400 hover:text-white'
                  }`}
                >
                  {c} <span className={on ? 'text-ink-950/70' : 'text-concrete-500'}>({count})</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-8">
          {/* key resets gallery state when the filter changes */}
          <DesktopGallery key={category} list={list} />
          <MobileCarousel list={list} />
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-concrete-500">
          Project values reflect contract amounts as stated in the Tloukgomo company profile. Photographs are from Tloukgomo project records.
        </p>
      </div>
    </section>
  )
}
