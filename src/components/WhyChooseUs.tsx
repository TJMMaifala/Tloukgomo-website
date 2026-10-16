import { Award, BadgePercent, Handshake, HeartHandshake } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const reasons = [
  {
    number: '01',
    icon: Award,
    title: 'Professionalism',
    text: 'We serve every client with professionalism and courtesy, from first enquiry through to project handover.',
  },
  {
    number: '02',
    icon: BadgePercent,
    title: 'Quality & Affordability',
    text: 'Products and services that satisfy client needs, with payment options that meet their financial requirements.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Sustainable Partnerships',
    text: 'We take part in value-adding partnerships and business alliances in the industries we serve.',
  },
  {
    number: '04',
    icon: HeartHandshake,
    title: 'Community Impact',
    text: 'We create employment and business opportunities within the communities where we operate.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-concrete-100 text-ink-950" aria-labelledby="why-title">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x section-y relative">
        <div id="why-title">
          <SectionHeading
            tone="light"
            number="05"
            label="Why Tloukgomo"
            title={
              <>
                Why partner with <span className="text-copper-600">Tloukgomo?</span>
              </>
            }
          />
        </div>

        <ul className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden bg-ink-950 p-8 text-white shadow-card transition-transform duration-500 hover:-translate-y-2">
                <span className="font-display text-8xl font-bold leading-none text-white/10 transition-colors duration-500 group-hover:text-copper-500">{r.number}</span>
                <r.icon className="mt-10 h-8 w-8 text-copper-400" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-none tracking-wide">{r.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-concrete-300">{r.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-copper-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
