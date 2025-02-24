'use client'
import React, { useEffect } from 'react';
import * as THREE from 'three';
import vertex from '../shaders/vertexShader.glsl';
import fragment from '../shaders/fragmentShader.glsl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AnimatedAboutSection from '../components/About';
import MagneticEffect from '../components/MagneticEffect';
import Features from '../components/Features';
import ParallaxContributors from '../components/ContributorsSection';
import AnimatedFooter from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on('scroll', (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      20, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      100 
    );

    if(window.innerWidth <= 400) {
      camera.position.z = 20;
    }

    camera.position.z = 14;

    const canvas = document.querySelector('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.IcosahedronGeometry(2.1, 100, 100);

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uColorChange: { value: 0 },
      },
      wireframe: false,
    });

    const sphere = new THREE.Mesh(geometry, shaderMaterial);
    sphere.position.y = -2.6;

    scene.add(sphere);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.landing',
        start: 'top top',
        end: 'bottom center',
        scrub: 2,
        markers: false,
      },
    });

    tl.to(sphere.position, {
      y: 0,
      z: -2,
      duration: 20,
      ease: 'sine.in',
    }, '1')
      .to(shaderMaterial.uniforms.uColorChange, {
        duration: 10,
        value: 1,
        ease: 'power2.inOut',
      }, '1')
      .to('.landing h1', {
        y: -25,
        opacity: 0,
        duration: 5,
        ease: 'sine.in',
      }, '1')
      .to('.landing p', {
        opacity: 1,
        duration: 40,
        y: 0,
      }, '2')
      .to('.landing button', {
        y: -0,
        opacity: 1,
        duration: 40,
        y: 0,
      }, '2');

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if(window.innerWidth <= 400) {
        camera.position.z = 20;
      }
      else {
        camera.position.z = 14;
      }
    });

    const clock = new THREE.Clock();

    function animate() {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div className="w-full">
      <div className="landing w-full h-[200vh] ">
        <div className="w-full h-screen sticky top-0 left-0">
          {/* for bluish blur effect */}
          <div className="absolute w-96 h-96 bg-blue-300 opacity-50 blur-[150px] rounded-full top-10 -left-20"></div>

          <h1 className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-6xl whitespace-nowrap font-medium">Discover . Decode . Document</h1>
          <p className="absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none text-md md:text-3xl text-center tracking-normal leading-loose">
          A <span className="font-bold font-mono">Digital Archive</span> capturing ancient knowledge through the preservation and transcription of palm leaf manuscripts.          </p>

          <div className="absolute w-96 h-96 bg-blue-300 opacity-50 blur-[120px] rounded-full bottom-0 right-0"></div>

          <MagneticEffect>
            <button className='opacity-0 absolute top-[67%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-3 rounded-3xl'>
              Get Started
            </button>
          </MagneticEffect>
          <canvas id="canvas" className="w-full h-screen pointer-events-none z-[-1]"></canvas>
        </div>
      </div>
      <div className='w-full'>
        <AnimatedAboutSection />
      </div>
      <div className='w-full'>
        <Features />
      </div>
      <div className='w-full'>
        <ParallaxContributors />
      </div>

      <AnimatedFooter />
    </div>
  );
}

export default Home;