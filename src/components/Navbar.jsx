'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticEffect from './MagneticEffect';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {

    gsap.to('.nav-link', {
      y: -20, 
      duration: 2,
      opacity: 0, 
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '100px top', 
        scrub: true,
      },
    });


    gsap.to('.logo', {
      y: -20,
      duration: 2,
      opacity: 0,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '100px top',
        scrub: true,
      },
    });

    gsap.to('.project', {
      y: -14,
      duration: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '100px top',
        scrub: true,
        onEnter: () => {
          document.querySelector('.project').style.display = 'block';
        },
      },
    });

  }, []);

  return (
    <>
      <nav className="fixed backdrop-blur-md z-10 flex justify-between items-center top-0 left-0 w-full py-5 px-20">
        <div className='flex flex-col gap-2'>
          <Link href="/" className="logo">
            <h3 className=''>logo.co</h3>
          </Link>
          <Link href="/" className="project absolute top-[50%] opacity-0">
            <h3>Project</h3>
          </Link>
        </div>

        <div className="flex text-sm justify-between items-center gap-8">
          <div className="flex text-sm justify-between items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/search/:id" className="nav-link">Search</Link>
            <Link href="/admin" className="nav-link">Admin</Link>
            <Link href="/signin">
            <MagneticEffect>
              <button className="bg-[#3398FF] text-white px-5 py-2 rounded-3xl">
                Sign In
              </button>
            </MagneticEffect>
            </Link>
          </div>

          {/* Hamburger menu */}
          <div className="flex flex-col gap-2 cursor-pointer">
            <div className="h-1 w-8 rounded-[10px] bg-black"></div>
            <div className="h-1 w-8 rounded-[10px] bg-black"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
