import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Industries from './components/Industries'
import Stats from './components/Stats'
import WhyChooseUs from './components/WhyChooseUs'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import FloatingQuote from './components/FloatingQuote'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-copper-500 px-4 py-3 font-display font-semibold uppercase text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Industries />
        <Stats />
        <WhyChooseUs />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingQuote />
    </>
  )
}
