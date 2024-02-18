import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Analytics from '../components/Analytics'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'

function Home() {
  return (
    <div>
        <Navbar />
        <Carousel />
        <Hero />
        <Analytics />
        <Footer />
    </div>
  )
}

export default Home