"use client";

import { useMemo, useState } from "react";
import { campusLocations } from "@/data/locations";
import Link from "next/link"
import Image from "next/image"
import styles from "./page3.module.css";

const filters = [
  "All",
  "Academic",
  "Food",
  "Study",
  "Support",
  "Recreation",
  "Accessibility",
] as const;

export default function CampusMapPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [selectedId, setSelectedId] = useState<string | null>(
    campusLocations[0]?.id ?? null
  );

  const filteredLocations = useMemo(() => {
    return campusLocations.filter((location) => {
      const search = query.toLowerCase();

      const matchesQuery =
        location.name.toLowerCase().includes(search) ||
        location.description.toLowerCase().includes(search) ||
        location.services.some((service) =>
          service.toLowerCase().includes(search)
        ) ||
        location.accessibility.some((item) =>
          item.toLowerCase().includes(search)
        ) ||
        location.category.toLowerCase().includes(search);

      const matchesFilter =
        activeFilter === "All" || location.category === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  const selectedLocation =
    filteredLocations.find((location) => location.id === selectedId) ??
    filteredLocations[0] ??
    null;

  return (
    <>
      <div className={styles.pageBackground} aria-hidden="true" />
      <div className={styles.Decoration1} aria-hidden="true" />
      <div className={styles.Decoration2} aria-hidden="true" />
      <div className={styles.Decoration3} aria-hidden="true" />

      <div className={styles.Decoration4} aria-hidden="true" />
      <div className={styles.Decoration5} aria-hidden="true" />
      <div className={styles.Decoration6} aria-hidden="true" />

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.contentLayer}>
            <section className={styles.section} aria-hidden="true" />
            <section className={styles.section2} aria-hidden="true" />

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




            <section className={styles.mapHero}>
              <div className={styles.mapHeroContent}>
                <div>
                  <h1>Campus Map</h1>
                  <p>
                    Find study spaces, food spots, support services, and key
                    buildings across campus.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.mapPanel}>
              <h2 className={styles.mapHeading}>Campus Overview</h2>

              <div className={styles.mapSearchRow}>
                <label className={styles.visuallyHidden} htmlFor="map-search">Search locations</label>

                <input id="map-search" type="text" placeholder="Search by building, service, or category" value={query} onChange={(e) => setQuery(e.target.value)} className={styles.mapSearchInput}/>

                {filters.map((filter) => (
                  <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`${styles.filterButton} ${activeFilter === filter ? styles.activeFilter : ""}`}>
                    {filter}
                  </button>
                ))}
              </div>

              <div className={styles.mapCanvas}>
                <div className={styles.mapBuildingA} aria-hidden="true" />
                <div className={styles.mapBuildingB} aria-hidden="true" />
                <div className={styles.mapBuildingC} aria-hidden="true" />

                <div className={styles.mapBuildingD} aria-hidden="true" />
                <div className={styles.mapBuildingE} aria-hidden="true" />
                <div className={styles.mapBuildingF} aria-hidden="true" />

                <div className={styles.mapPathHorizontal} aria-hidden="true" />
                <div className={styles.mapPathVertical} aria-hidden="true" />

                {filteredLocations.map((location) => (
                  <button key={location.id} type="button" onClick={() => setSelectedId(location.id)} className={`${styles.mapMarker} ${selectedLocation?.id === location.id ? styles.mapMarkerActive: ""}`}
                        style={{left: `${location.x}%`, top: `${location.y}%`,}} aria-label={`View ${location.name} on map`}>{location.code}</button>
                ))}
              </div>
            </section>

            <aside className={styles.locationPanel}>
              <div className={styles.locationPanelContent}>
                <h2 className={styles.locationPanelTitle}>Location Details</h2>

                {selectedLocation ? (
                  <div className={styles.locationCard}>
                    <p className={styles.locationCategory}>{selectedLocation.category}</p>

                    <h3 className={styles.locationName}>{selectedLocation.name}</h3>

                    <p className={styles.locationDescription}>{selectedLocation.description}</p>

                    <p className={styles.locationMeta}><strong>Hours: </strong>{selectedLocation.hours}</p>

                    <p className={styles.locationMeta}><strong>Services:</strong></p>

                    <ul className={styles.locationList}>{selectedLocation.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>

                    <p className={styles.locationMeta}><strong>Accessibility:</strong></p>

                    <ul className={styles.locationList}>{selectedLocation.accessibility.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className={styles.emptyState}>No location selected.</p>
                )}

                <div className={styles.quickLinks}>
                  <button type="button" className={styles.quickLinkButton} onClick={() => setActiveFilter("Food")}>Find Food</button>

                  <button type="button" className={styles.quickLinkButton} onClick={() => setActiveFilter("Study")}>Find Study Spaces</button>

                  <button type="button" className={styles.quickLinkButton} onClick={() => setActiveFilter("Support")}>Find Support</button>

                  <button type="button" className={styles.quickLinkButton} onClick={() => setActiveFilter("Accessibility")}>Accessible Locations</button>
                </div>
              </div>
            </aside>

            <section className={styles.directoryStrip}>
              {filteredLocations.slice(0, 4).map((location) => (
                <button key={location.id} type="button" onClick={() => setSelectedId(location.id)} className={styles.directoryCard}>
                  <h3>
                    {location.code} · {location.name}
                  </h3>
                  <p>{location.category}</p>
                </button>
              ))}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
