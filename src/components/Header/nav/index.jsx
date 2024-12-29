import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Link from 'next/link';  // Import the built-in Link component
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Experience",
    href: "/experience",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
    >
      <div className={styles.body}>
        <div 
          onMouseLeave={() => { setSelectedIndicator(pathname) }} 
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {
            navItems.map((data, index) => (
              <div 
                key={index} 
                className={`${styles.navItem} ${selectedIndicator === data.href ? styles.active : ''}`}
                onClick={() => setSelectedIndicator(data.href)}
              >
                {/* Use Next.js's built-in Link component */}
                <Link href={data.href}>
                  <a>{data.title}</a>  {/* Use <a> tag with Next.js Link */}
                </Link>
              </div>
            ))
          }
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}
