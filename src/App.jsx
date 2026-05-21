import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import WhyChooseUs     from './components/WhyChooseUs'
import InternetPackages from './components/InternetPackages'
import CCTVSection     from './components/CCTVSection'
import TargetAudience  from './components/TargetAudience'
import Footer          from './components/Footer'
import FloatingWA      from './components/FloatingWA'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <InternetPackages />
        <CCTVSection />
        <TargetAudience />
      </main>
      <Footer />
      <FloatingWA />
    </>
  )
}
