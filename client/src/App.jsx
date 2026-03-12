import { useState } from 'react'
import CycleRing from './components/dashboard/CycleRing'
import MoodSelector from './components/dashboard/MoodSelector'
import Navbar from './components/layout/Navbar'
import PageLayout from './components/layout/PageLayout'
import FeatureCard from './components/shared/FeatureCard'
import { BrowserRouter } from 'react-router-dom'
import PageHeader from './components/shared/PageHeader'
import Index from './pages/Index'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <FeatureCard />
      <PageHeader />
      <PageLayout />
      <Index />
      <CycleRing />
      <MoodSelector />
    </BrowserRouter>
  )
}

export default App
