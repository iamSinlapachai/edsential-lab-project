"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSAnimate = () => {
    useEffect(() => {
        AOS.init({
            offset: 50,
            duration: 500,
            easing: 'ease-out',
        });
    }, []);
    return null;
};
  

export default AOSAnimate