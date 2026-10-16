import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface Props {
  number: string
  label: string
  title: ReactNode
  intro?: string
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
}

export default function SectionHeading({ number, label, title, intro, tone = 'dark', align = 'left' }: Props) {
  const light = tone === 'light'
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}>
      <Reveal>
        <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="font-display text-lg font-semibold tracking-wider2 text-copper-500">{number}</span>
          <span className="h-px w-12 bg-copper-500" aria-hidden="true" />
          <span className={`font-display text-sm font-semibold uppercase tracking-wider3 ${light ? 'text-ink-600' : 'text-concrete-400'}`}>
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`display-xl mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl ${light ? 'text-ink-950' : 'text-white'}`}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${light ? 'text-ink-600' : 'text-concrete-300'} ${align === 'center' ? 'mx-auto' : ''}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
