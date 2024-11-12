'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedAboutSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const heading = headingRef.current
    const paragraph = paragraphRef.current
    const cards = cardsRef.current

    // Animating heading and paragraph
    gsap.fromTo(heading, {
        y: 50,
        opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
      autoAlpha: 1,
      y: 0,
      duration: 1,
    })

    gsap.to(paragraph, {
      scrollTrigger: {
        trigger: paragraph,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
      autoAlpha: 1,
      y: 0,
      duration: 1,
    })

    // Animating cards
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
            y: 50,
            opacity: 0,
        },
        {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          scrub: true,
        },
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        delay: index * 0.2,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="about-section py-16 px-4 md:px-20 bg-gradient-to-b from-white to-blue-50">
      <h2 ref={headingRef} className="text-4xl font-bold text-center mb-8 text-gray-800 opacity-0">
        About Our Project
      </h2>
      <p ref={paragraphRef} className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto text-center opacity-0">
        Welcome to our digital archive, a dedicated platform that breathes new life into ancient palm leaf manuscripts.
        By preserving and transcribing these unique documents, we aim to reconnect with the wisdom of our ancestors and
        share their insights with the world.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <div ref={(el) => (cardsRef.current[0] = el)} className="bg-white p-8 rounded-lg shadow-lg opacity-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">How We Preserve History</h3>
          <p className="text-md text-gray-600 text-justify">
            Our approach to preservation involves sourcing original manuscripts, digitally scanning them with precision,
            and collaborating with experts to transcribe and translate their contents.
          </p>
        </div>

        <div ref={(el) => (cardsRef.current[1] = el)} className="bg-white p-8 rounded-lg shadow-lg opacity-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Why It Matters</h3>
          <p className="text-md text-gray-600 text-justify">
            Preserving these ancient texts ensures that cultural heritage is not only remembered but actively shared
            and celebrated. Each manuscript holds stories, teachings, and wisdom that can enrich our understanding of
            history and inform our present.
          </p>
        </div>

        {/* New content boxes */}
        <div ref={(el) => (cardsRef.current[2] = el)} className="bg-white p-8 rounded-lg shadow-lg opacity-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">The Collaborative Effort</h3>
          <p className="text-md text-gray-600 text-justify">
            This project is made possible through partnerships with cultural historians, linguists, and preservationists
            who dedicate their expertise to deciphering and authenticating these rare documents.
          </p>
        </div>

        <div ref={(el) => (cardsRef.current[3] = el)} className="bg-white p-8 rounded-lg shadow-lg opacity-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">A Glimpse into the Future</h3>
          <p className="text-md text-gray-600 text-justify">
            Looking ahead, we aim to expand our digital archive, incorporating more manuscripts and adding interactive
            features that allow users to engage more deeply with the content.
          </p>
        </div>
      </div>
    </section>
  )
}
