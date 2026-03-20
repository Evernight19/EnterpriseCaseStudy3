"use client";

import { useEffect, useState } from "react";
import styles from "./settingspage.module.css";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type User = {
  name: string;
  studentId: string;
  course?: string;
  loggedIn?: boolean;
};

type UserSettingsRow = {
  student_id: string;
  large_text: boolean;
  high_contrast: boolean;
  reduced_motion: boolean;
  event_reminders: boolean;
  society_alerts: boolean;
  helpdesk_updates: boolean;
  default_page: "Campus Map" | "Timetable" | "Societies" | "Helpdesk";
};

export default function SettingsPage() {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [eventReminders, setEventReminders] = useState(true);
  const [societyAlerts, setSocietyAlerts] = useState(true);
  const [helpdeskUpdates, setHelpdeskUpdates] = useState(false);

  const [defaultPage, setDefaultPage] = useState("Campus Map");
  const [user, setUser] = useState<User | null>(null);

  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("campusUser");

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    async function fetchSettings() {
      if (!user?.studentId) return;

      setLoadingSettings(true);
      setSaveMessage("");

      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("student_id", user.studentId)
        .single();

      if (error) {
        if (error.code !== "PGRST116") {
          setSaveMessage("Could not load saved settings.");
        }
        setLoadingSettings(false);
        return;
      }

      if (data) {
        const settings = data as UserSettingsRow;
        setLargeText(settings.large_text);
        setHighContrast(settings.high_contrast);
        setReducedMotion(settings.reduced_motion);
        setEventReminders(settings.event_reminders);
        setSocietyAlerts(settings.society_alerts);
        setHelpdeskUpdates(settings.helpdesk_updates);
        setDefaultPage(settings.default_page);
      }

      setLoadingSettings(false);
    }

    fetchSettings();
  }, [user]);

  async function handleSaveSettings() {
    if (!user?.studentId) {
      setSaveMessage("You must be logged in to save settings.");

      setTimeout(() => {
        setSaveMessage("");
      }, 2000);

      return;
    }

    setSavingSettings(true);
    setSaveMessage("");

    const payload: UserSettingsRow = {
      student_id: user.studentId,
      large_text: largeText,
      high_contrast: highContrast,
      reduced_motion: reducedMotion,
      event_reminders: eventReminders,
      society_alerts: societyAlerts,
      helpdesk_updates: helpdeskUpdates,
      default_page: defaultPage as
        | "Campus Map"
        | "Timetable"
        | "Societies"
        | "Helpdesk",
    };

    const { error } = await supabase
      .from("user_settings")
      .upsert(payload, { onConflict: "student_id" });

    if (error) {
      setSaveMessage("Could not save settings.");
    } else {
      setSaveMessage("Settings saved successfully.");
    }

    setSavingSettings(false);
  }

  return (
    <>
      <div className={styles.pageBackground} aria-hidden="true" />

      <section className={styles.Decoration4} aria-hidden="true"></section>
      <section className={styles.Decoration5} aria-hidden="true"></section>
      <section className={styles.Decoration6} aria-hidden="true"></section>

      <section className={styles.Decoration1} aria-hidden="true"></section>
      <section className={styles.Decoration2} aria-hidden="true"></section>
      <section className={styles.Decoration3} aria-hidden="true"></section>

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <Navbar />

        <section className={styles.section} aria-hidden="true" />
        <section className={styles.section2} aria-hidden="true" />
     
          <div className={styles.AccountInfoCard}>
            <div className={styles.AccountInfoContent}>
              <h2>Account Information:</h2>

              <p><strong>Name:</strong> {user?.name || "N/A"}</p>

              <p><strong>Student ID:</strong> {user?.studentId || "N/A"}</p>

              <p><strong>Course:</strong> {user?.course || "N/A"}</p>

              <button type="button" className={styles.secondaryButton} onClick={() => {localStorage.removeItem("campusUser"); 
                    setUser(null); window.location.reload();}}>Sign Out</button>

            </div>
          </div>

          <div className={styles.contentLayer}>


            <section className={styles.settingsHero}>
              <div className={styles.settingsHeroContent}>
                <div>
                  <h1>Settings</h1>

                  <p>Adjust accessibility, notifications and personal preferences for your Campus Companion experience.</p>
                </div>
              </div>
            </section>

            <section className={styles.settingsPanel}>
              <h2 className={styles.settingsHeading}>Preferences:</h2>

              {loadingSettings && (<p className={styles.statusMessage}>Loading saved settings...</p>)}

              {saveMessage && (<p className={styles.statusMessage} role="status">{saveMessage}</p>)}

              <div className={styles.settingsGrid}>
                <div className={styles.settingsCard}>
                  <h3>Accessibility</h3>

                  <label className={styles.toggleRow}>
                    <span>Large text</span>

                    <input type="checkbox" checked={largeText} onChange={() => setLargeText(!largeText)}/>
                  </label>

                  <label className={styles.toggleRow}>
                    <span>High Contrast Mode</span>
                    
                    <input type="checkbox" checked={highContrast} onChange={() => setHighContrast(!highContrast)}/>
                  </label>

                  <label className={styles.toggleRow}>
                    <span>Reduced Motion</span>

                    <input type="checkbox" checked={reducedMotion} onChange={() => setReducedMotion(!reducedMotion)}/>
                  </label>
                </div>

                <div className={styles.settingsCard}>
                  <h3>Notifications</h3>

                  <label className={styles.toggleRow}>
                    <span>Event Reminders</span>

                    <input type="checkbox" checked={eventReminders} onChange={() => setEventReminders(!eventReminders)}/>
                  </label>

                  <label className={styles.toggleRow}>
                    <span>Society Alerts</span>

                    <input type="checkbox" checked={societyAlerts} onChange={() => setSocietyAlerts(!societyAlerts)}/>
                  </label>

                  <label className={styles.toggleRow}>
                    <span>Helpdesk Updates</span>

                    <input type="checkbox" checked={helpdeskUpdates} onChange={() => setHelpdeskUpdates(!helpdeskUpdates)}/>
                  </label>
                </div>

                <div className={styles.settingsCard}>
                  <h3>App Preferences</h3>

                  <label className={styles.selectGroup}>
                    <span>Default Page</span>

                    <select value={defaultPage} onChange={(e) => setDefaultPage(e.target.value)} className={styles.selectInput}>

                      <option>Campus Map</option>
                      <option>Timetable</option>
                      <option>Societies</option>
                      <option>Helpdesk</option>
                    
                    </select>
                  </label>

                  <button type="button" className={styles.saveButton} onClick={handleSaveSettings} disabled={savingSettings}>
                    {savingSettings ? "Saving..." : "Save Settings"}
                  </button>

                </div>
              </div>
            </section>

            <aside className={styles.summaryPanel}>
              <div className={styles.summaryPanelContent}>
                <h2 className={styles.summaryTitle}>Current Summary:</h2>

                <div className={styles.summaryCard}>
                  
                  <p><strong>Large Text:</strong> {largeText ? "On" : "Off"}</p>

                  <p><strong>High Contrast:</strong>{" "} {highContrast ? "On" : "Off"}</p>
                  
                  <p><strong>Reduced Motion:</strong>{" "} {reducedMotion ? "On" : "Off"}</p>
                  
                  <p><strong>Event Reminders:</strong>{" "} {eventReminders ? "On" : "Off"}</p>
                  
                  <p><strong>Society Alerts:</strong>{" "} {societyAlerts ? "On" : "Off"}</p>
                  
                  <p><strong>Helpdesk Updates:</strong>{" "} {helpdeskUpdates ? "On" : "Off"}</p>
                  
                  <p><strong>Default Page:</strong> {defaultPage}</p>
                </div>

                <div className={styles.quickLinks}>
                  <button type="button" className={styles.quickLinkButton}>Accessibility Help</button>

                  <button type="button" className={styles.quickLinkButton}>Notification Help</button>

                  <button type="button" className={styles.quickLinkButton}>Privacy Info</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
