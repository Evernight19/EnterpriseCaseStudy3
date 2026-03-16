"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import styles from "./page2.module.css"

export default function LoginPage() {
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const fictionalUser = {
      studentId: "A00028743",
      password: "campus123",
      name: "Josh Lyons",
    }

    if (!studentId.trim() || !password.trim()) {
      setError("Please enter both your student ID and password.")
      return
    }

    if (
      studentId.trim() === fictionalUser.studentId &&
      password === fictionalUser.password
    ) {
      localStorage.setItem(
        "campusUser",
        JSON.stringify({
          studentId: fictionalUser.studentId,
          name: fictionalUser.name,
          loggedIn: true,
        })
      )

      setSuccess("Login successful. Redirecting...")
      setTimeout(() => {
        router.push("/")
      }, 1000)
      return
    }

    setError("Invalid student ID or password.")
  }

  return (
    <>
      <div className={styles.pageBackground} />

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
            <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close menu" type="button">✖</button>

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

          {menuOpen && (<div className={styles.pageOverlay} onClick={() => setMenuOpen(false)} aria-hidden="true"/>)}


          <section className={styles.section}></section>
          <section className={`${styles.section} ${styles.section2}`}></section>

          <section className={styles.loginShell}>
            <div className={styles.loginCard}>
              <div className={styles.loginHeader}>
                <h1>Welcome Back</h1>
                <p>Sign in to access your Campus Companion account.</p>
              </div>

              <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                  <label htmlFor="studentId">Student ID</label>
                  <input id="studentId" type="text" placeholder="Enter your student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)}/>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>{success}</p>}

                <button type="submit" className={styles.loginButton}>Sign In</button>
              </form>

              <div className={styles.loginFooter}>
                <p>Demo login: <strong>A00028743</strong></p>

                <p>Password: <strong>campus123</strong></p>
                <Link href="/" className={styles.backLink}>Back to Home</Link>
              </div>
            </div>
            
          </section>
        </main>
      </div>
    </>
  )
}
