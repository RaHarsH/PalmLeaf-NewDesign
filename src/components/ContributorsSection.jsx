"use client"

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Database, Code, Cloud, Camera, User } from 'lucide-react' 

gsap.registerPlugin(ScrollTrigger)

const teams = [
  { 
    title: "Database Design & Build", 
    members: ["Name 1", "Name 2", "Name 3"], 
    role: "Database Team", 
    icon: <Database className="w-16 h-16 text-blue-600" />
  },
  { 
    title: "Frontend Development", 
    members: ["Name 1", "Name 2", "Name 3"], 
    role: "Frontend Team", 
    icon: <Code className="w-16 h-16 text-blue-600" />
  },
  { 
    title: "Backend Development", 
    members: ["Name 1", "Name 2", "Name 3"],  
    role: "Backend Team", 
    icon: <Cloud className="w-16 h-16 text-blue-600" />
  },
  { 
    title: "OCR (Optical Character Recognition)", 
    members: ["Name 1", "Name 2", "Name 3"],  
    role: "OCR Team", 
    icon: <Camera className="w-16 h-16 text-blue-600" />
  },
  { 
    title: "Project Management", 
    members: ["Name 1", "Name 2", "Name 3"], 
    role: "Project Team", 
    icon: <User className="w-16 h-16 text-blue-600" />
  },
]

export default function ParallaxContributors() {
  const containerRef = useRef(null)
  const cardsRef = useRef(null)
  const textRef = useRef(null)
  const contributorsHeadingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contributorsHeadingRef.current, {
        y: 100,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: contributorsHeadingRef.current,
            start: 'top 80%',
            end: 'top top',
            scrub: true,
        }
    })
  })

  useEffect(() => {
    const container = containerRef.current
    const cards = cardsRef.current
    const text = textRef.current

    if (!container || !cards || !text) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${cards.scrollWidth - window.innerWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(cards, {
      x: () => -(cards.scrollWidth - window.innerWidth),
      ease: "none",
    }).to(text, {
      xPercent: -20,
      ease: "none",
    }, 0)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative bg-gradient-to-r from-blue-100 to-blue-200">
        <h1 ref={contributorsHeadingRef} className='absolute left-1/2 -translate-x-1/2 top-20 text-4xl md:text-6xl font-semibold'>Contributors</h1>
      <div 
        ref={textRef} 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-[30vw] font-bold text-blue-200 whitespace-nowrap pointer-events-none z-0"
        aria-hidden="true"
      >
        Contributors
      </div>
      <div 
        ref={cardsRef} 
        className="flex space-x-8 absolute top-1/2 left-0 transform -translate-y-1/2 px-[50vw] z-10"
        aria-label="Project Contributors"
      >
        {teams.map((team, index) => (
          <div key={index} className="flex-shrink-0 w-72 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              {/* Icon representing the team */}
              <div className="mb-4">{team.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{team.title}</h3>
              <p className="text-sm text-muted-foreground">{team.role}</p>
              <ul className="mt-4 space-y-2">
                {team.members.map((member, idx) => (
                  <li key={idx} className="text-sm text-gray-700">{member}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
