import { useState } from "react";
import styles from "./ModernTwo.module.css";
import type { ResumeData } from "../types/resume";

interface ModernTwoProps {
  data: ResumeData;
}

function ModernTwo({ data }: ModernTwoProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const name = data.name || "Your Name";
  const role = data.role || "Software Developer";

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className={styles.portfolio}>
      {/* =====================================================
          NAVIGATION
          ===================================================== */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          {name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <button
          className={`${styles.menuToggle} ${mobileMenuOpen ? styles.menuOpen : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`${styles.navLinks} ${mobileMenuOpen ? styles.navActive : ""}`}
        >
          {data.about && (
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          )}
          {data.skills.length > 0 && (
            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>
          )}
          {data.experience.length > 0 && (
            <a href="#experience" onClick={closeMenu}>
              Experience
            </a>
          )}
          {data.projects.length > 0 && (
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
          )}
          {data.education.length > 0 && (
            <a href="#education" onClick={closeMenu}>
              Education
            </a>
          )}
          {(data.email || data.linkedin || data.github) && (
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          )}
        </div>
      </nav>

      {/* =====================================================
          HERO
          ===================================================== */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>PORTFOLIO / 2026</p>

          <h1>
            {name.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>
                {word}
                {index < name.split(" ").length - 1 && " "}
              </span>
            ))}
          </h1>

          <div className={styles.heroBottom}>
            <div>
              <p className={styles.role}>{role}</p>
              {data.location && (
                <p className={styles.location}>Based in {data.location}</p>
              )}
            </div>

            <div className={styles.heroIntro}>
              {data.about ? (
                <p>{data.about}</p>
              ) : (
                <p>
                  Welcome to my portfolio. Explore my work, experience, skills,
                  and education.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* PHOTO */}
        <div className={styles.heroPhoto}>
          {data.photo ? (
            <img src={data.photo} alt={`${name} profile`} />
          ) : (
            <div className={styles.photoPlaceholder}>
              <span>{name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================
          ABOUT
          ===================================================== */}
      {data.about && (
        <section id="about" className={styles.aboutSection}>
          <div className={styles.sectionNumber}>01</div>

          <div className={styles.sectionContent}>
            <p className={styles.sectionLabel}>ABOUT ME</p>
            <h2>Who I am</h2>
            <p className={styles.aboutText}>{data.about}</p>

            <div className={styles.personalInfo}>
              {data.email && (
                <div>
                  <span>Email</span>
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
              )}

              {data.phone && (
                <div>
                  <span>Phone</span>
                  <p>{data.phone}</p>
                </div>
              )}

              {data.location && (
                <div>
                  <span>Location</span>
                  <p>{data.location}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          SKILLS
          ===================================================== */}
      {data.skills.length > 0 && (
        <section id="skills" className={styles.skillsSection}>
          <div className={styles.sectionNumber}>02</div>

          <div className={styles.sectionContent}>
            <p className={styles.sectionLabel}>EXPERTISE</p>
            <h2>Skills & Tools</h2>

            <div className={styles.skillsGrid}>
              {data.skills.map((skill, index) => (
                <div className={styles.skill} key={`${skill}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{skill}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          EXPERIENCE
          ===================================================== */}
      {data.experience.length > 0 && (
        <section id="experience" className={styles.experienceSection}>
          <div className={styles.sectionNumber}>03</div>

          <div className={styles.sectionContent}>
            <p className={styles.sectionLabel}>EXPERIENCE</p>
            <h2>Where I've worked</h2>

            <div className={styles.experienceList}>
              {data.experience.map((experience, index) => (
                <article
                  className={styles.experienceItem}
                  key={`${experience.company}-${index}`}
                >
                  <div className={styles.experienceIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className={styles.experienceMain}>
                    <div className={styles.experienceHeader}>
                      <div>
                        <h3>{experience.role}</h3>
                        <p className={styles.company}>{experience.company}</p>
                      </div>

                      {(experience.startDate || experience.endDate) && (
                        <span className={styles.date}>
                          {experience.startDate || ""}
                          {experience.startDate && experience.endDate && " — "}
                          {experience.endDate || ""}
                        </span>
                      )}
                    </div>

                    {experience.description && (
                      <p className={styles.experienceDescription}>
                        {experience.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          PROJECTS
          ===================================================== */}
      {data.projects.length > 0 && (
        <section id="projects" className={styles.projectsSection}>
          <div className={styles.sectionNumber}>04</div>

          <div className={styles.sectionContent}>
            <p className={styles.sectionLabel}>SELECTED WORK</p>
            <h2>Projects</h2>

            <div className={styles.projectsGrid}>
              {data.projects.map((project, index) => (
                <article
                  className={styles.projectCard}
                  key={`${project.name}-${index}`}
                >
                  <div className={styles.projectTop}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>PROJECT</span>
                  </div>

                  <h3>{project.name}</h3>

                  {project.description && <p>{project.description}</p>}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className={styles.technologies}>
                      {project.technologies.map((technology, techIndex) => (
                        <span key={`${technology}-${techIndex}`}>
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          EDUCATION
          ===================================================== */}
      {data.education.length > 0 && (
        <section id="education" className={styles.educationSection}>
          <div className={styles.sectionNumber}>05</div>

          <div className={styles.sectionContent}>
            <p className={styles.sectionLabel}>EDUCATION</p>
            <h2>Academic Journey</h2>

            <div className={styles.educationList}>
              {data.education.map((education, index) => (
                <article
                  className={styles.educationItem}
                  key={`${education.institution}-${index}`}
                >
                  <div className={styles.educationYear}>
                    {education.startYear || ""}
                    {education.startYear && education.endYear && " — "}
                    {education.endYear || ""}
                  </div>

                  <div>
                    <h3>
                      {education.degree}
                      {education.field && ` in ${education.field}`}
                    </h3>

                    <p>{education.institution}</p>

                    {education.grade && (
                      <span className={styles.grade}>{education.grade}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          CONTACT
          ===================================================== */}
      {(data.email || data.linkedin || data.github || data.phone) && (
        <section id="contact" className={styles.contactSection}>
          <p className={styles.sectionLabel}>06 / CONTACT</p>

          <h2>
            Let's create
            <br />
            something <em>great.</em>
          </h2>

          {data.email && (
            <a className={styles.emailLink} href={`mailto:${data.email}`}>
              {data.email}
            </a>
          )}

          <div className={styles.socialLinks}>
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            )}

            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}

            {data.phone && <span>{data.phone}</span>}
          </div>

          <div className={styles.footer}>
            <span>{name}</span>
            <span>PortfolioForge</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </section>
      )}
    </div>
  );
}

export default ModernTwo;
