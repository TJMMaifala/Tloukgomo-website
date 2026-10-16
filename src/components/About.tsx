import { Handshake, Users, HeartHandshake, Wrench, Leaf, Repeat } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { siteImages } from '../data/images'
import { company } from '../data/company'

const commitments = [
  { icon: Handshake, title: 'Sustainable partnerships', text: 'Value-adding alliances in the industries we serve.' },
  { icon: Users, title: 'Employment creation', text: 'Sustainable jobs created through our business services.' },
  { icon: HeartHandshake, title: 'Community development', text: 'Active involvement where we conduct our business.' },
  { icon: Wrench, title: 'Practical solutions', text: 'Simple, practical and sustainable answers to client needs.' },
  { icon: Leaf, title: 'Environmental responsibility', text: 'The environmental impact of our activities is always considered.' },
  { icon: Repeat, title: 'Long-term relationships', text: 'Relationships built on professionalism and courtesy.' },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-concrete-100 text-ink-950" aria-labelledby="about-title">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div id="about-title">
              <SectionHeading
                tone="light"
                number="01"
                label="About us"
                title={
                  <>
                    Building with purpose. <span className="text-copper-600">Delivering with integrity.</span>
                  </>
                }
              />
            </div>
            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-6 text-base leading-relaxed text-ink-600 sm:text-lg md:grid-cols-2 md:gap-10">
                <p>
                  Tloukgomo Trading and Projects is a South African company established to supply materials, goods and services across multiple markets. Founded on the business experience of its managing director, {company.director}, the company is built around professionalism, quality and affordability.
                </p>
                <p>
                  Our focus is on sustainable partnerships and meaningful economic participation, creating employment and business opportunities within the communities from which they emanate, while meeting each client&rsquo;s needs through simple, practical solutions.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-900 [clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),calc(100%-56px)_100%,0_100%)]">
                  <img
                    src={siteImages.about}
                    alt="Steel truss roof structure erected by Tloukgomo over a large building"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-6 left-0 bg-ink-950 p-6 text-white shadow-card sm:-left-6 sm:p-8">
                  <p className="font-display text-7xl font-bold leading-none text-copper-500 sm:text-8xl">01</p>
                  <p className="mt-2 font-display text-lg font-semibold uppercase tracking-wider2">Level 1 B-BBEE</p>
                  <p className="mt-1 max-w-[16rem] text-sm text-concrete-300">Broad-Based Black Economic Empowerment contributor status.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 border-t border-ink-950/15 pt-14 sm:mt-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h3 className="display-xl text-4xl text-ink-950 sm:text-5xl">Our commitments</h3>
              <p className="max-w-md text-ink-600">{company.mission}</p>
            </div>
          </Reveal>
          <ul className="mt-12 grid gap-px bg-ink-950/15 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 3) * 0.07} y={20} className="group bg-concrete-100 p-7 transition-colors duration-300 hover:bg-white sm:p-8">
                <c.icon className="h-7 w-7 text-copper-600" strokeWidth={1.5} aria-hidden="true" />
                <h4 className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide">{c.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.text}</p>
                <span className="mt-6 block h-[2px] w-8 bg-copper-500 transition-all duration-500 group-hover:w-16" aria-hidden="true" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
