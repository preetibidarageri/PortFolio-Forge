import styles from "./ModernFour.module.css";
import type { ResumeData } from "../types/resume";

interface ModernFourProps {
  data: ResumeData;
}

function ModernFour({ data }: ModernFourProps) {
  const name = data.name || "Your Name";
  const role = data.role || "Software Developer";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.portfolio}>
      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className={styles.navbar}>
        <a href="#top" className={styles.logo}>
          PF.
        </a>

        <div className={styles.navLinks}>
          {data.about && <a href="#about">About</a>}

          {data.skills.length > 0 && <a href="#skills">Skills</a>}

          {data.experience.length > 0 && <a href="#experience">Experience</a>}

          {data.projects.length > 0 && <a href="#projects">Projects</a>}

          {data.education.length > 0 && <a href="#education">Education</a>}
        </div>

        {(data.email || data.linkedin) && (
          <a href="#contact" className={styles.navContact}>
            Contact <span>↗</span>
          </a>
        )}
      </nav>

      {/* =====================================================
          HERO
          ===================================================== */}

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroDecorOne}></div>
          <div className={styles.heroDecorTwo}></div>

          <div className={styles.heroContent}>
            <div className={styles.availableBadge}>
              <span></span>
              Available for opportunities
            </div>

            <p className={styles.eyebrow}>HELLO, I'M</p>

            <h1>
              {name.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>{word}</span>
              ))}
            </h1>

            <div className={styles.heroBottom}>
              <div>
                <p className={styles.role}>{role}</p>

                {data.location && (
                  <p className={styles.location}>📍 {data.location}</p>
                )}
              </div>

              <p className={styles.heroAbout}>
                {data.about ||
                  "I build digital experiences and meaningful products with technology and creativity."}
              </p>
            </div>

            <div className={styles.heroButtons}>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className={styles.primaryButton}
                >
                  Let's work together <span>↗</span>
                </a>
              )}

              <a href="#projects" className={styles.secondaryButton}>
                View my work <span>↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroCardTop}>
              <span>PROFILE</span>
              <span>04 / 06</span>
            </div>

            <div className={styles.profileImage}>
              {data.photo ? (
                <img src={data.photo} alt={`${name} profile`} />
              ) : (
                <div className={styles.initials}>{initials}</div>
              )}
            </div>

            <div className={styles.heroCardBottom}>
              <strong>{role}</strong>

              {data.location && <span>{data.location}</span>}
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
            ===================================================== */}

        {data.about && (
          <section id="about" className={styles.aboutSection}>
            <div className={styles.sectionHeading}>
              <span>01 / ABOUT</span>
              <h2>
                A little bit
                <em> about me.</em>
              </h2>
            </div>

            <div className={styles.aboutGrid}>
              <div className={styles.aboutStatement}>
                <p>{data.about}</p>
              </div>

              <div className={styles.contactMini}>
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
            <div className={styles.sectionHeading}>
              <span>02 / SKILLS</span>

              <h2>
                What I<em> know.</em>
              </h2>
            </div>

            <div className={styles.skillCards}>
              {data.skills.map((skill, index) => (
                <div className={styles.skillCard} key={`${skill}-${index}`}>
                  <span className={styles.skillNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{skill}</strong>

                  <span className={styles.skillPlus}>+</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            EXPERIENCE
            ===================================================== */}

        {data.experience.length > 0 && (
          <section id="experience" className={styles.experienceSection}>
            <div className={styles.sectionHeading}>
              <span>03 / EXPERIENCE</span>

              <h2>
                My
                <em> journey.</em>
              </h2>
            </div>

            <div className={styles.experienceCards}>
              {data.experience.map((experience, index) => (
                <article
                  className={styles.experienceCard}
                  key={`${experience.company}-${index}`}
                >
                  <div className={styles.experienceTop}>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <span>
                      {experience.startDate || ""}
                      {experience.startDate && experience.endDate && " — "}
                      {experience.endDate || ""}
                    </span>
                  </div>

                  <div className={styles.experienceBody}>
                    <h3>{experience.role}</h3>

                    <p className={styles.company}>{experience.company}</p>

                    {experience.description && (
                      <p className={styles.description}>
                        {experience.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            PROJECTS
            ===================================================== */}

        {data.projects.length > 0 && (
          <section id="projects" className={styles.projectsSection}>
            <div className={styles.sectionHeading}>
              <span>04 / PROJECTS</span>

              <h2>
                Things I've
                <em> built.</em>
              </h2>
            </div>

            <div className={styles.projectGrid}>
              {data.projects.map((project, index) => (
                <article
                  className={`${styles.projectCard} ${
                    index % 3 === 1 ? styles.projectCardLarge : ""
                  }`}
                  key={`${project.name}-${index}`}
                >
                  <div className={styles.projectNumber}>0{index + 1}</div>

                  <div className={styles.projectContent}>
                    <h3>{project.name}</h3>

                    {project.description && <p>{project.description}</p>}

                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className={styles.tags}>
                          {project.technologies.map((technology, techIndex) => (
                            <span key={`${technology}-${techIndex}`}>
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  <div className={styles.projectArrow}>↗</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            EDUCATION
            ===================================================== */}

        {data.education.length > 0 && (
          <section id="education" className={styles.educationSection}>
            <div className={styles.sectionHeading}>
              <span>05 / EDUCATION</span>

              <h2>
                Where I<em> learned.</em>
              </h2>
            </div>

            <div className={styles.educationCards}>
              {data.education.map((education, index) => (
                <article
                  className={styles.educationCard}
                  key={`${education.institution}-${index}`}
                >
                  <div className={styles.educationTop}>
                    <span>0{index + 1}</span>

                    <span>
                      {education.startYear || ""}
                      {education.startYear && education.endYear && " — "}
                      {education.endYear || ""}
                    </span>
                  </div>

                  <h3>
                    {education.degree}

                    {education.field && ` in ${education.field}`}
                  </h3>

                  <p>{education.institution}</p>

                  {education.grade && (
                    <span className={styles.grade}>{education.grade}</span>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            CONTACT
            ===================================================== */}

        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactBlob}></div>

          <span className={styles.contactLabel}>06 / LET'S CONNECT</span>

          <h2>
            Got an idea?
            <br />
            <em>Let's talk.</em>
          </h2>

          {data.email && (
            <a href={`mailto:${data.email}`} className={styles.bigEmail}>
              {data.email} ↗
            </a>
          )}

          <div className={styles.socials}>
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

            {data.phone && <span>{data.phone}</span>}
          </div>

          <footer className={styles.footer}>
            <span>{name}</span>

            <span>Made with PortfolioForge</span>

            <span>© {new Date().getFullYear()}</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default ModernFour;
