'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scroll } from 'lucide-react'
import { FileText, Lock, Globe, Search, RefreshCw } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: FileText, title: 'Ancient Manuscript Scanning', description: 'Digitizing ancient palm leaf manuscripts using advanced scanning techniques.' },
  { icon: Scroll, title: 'AI-Powered Transcription', description: 'Using AI models to accurately transcribe the ancient scripts.' },
  { icon: Lock, title: 'Secure Data Storage', description: 'Storing the transcriptions securely to preserve cultural heritage.' },
  { icon: Globe, title: 'Global Access', description: 'Making ancient texts accessible globally for research and preservation.' },
  { icon: Search, title: 'Advanced Search Features', description: 'Implementing advanced search functionalities for ease of access.' },
  { icon: RefreshCw, title: 'Continuous Updates', description: 'Regular improvements and updates based on feedback from researchers.' },
]

export default function Features() {
  const sectionRef = useRef(null)
  const progressBarRef = useRef(null)
  const featuresRef = useRef(null) 

  useEffect(() => {
    const section = sectionRef.current
    const progressBar = progressBarRef.current
    const featureCards = gsap.utils.toArray('.feature-card')
    const featureIcons = gsap.utils.toArray('.feature-icon')

    gsap.set(progressBar, { height: 0 })
    gsap.set(featureCards, { opacity: 0, y: 50 })
    gsap.set(featureIcons, { scale: 0 })

    gsap.fromTo(featuresRef.current, {
        y: 100,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            end: 'top top',
            scrub: true,
        }
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        gsap.to(progressBar, {
          height: `${self.progress * 100}%`,
          duration: 0.1,
        })
      },
    })

    featureCards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          end: 'bottom top', 
          toggleActions: 'restart pause reverse pause', // This will repeat the animation when the card re-enters
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.5 })
            gsap.to(featureIcons[index], { scale: 1, duration: 0.5, delay: 0.2 })
          },
          onLeave: () => {
            gsap.to(card, { opacity: 0, y: 50, duration: 0.3 }) // Reset the card when it leaves the viewport
            gsap.to(featureIcons[index], { scale: 0, duration: 0.3 }) // Reset the icon scale
          },
          onEnterBack: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.5 })
            gsap.to(featureIcons[index], { scale: 1, duration: 0.5, delay: 0.2 })
          },
          onLeaveBack: () => {
            gsap.to(card, { opacity: 0, y: 50, duration: 0.3 })
            gsap.to(featureIcons[index], { scale: 0, duration: 0.3 })
          },
        })
      })
      
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-br from-blue-50 to-blue-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={featuresRef} className="text-5xl md:text-6xl font-semibold text-black text-center mb-28">Features</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-2 md:w-5 rounded-xl bg-gray-200 sm:left-1/2 sm:-ml-0.5">
            <div ref={progressBarRef} className="w-full bg-gradient-to-b rounded-xl from-blue-400 to-blue-500 absolute top-0 left-0"></div>
          </div>
          <div className="relative">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card mb-8 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} sm:mb-16`}>
                <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'} relative`}>
                  <div className="bg-white shadow-lg border p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className={`feature-icon w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4`}>
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-md text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 rounded-full w-10 h-10 bg-blue-500 border-2 border-blue-600 flex items-center justify-center opacity-0 feature-glow">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
