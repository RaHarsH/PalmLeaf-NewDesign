"use client"

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = [
  { title: "About Us", items: ["Mission", "History", "Team", "Campus"] },
  { title: "Academics", items: ["Courses", "Departments", "Research", "Library"] },
  { title: "Student Life", items: ["Clubs", "Events", "Counseling", "Sports"] },
]

const socialIcons = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Github, href: "#", label: "GitHub" },
]

export default function AnimatedFooter() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true)
//       } else {
//         setIsVisible(false)
//       }
//     }

//     window.addEventListener('scroll', toggleVisibility)
//     return () => window.removeEventListener('scroll', toggleVisibility)
//   }, [])

  useEffect(() => {
    gsap.fromTo('.footer-section', 
      { opacity: 0, y: 20 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top bottom',
          end: 'top 80%',
          scrub: true,
        }
      }
    )

    gsap.fromTo('.scroll-to-top', 
      { opacity: 0, scale: 0 }, 
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.scroll-to-top',
          start: 'top bottom',
          end: 'top 80%',
          scrub: true,
        }
      }
    )
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative bg-gradient-to-tr from-white to-blue-100 pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {footerLinks.map((section, index) => (
            <div key={section.title} className="footer-section">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-800 hover:text-blue-600 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-800 mb-4 md:mb-0">&copy; 2023 College Name. All rights reserved.</p>
          <div className="flex space-x-4 justify-center md:justify-start">
            {socialIcons.map(({ Icon, href, label }) => (
              <a key={label} href={href} className="text-blue-600 hover:text-blue-400 transition-colors duration-300" aria-label={label}>
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[165px] md:bottom-20 scroll-to-top">
        <button
          onClick={scrollToTop}
          className="rounded-full w-12 h-12 flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden="true"></div>
    </footer>
  )
}
