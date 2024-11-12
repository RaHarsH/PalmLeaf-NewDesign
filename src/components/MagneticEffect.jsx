'use client';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';


const MagneticEffect = ({children}) => {
    const ref = useRef(null);
    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, 'x', {duration: 1, ease: 'elastic.out(1, 0.3)'});
        const yTo = gsap.quickTo(ref.current, 'y', {duration: 1, ease: 'elastic.out(1, 0.3)'});
        const mouseMove = (e) => {
            const {clientX, clientY} = e;
            const {height, width, left, top} = ref.current.getBoundingClientRect();
            // to reduce the intensity of the magnetic effect divide it by 2
            const x = ( clientX - (left + width/1.5) ) / 2;
            const y = ( clientY - (top + height/1.5) ) / 2;

            xTo(x);
            yTo(y);
        }

        const mouseLeave = (e) => {
            xTo(0);
            yTo(0);
        }

        ref.current.addEventListener('mousemove', mouseMove);
        ref.current.addEventListener('mouseleave', mouseLeave);

        return () => {
            ref.current.addEventListener('mousemove', mouseMove);
            ref.current.addEventListener('mouseleave', mouseLeave);
        }
    }, [])
  return (
    React.cloneElement(children, {ref})
  )
}

export default MagneticEffect