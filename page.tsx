"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className={styles.pageBackground}/>

      <div className={styles.wrapper}>
        <main className={styles.main}>

          <nav className={styles.navbar}>
            <button type="button" className={styles.menuToggle} onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>

            <div className={styles.navbarButton}>
              <Link href="/" className={styles.navHomeBtn}>Home</Link>
              <Link href="/contact" className={styles.navEventsBtn}>Contact Us</Link>

              <Link href="/login" className={styles.navSignInBtn}>Sign In<Image className={styles.signInImage}
                  src="/logo.png"
                  alt="Sign in logo"
                  width={24}
                  height={24}/>
              </Link>
            </div>
          </nav>

          <div className={`${styles.sideMenu} ${menuOpen ? styles.open : ""}`}>
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              type="button">✖</button>

            <Link href="/" className={`${styles.sideMenuLink} ${styles.homeButton}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/timetable" className={styles.sideMenuLink} onClick={() => setMenuOpen(false)}>Timetables</Link>
            <Link href="/contact" className={styles.sideMenuLink} onClick={() => setMenuOpen(false)}>Contact Us</Link>
            <Link href="/login" className={styles.sideMenuLink} onClick={() => setMenuOpen(false)}>Sign In<Image className={styles.signInImage2}
                  src="/logo.png"
                  alt="Sign in logo"
                  width={24}
                  height={24}/>
            </Link>

            <Link href="/settings" className={styles.sideMenuLinkSettings} onClick={() => setMenuOpen(false)}>Settings<Image className={styles.settingsImage} 
                  src="/settings-logo.png"
                  alt="Settings logo"
                  width={30}                                                                                                            
                  height={30}/>                                                                                                                                                                                                                        
            </Link>
          </div>

          {menuOpen && (
            <div className={styles.pageOverlay} onClick={() => setMenuOpen(false)} aria-hidden="true"/>)}
          

          <section className={styles.section}></section>
          <section className={`${styles.section} ${styles.section2}`}></section>

        <div className={styles.PopoutShell}>
          <div className={styles.Popout2}>
            <h2 className={styles.SearchHeader}>Placeholder</h2>
            <div className={styles.searchContainer2}>
              <input id="search2" type="text" placeholder="Search..." />
              <button type="button">Search</button>
            </div>
            <p>Placeholder<span>Placeholder</span></p>
          </div>





          <div className={styles.Popout1}>
            <div className={styles.Popout1Content}>
              <h2>Discover Societies at placeholder</h2>

              <Link href="/societies" className={styles.Popout1Arrow}></Link>
            </div>
          </div>



          <div className={styles.Popout3}>
            <div className={styles.Popout3Content}>
              <h3>Quick Links</h3>

              <Link href="/societies" className={styles.Popout1Arrow}></Link>
            </div>
          </div>
        
        
        </div>
      </main>
    </div>
  </>
  )}

  
