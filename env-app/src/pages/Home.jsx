import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Analytics from '../components/Analytics'
import Cards from '../components/Cards'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Analytics />   
        <Cards />
        <Footer />
    </div>
  )
}

export default Home