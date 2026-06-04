import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import WhyChooseUs     from './components/WhyChooseUs'
import InternetPackages from './components/InternetPackages'
import CCTVSection     from './components/CCTVSection'
import BrosurGallery   from './components/BrosurGallery'
import TargetAudience  from './components/TargetAudience'
import Footer          from './components/Footer'
import FloatingWA      from './components/FloatingWA'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <WhyChooseUs />
        <InternetPackages />
        <CCTVSection />
        <BrosurGallery />
        <TargetAudience />
      </main>
      <Footer />
      <FloatingWA />
    </>
  )
}
