"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <title>Campus Companion</title>

      <div className={styles.pageBackground}/>

      <section className={styles.Decoration4}></section>
      <section className={styles.Decoration5}></section>
      <section className={styles.Decoration6}></section>


      <section className={styles.Decoration1}></section>
      <section className={styles.Decoration2}></section>
      <section className={styles.Decoration3}></section>

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
            <h2 className={styles.SearchHeader}>Search Campus Services</h2>
            <div className={styles.searchContainer2}>
              <input id="search2" type="text" placeholder="Find something on campus..." />
              <button type="button">Search</button>
            </div>
            <p className={styles.SearchContainerP}>Search Events, Societies, Campus Locations, and Services.</p>
          </div>

          <div className={styles.Popout1}>
            <div className={styles.Popout1Content}>
              <h2>Discover Societies on Campus</h2>

              <Link href="/societies" className={styles.Popout1Arrow}></Link>
            </div>
          </div>

          <div className={styles.Popout3}>
            <div className={styles.Popout3Content}>
              <h3>Quick Links</h3>
        
              <Link href="/timetable" className={styles.Popout3Link1}>Timetables<Image className={styles.TimetableImage1}
                    src="/timetable-logo.png"
                    alt="Timetable logo"
                    width={24}
                    height={24}/>
              </Link>
              
              <Link href="/societies" className={styles.Popout3Link2}>Societies<Image className={styles.SocialImage1}
                    src="/social-logo.png"
                    alt="Society logo"
                    width={20}
                    height={20}/>
              </Link>
              
              <Link href="/events" className={styles.Popout3Link3}>Events<Image className={styles.EventImage1}
                    src="/partypopper-logo.png"
                    alt="Part Popper"
                    width={20}
                    height={20}/>
              </Link>

              <Link href="/campus-map" className={styles.Popout3Link4}>Campus Map<Image className={styles.MapImage1}
                    src="/map-logo.png"
                    alt="Map Logo"
                    width={20}
                    height={20}/>
              </Link>
              
              <Link href="/food" className={styles.Popout3Link5}>Canteen<Image className={styles.FoodImage1}
                    src="/canteen-logo.png"
                    alt="Burger Logo"
                    width={20}
                    height={20}/>
              </Link>

              <Link href="/helpdesk" className={styles.Popout3Link6}>Help Desk<Image className={styles.HelpImage1}
                    src="/help-logo.png"
                    alt="Tools logo"
                    width={20}
                    height={20}/>  
              </Link>
            
            </div>
          </div>
        
        
        </div>
      </main>
    </div>
  </>
)}

  
