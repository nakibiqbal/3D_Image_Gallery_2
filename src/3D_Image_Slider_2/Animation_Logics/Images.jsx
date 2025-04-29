import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Images = ({ index, src, parentRef }) => {
    const imgRef = useRef(null);
    const [moved, setMoved] = useState(false);

    // For small screen size
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

    // Update state on screen resize
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 500);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Reset the image position when tapping anywhere on the screen
    useEffect(() => {
        const handleOutsideTap = () => {
            console.log("Global click listener triggered");
            setMoved(false); // Reset the image position
        };

        window.addEventListener("click", handleOutsideTap);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("click", handleOutsideTap);
        };
    }, []);


    useGSAP(
        () => {
            gsap.fromTo(
                imgRef.current,
                {
                    rotateY: isSmallScreen ? -20 : -15,
                    z: isSmallScreen ? "-45vh" : "-37vh",
                    x: "110%",
                },
                {
                    z: isSmallScreen ? "55vh" : "50vh",
                    rotateY: isSmallScreen ? -40 : -15,
                    x: "-100%",
                    scrollTrigger: {
                        trigger: imgRef.current,
                        start: `${index * (isSmallScreen ? 25 : 15)}% 80%`,
                        end: `${index * (isSmallScreen ? 25 : 15)}% ${isSmallScreen ? -200 : -400}%`,
                        scrub: true,
                    },
                }
            );
        },
        { scope: parentRef.current }
    );

    return (

        <div
            ref={imgRef}
            className="imgParent"
            style={{
                zIndex: 100 - index, // Higher z-index for earlier images]
            }}
        >

            <motion.img
                onTap={(e) => {
                    e.stopPropagation(); // Prevent event bubbling    
                    console.log("Image tapped");
                    if (isSmallScreen) {
                        setMoved(!moved);
                    }
                }}
                animate={{
                    x: isSmallScreen && moved ? 50 : 0,
                }}
                {...(!isSmallScreen && { whileHover: { x: "5.208vw" } })} // Converted 100px to vw
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={src}
                loading="lazy"
            />

        </div>

    );
};

export default Images;