'use client';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import Link from 'next/link';  // Ensure Link is imported

export default function Header() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [mounted, setMounted] = useState(false); // Track if the component is mounted
    const pathname = usePathname();
    const button = useRef(null);

    useEffect(() => {
        setMounted(true); // Set mounted to true once client-side
    }, []);

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false)) }
            }
        })
    }, []);

    if (!mounted) return null; // Render nothing on the server

    return (
        <>
            <div ref={header} className={styles.header}>
                <div className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        <p className={styles.year}>2024</p>
                        <p className={styles.linuk}>Linuk</p>
                        <p className={styles.perera}>W L D Perera</p>
                    </div>
                </div>
                <div className={styles.nav}>
                    {/* Add a dynamic class 'active' for the currently active link */}
                    <Magnetic>
                        <div className={styles.el}>
                            <Link href="/experience" className={pathname === "/experience" ? styles.active : ""}>Experience</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>

                    <Magnetic>
                        <div className={styles.el}>
                            <Link href="/about" className={pathname === "/about" ? styles.active : ""}>About</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>

                    <Magnetic>
                        <div className={styles.el}>
                            <Link href="/contact" className={pathname === "/contact" ? styles.active : ""}>Contact</Link>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                </div>
            </div>

            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>

            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    );
}
