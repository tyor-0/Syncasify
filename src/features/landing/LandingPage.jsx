import React from 'react'
import Hero from './Hero'
import ProblemSection from './ProblemSection'
import SolutionSection from './SolutionSection'
import How from './How'
import Benefit from './Benefit'
import DashboardSection from './DashboardSection.jsx'
import Testimonial from './Testimonial'
import Pricing from './Pricing'
import FAQ from './FAQ'
import CTA from './CTA'


function LandingPage() {
  return (
    <div>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <How />
      <Benefit />
      <DashboardSection />
      <Testimonial />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  )
}

export default LandingPage