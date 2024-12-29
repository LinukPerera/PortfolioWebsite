import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function index() {

    const pathname = usePathname();
  
    // Initialize the state for active link, if needed.
    const [isActive, setIsActive] = useState(false);
  
    // You can use this if you need some custom logic based on navigation, but this is unnecessary for active link management.
    useEffect(() => {
      setIsActive(false);  // Reset active state if needed, though not required for the current use case.
    }, [pathname]);

    const phrase = "I'm an Electrical and Electronics Engineering undergrad, MBCS, and IET volunteer with a passion for tech, fintech, web development, and physics. Always exploring new ideas and building projects along the way!";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}> Driven by a love for problem-solving, I try to be neurodivergent when developing solutions that tackle real-world challenges using tech. </motion.p>
                <div data-scroll data-scroll-speed={0.2}>
                    <Rounded className={styles.button}>
                        <Link href="/about" className={pathname === "/about" ? styles.active : ""}>About</Link>
                    </Rounded>
                </div>
            </div>
        </div>
    )
}
