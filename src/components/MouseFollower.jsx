'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CircularMouseFollower() {
  const followerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const follower = followerRef.current
    if (!follower) return

    const moveFollower = (e) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', moveFollower)
    document.querySelectorAll('a, button, .hoverable').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveFollower)
      document.querySelectorAll('a, button, .hoverable').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={followerRef}
        className={`fixed pointer-events-none z-50 rounded-full transition-all duration-300 ease-out ${
          isHovering ? 'w-24 h-24 bg-blue-200 mix-blend-difference' : 'w-3 h-3 bg-blue-500'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>

      <style jsx global>{`
        .hoverable {
          transition: all 0.3s ease;
        }
        .hoverable:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}