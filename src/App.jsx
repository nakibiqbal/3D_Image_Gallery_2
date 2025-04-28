import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

import Image_Slider from './3D_Image_Slider_2/Image_Slider'
import './App.css'

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // lower = smoother
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div className="fullSpace">
        <h3>Scroll to see the gallery</h3>
      </div>

      <Image_Slider />

      <div className="fullSpace"></div>
    </>
  )
}

export default App
