import { useCountUp } from '../hooks/useCountUp'
import Reveal from './Reveal'
import { siteImages } from '../data/images'

function Counter({ to, suffix = '', plain = false }: { to: number; suffix?: string; plain?: boolean }) {
  const { ref, value } = useCountUp(to)
  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      {plain ? value : value.toLocaleString('en-ZA')}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const stats = [
    { big: <Counter to={2013} plain />, label: 'Year of registration', note: 'Registered with the CIPC' },
    { big: <Counter to={16} suffix="+" />, label: 'Referenced projects', note: 'Documented in our profile' },
    { big: <span>LEVEL 1</span>, label: 'B-BBEE status', note: 'Broad-Based Black Economic Empowerment' },
    { big: <Counter to={6} />, label: 'Core target markets', note: 'Mining to academic institutions' },
  ]

  return (
    <section className="grain relative overflow-hidden bg-copper-600" aria-label="Company facts">
      <img src={siteImages.contact} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply" aria-hidden="true" />
      <div className="container-x relative py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={`flex flex-col-reverse justify-end px-2 sm:px-6 ${i > 0 ? 'lg:border-l lg:border-ink-950/25' : ''} ${i % 2 === 1 ? 'border-l border-ink-950/25' : ''}`}>
              <dt className="mt-3 font-display text-sm font-semibold uppercase tracking-wider3 text-ink-950">
                {s.label}
                <span className="mt-1 hidden text-sm font-normal normal-case tracking-normal text-ink-950/80 sm:block">{s.note}</span>
              </dt>
              <dd className="font-display whitespace-nowrap text-[2.6rem] font-bold leading-none text-white min-[400px]:text-[3.2rem] sm:text-6xl xl:text-7xl">{s.big}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
