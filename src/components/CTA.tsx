import { Phone } from 'lucide-react'
import Reveal from './Reveal'
import { siteImages } from '../data/images'
import { company } from '../data/company'

export default function CTA() {
  return (
    <section className="grain relative isolate overflow-hidden" aria-labelledby="cta-title">
      <img src={siteImages.cta} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-ink-950/80" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="mx-auto block h-12 w-px bg-copper-500" aria-hidden="true" />
            <h2 id="cta-title" className="display-xl mt-8 text-[2.8rem] text-white sm:text-7xl lg:text-8xl">
              Have a project <span className="text-copper-500">in mind?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-concrete-200 sm:text-lg">
              Let&rsquo;s discuss how Tloukgomo Trading and Projects can support your next construction, infrastructure or supply requirement.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#contact" className="btn-primary">Request a Quote</a>
              <a href={company.mobileHref} className="btn-ghost">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
