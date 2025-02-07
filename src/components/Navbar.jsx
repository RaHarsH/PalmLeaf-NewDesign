'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticEffect from './MagneticEffect';


import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Search', href: '/search' },
  { name: 'Admin', href: '/admin/dashboard' },
  { name: 'Sign In', href: '/auth/signin' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);

  // for showing sign in button and logout button based on the presence of token
  const [token, setToken] = useState("");

  const router = useRouter()

  const getTokenFromServer = async () => {
    try {
      const response = await axios.get("/api/auth/me");

      console.log(response);

      if(response.data.token) {
        setToken(response.data.token)
      }
      else {
        console.log("Token not found !")
      }
      
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout")
      console.log('====================================');
      console.log('Logout successful');
      console.log('====================================');

      setToken("")

      router.push("/auth/signin")

      toast.success("Logout successful");

    } catch (error) {
        console.log("Logout failed", error.message)
        toast.error("Error logging out!");
    }
  }

  useEffect(() => {
    getTokenFromServer();
  }, [router]);


  useEffect(() => {
    getTokenFromServer();
  }, [token]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .to(navRef.current, {
          clipPath: 'circle(150% at 100% 0)',
          duration: 0.8,
          ease: 'power2.inOut',
        })
        .to(
          '.nav-item',
          {
            y: -8,
            opacity: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    }, menuRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed backdrop-blur-md z-30 flex justify-between items-center top-0 left-0 w-full py-5 px-10 md:px-20">
        <div className="flex flex-col gap-2">
          <Link href="/" className="logo">
            <h3>logo.co</h3>
          </Link>
          <Link href="/" className="project absolute top-[50%] opacity-0">
            <h3>Project</h3>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex text-sm justify-between items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>

            {
              // show the admin dashboard and search page if the token exists i.e if the user is logged in
              token && (
                <>
                  <Link href="/search" className="nav-link">Search</Link>
                  <Link href="/admin/dashboard" className="nav-link">Admin</Link>
                </>
              )

            }

            {token ? (
              // Show Profile and Logout if token exists
              <>
                <Link href="/profile" className="nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#3398FF] text-white px-5 py-2 rounded-3xl"
                >
                  Logout
                </button>
              </>
            ) : (
              // Show Sign In button if token does not exist
              <Link href="/auth/signin">
                <MagneticEffect>
                  <button className="bg-[#3398FF] text-white px-5 py-2 rounded-3xl">
                    Sign In
                  </button>
                </MagneticEffect>
              </Link>
            )}
          </div>

          {/* Hamburger menu */}
          <div
            className="flex flex-col justify-center items-center gap-1 cursor-pointer z-30"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`h-1 w-8 bg-black rounded-3xl transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-0.5' : ''
              }`}
            ></div>
            <div
              className={`h-1 w-8 bg-black rounded-3xl transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : 'mt-1'
              }`}
            ></div>
          </div>
        </div>
      </nav>

      {/* Full-screen animated menu */}
      <div ref={menuRef} className="relative z-20">
        <nav
          ref={navRef}
          className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-200 text-primary-foreground flex items-center justify-center"
          style={{
            clipPath: 'circle(0% at 100% 0)',
          }}
        >
          <ul className="md:text-5xl text-4xl font-normal space-y-8">
            {navItems.map((item, index) => (
              <li key={index} className="overflow-hidden">
                <Link
                  href={item.href}
                  className="nav-item text-black block transform transition-colors hover:text-secondary"
                  style={{ opacity: 0, transform: 'translateY(100%)' }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
