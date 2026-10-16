import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, PhoneCall, AlertCircle } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { company } from '../data/company'
import { services } from '../data/services'

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  service: string
  details: string
  website: string // honeypot — must stay empty
}
type Errors = Partial<Record<keyof FormState, string>>

const empty: FormState = { name: '', company: '', email: '', phone: '', service: '', details: '', website: '' }
const serviceOptions = [...services.map((s) => s.formValue), 'Other / Not sure yet']

function validate(v: FormState): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  const digits = v.phone.replace(/[^\d]/g, '')
  if (digits.length < 9 || digits.length > 15 || !/^[+\d\s()-]+$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.'
  if (!v.service) e.service = 'Please select the service you need.'
  if (v.details.trim().length < 10) e.details = 'Please tell us a little about your project (at least 10 characters).'
  return e
}

const fieldBase =
  'w-full border bg-ink-900 px-4 py-3.5 text-base text-white placeholder:text-concrete-500 transition-colors focus:border-copper-500 focus:outline-none focus:ring-1 focus:ring-copper-500'

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-display text-xs font-semibold uppercase tracking-wider3 text-concrete-300">
        {label} {required && <span className="text-copper-400" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // Pre-select the service when a service card is clicked
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      setValues((v) => ({ ...v, service: detail }))
    }
    window.addEventListener('select-service', handler)
    return () => window.removeEventListener('select-service', handler)
  }, [])

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const props = (k: keyof Errors) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
    className: `${fieldBase} ${errors[k] ? 'border-red-400' : 'border-white/15'}`,
  })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (values.website) return // bot
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setStatus('sending')
    const payload = {
      name: values.name.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      service: values.service,
      details: values.details.trim(),
    }
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        const body = [
          `Name: ${payload.name}`,
          `Company: ${payload.company || '-'}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Service required: ${payload.service}`,
          '',
          payload.details,
        ].join('\n')
        window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Website enquiry — ' + payload.service)}&body=${encodeURIComponent(body)}`
      }
      setStatus('sent')
      setValues(empty)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative bg-ink-900" aria-labelledby="contact-title">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div id="contact-title">
              <SectionHeading
                number="06"
                label="Contact"
                title={
                  <>
                    Let&rsquo;s build something <span className="text-copper-500">that lasts.</span>
                  </>
                }
                intro="Tell us about your construction, infrastructure or supply requirement and we will come back to you."
              />
            </div>

            <Reveal delay={0.2}>
              <address className="mt-12 grid grid-cols-2 gap-px bg-white/10 not-italic">
                {[
                  { icon: Phone, label: 'Phone', value: company.mobile, href: company.mobileHref },
                  { icon: PhoneCall, label: 'Tel', value: company.tel, href: company.telHref },
                  { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
                  { icon: MapPin, label: 'Location', value: `${company.address.city}, South Africa`, href: company.mapsUrl },
                ].map((c) => (
                  <a key={c.label} href={c.href} {...(c.label === 'Location' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`group flex flex-col gap-2 bg-ink-900 p-5 transition-colors hover:bg-ink-800 sm:p-6 ${c.label === 'Email' || c.label === 'Location' ? 'col-span-2' : ''}`}>
                    <c.icon className="h-5 w-5 text-copper-500" strokeWidth={1.6} aria-hidden="true" />
                    <span className="font-display text-xs font-semibold uppercase tracking-wider3 text-concrete-400">{c.label}</span>
                    <span className="break-words font-display text-xl font-semibold tracking-wide text-white transition-colors group-hover:text-copper-300">{c.value}</span>
                  </a>
                ))}
              </address>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative border border-white/10 bg-ink-800 p-6 sm:p-10">
                <span className="absolute left-0 top-0 h-[3px] w-24 bg-copper-500" aria-hidden="true" />
                <AnimatePresence mode="wait">
                  {status === 'sent' ? (
                    <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-14 text-center" role="status">
                      <CheckCircle2 className="mx-auto h-14 w-14 text-copper-500" strokeWidth={1.4} aria-hidden="true" />
                      <h3 className="mt-6 font-display text-4xl font-bold text-white">Thank you</h3>
                      <p className="mx-auto mt-3 max-w-md text-concrete-300">
                        Your enquiry is ready to go. If your email app opened, please press send to complete it. Otherwise we will respond as soon as possible.
                      </p>
                      <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">Send another enquiry</button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6 sm:grid-cols-2" aria-label="Enquiry form">
                      <Field id="f-name" label="Name" required error={errors.name}>
                        <input id="f-name" type="text" autoComplete="name" value={values.name} onChange={set('name')} placeholder="Your full name" {...props('name')} />
                      </Field>
                      <Field id="f-company" label="Company">
                        <input id="f-company" type="text" autoComplete="organization" value={values.company} onChange={set('company')} placeholder="Company or organisation" className={`${fieldBase} border-white/15`} />
                      </Field>
                      <Field id="f-email" label="Email" required error={errors.email}>
                        <input id="f-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@company.co.za" {...props('email')} />
                      </Field>
                      <Field id="f-phone" label="Phone" required error={errors.phone}>
                        <input id="f-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} placeholder="e.g. 071 000 0000" {...props('phone')} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field id="f-service" label="Service required" required error={errors.service}>
                          <select id="f-service" value={values.service} onChange={set('service')} {...props('service')}>
                            <option value="">Select a service…</option>
                            {serviceOptions.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <Field id="f-details" label="Project details" required error={errors.details}>
                          <textarea id="f-details" rows={5} value={values.details} onChange={set('details')} placeholder="Scope, location, timeline or anything else we should know." {...props('details')} />
                        </Field>
                      </div>
                      {/* Honeypot */}
                      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                        <label htmlFor="f-website">Website</label>
                        <input id="f-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                      </div>

                      <div className="sm:col-span-2">
                        <button type="submit" disabled={status === 'sending'} className="btn-primary group w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                        </button>
                        {status === 'error' && (
                          <p role="alert" className="mt-4 text-sm text-red-300">
                            Something went wrong sending your enquiry. Please email <a className="underline" href={`mailto:${company.email}`}>{company.email}</a> or call {company.mobile}.
                          </p>
                        )}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Location */}
        <Reveal>
          <div className="mt-20 grid overflow-hidden border border-white/10 bg-ink-800 lg:grid-cols-12" aria-labelledby="location-title">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-4">
              <p className="font-display text-sm font-semibold uppercase tracking-wider3 text-copper-400">Find us</p>
              <h3 id="location-title" className="display-xl mt-3 text-4xl text-white sm:text-5xl">Our location</h3>
              <address className="mt-6 not-italic leading-relaxed text-concrete-300">
                {company.address.street}
                <br />
                {company.address.city}
                <br />
                {company.address.postalCode}
                <br />
                {company.address.country}
              </address>
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary group mt-8 self-start">
                View location
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
            <div className="relative min-h-[320px] bg-ink-700 lg:col-span-8">
              <iframe
                title={`Map showing ${company.address.street}, ${company.address.city}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${company.address.street}, ${company.address.city}, ${company.address.postalCode}, South Africa`)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
