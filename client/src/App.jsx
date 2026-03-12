import { useState } from 'react'
import CycleRing from './components/dashboard/CycleRing'
import MoodSelector from './components/dashboard/MoodSelector'
import Navbar from './components/layout/Navbar'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <CycleRing />
      <MoodSelector />
    </BrowserRouter>
  )
}

export default App
