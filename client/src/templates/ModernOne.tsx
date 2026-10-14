import { useState } from "react";
import styles from "./ModernOne.module.css";
import type { ResumeData } from "../types/resume";

interface ModernOneProps {
  data: ResumeData;
}

function ModernOne({ data }: ModernOneProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const name = data.name || "Your Name";
  const role = data.role || "Developer";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={styles.portfolio}>
      {/* ================= NAVBAR ================= */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          {name.split(" ")[0]}
          <span>.</span>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.isOpen : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav Links */}
        <nav
          className={`${styles.navLinks} ${mobileMenuOpen ? styles.isOpen : ""}`}
        >
          {data.about && (
            <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
              About
            </a>
          )}

          {data.skills.length > 0 && (
            <a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>
              Skills
            </a>
          )}

          {data.experience.length > 0 && (
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, "experience")}
            >
              Experience
            </a>
          )}

          {data.projects.length > 0 && (
            <a href="#projects" onClick={(e) => handleNavClick(e, "projects")}>
              Projects
            </a>
          )}

          {data.education.length > 0 && (
            <a
              href="#education"
              onClick={(e) => handleNavClick(e, "education")}
            >
              Education
            </a>
          )}

          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
            Contact
          </a>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={`${styles.greeting} ${styles.animateText}`}>
            HELLO, I'M
          </p>

          <h1 className={`${styles.animateText} ${styles.delay1}`}>{name}</h1>

          <h2 className={`${styles.animateText} ${styles.delay2}`}>{role}</h2>

          {data.about && (
            <p
              className={`${styles.description} ${styles.animateText} ${styles.delay3}`}
            >
              {data.about}
            </p>
          )}

          <div
            className={`${styles.buttons} ${styles.animateText} ${styles.delay4}`}
          >
            {data.projects.length > 0 && (
              <a
                href="#projects"
                className={styles.primaryButton}
                id={styles.white}
                onClick={(e) => handleNavClick(e, "projects")}
              >
                View My Work
              </a>
            )}

            <a
              href="#contact"
              className={styles.outlineButton}
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* INITIAL LETTER */}
        <div className={styles.heroShape}>
          <div className={styles.avatar}>{name.charAt(0).toUpperCase()}</div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      {data.about && (
        <section id="about" className={styles.section}>
          <p className={styles.sectionLabel}>01 — ABOUT</p>

          <h3>Turning ideas into digital experiences.</h3>

          <p>{data.about}</p>

          <div className={styles.contactInfo}>
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.phone}</span>}
            {data.location && <span>⌖ {data.location}</span>}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills.length > 0 && (
        <section id="skills" className={styles.skillsSection}>
          <p className={styles.sectionLabel}>02 — SKILLS</p>

          <div className={styles.skills}>
            {data.skills.map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience.length > 0 && (
        <section id="experience" className={styles.section}>
          <p className={styles.sectionLabel}>03 — EXPERIENCE</p>

          <div className={styles.experienceList}>
            {data.experience.map((experience, index) => (
              <div key={index} className={styles.experienceCard}>
                <div className={styles.experienceHeader}>
                  <span>
                    {experience.startDate || ""}
                    {experience.startDate && experience.endDate ? " — " : ""}
                    {experience.endDate || ""}
                  </span>

                  <h3>{experience.role}</h3>

                  <h4>{experience.company}</h4>
                </div>

                {experience.description && <p>{experience.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects.length > 0 && (
        <section id="projects" className={styles.projectsSection}>
          <p className={styles.sectionLabel}>04 — PROJECTS</p>

          <div className={styles.projects}>
            {data.projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectContent}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <h3>{project.name}</h3>

                  {project.description && <p>{project.description}</p>}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className={styles.projectTech}>
                      {project.technologies.map((technology, techIndex) => (
                        <span key={techIndex}>{technology}</span>
                      ))}
                    </div>
                  )}
                </div>

                <span className={styles.arrow}>↗</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education.length > 0 && (
        <section id="education" className={styles.section}>
          <p className={styles.sectionLabel}>05 — EDUCATION</p>

          <div className={styles.educationList}>
            {data.education.map((education, index) => (
              <div key={index} className={styles.educationCard}>
                <span>
                  {education.startYear || ""}
                  {education.startYear && education.endYear ? " — " : ""}
                  {education.endYear || ""}
                </span>

                <h3>
                  {education.degree}
                  {education.field ? ` in ${education.field}` : ""}
                </h3>

                <h4>{education.institution}</h4>

                {education.grade && <p>Grade: {education.grade}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= CONTACT ================= */}
      <section id="contact" className={styles.section}>
        <p className={styles.sectionLabel}>06 — CONTACT</p>

        <h3>Let's build something together.</h3>

        <div className={styles.contactLinks}>
          {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}

          {data.phone && <span>{data.phone}</span>}

          {data.location && <span>{data.location}</span>}

          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}

          {data.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default ModernOne;
