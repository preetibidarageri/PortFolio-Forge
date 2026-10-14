import styles from "./ModernThree.module.css";
import type { ResumeData } from "../types/resume";

interface ModernThreeProps {
  data: ResumeData;
}

function ModernThree({ data }: ModernThreeProps) {
  const name = data.name || "Your Name";
  const role = data.role || "Creative Developer";

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
          TOP BAR
          ===================================================== */}

      <header className={styles.topBar}>
        <div className={styles.brand}>PF / 03</div>

        <div className={styles.topRole}>{role}</div>

        <a href="#contact" className={styles.contactLink}>
          Let's talk <span>↗</span>
        </a>
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroNumber}>01</div>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow}>PORTFOLIO / INTRODUCTION</p>

          <h1>
            {name.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </h1>

          <div className={styles.heroMeta}>
            <div className={styles.roleBlock}>
              <span>ROLE</span>
              <strong>{role}</strong>
            </div>

            {data.location && (
              <div className={styles.roleBlock}>
                <span>BASED IN</span>
                <strong>{data.location}</strong>
              </div>
            )}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualFrame}>
            {data.photo ? (
              <img src={data.photo} alt={`${name} profile`} />
            ) : (
              <div className={styles.visualPlaceholder}>
                <span>{initials}</span>
              </div>
            )}

            <div className={styles.visualLabel}>
              <span>SELECTED</span>
              <span>WORK</span>
            </div>
          </div>

          <div className={styles.circleText}>
            <span>CREATIVE • DIGITAL • DEVELOPMENT • </span>
          </div>
        </div>

        <div className={styles.heroDescription}>
          <p>
            {data.about ||
              "A developer focused on creating thoughtful digital experiences, useful products and clean solutions."}
          </p>

          <a href="#about" className={styles.scrollLink}>
            Scroll to explore <span>↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================
          ABOUT
          ===================================================== */}

      {data.about && (
        <section id="about" className={styles.aboutSection}>
          <div className={styles.sectionNumber}>02</div>

          <div className={styles.aboutLabel}>
            <span>ABOUT</span>
            <span>01 — 01</span>
          </div>

          <div className={styles.aboutContent}>
            <h2>
              Turning ideas into
              <em> digital experiences.</em>
            </h2>

            <p>{data.about}</p>

            <div className={styles.aboutDetails}>
              {data.email && (
                <div>
                  <span>EMAIL</span>
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
              )}

              {data.phone && (
                <div>
                  <span>PHONE</span>
                  <p>{data.phone}</p>
                </div>
              )}

              {data.location && (
                <div>
                  <span>LOCATION</span>
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
          <div className={styles.sectionNumber}>03</div>

          <div className={styles.skillsContent}>
            <div className={styles.skillsHeading}>
              <span>EXPERTISE</span>
              <h2>Things I work with.</h2>
            </div>

            <div className={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <div className={styles.skillItem} key={`${skill}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <strong>{skill}</strong>

                  <span className={styles.skillArrow}>↗</span>
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
          <div className={styles.sectionNumber}>04</div>

          <div className={styles.experienceContent}>
            <div className={styles.sectionHeading}>
              <span>EXPERIENCE</span>

              <h2>
                Places,
                <br />
                people & work.
              </h2>
            </div>

            <div className={styles.experienceList}>
              {data.experience.map((experience, index) => (
                <article
                  className={styles.experienceItem}
                  key={`${experience.company}-${index}`}
                >
                  <div className={styles.experienceNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className={styles.experienceInfo}>
                    <h3>{experience.role}</h3>

                    <p className={styles.experienceCompany}>
                      {experience.company}
                    </p>

                    {experience.description && (
                      <p className={styles.experienceDescription}>
                        {experience.description}
                      </p>
                    )}
                  </div>

                  <div className={styles.experienceDate}>
                    {experience.startDate && (
                      <span>{experience.startDate}</span>
                    )}

                    {experience.startDate && experience.endDate && (
                      <span> — </span>
                    )}

                    {experience.endDate && <span>{experience.endDate}</span>}
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
          <div className={styles.sectionNumber}>05</div>

          <div className={styles.projectsContent}>
            <div className={styles.projectsHeading}>
              <span>SELECTED PROJECTS</span>

              <h2>
                Work that
                <br />
                speaks.
              </h2>
            </div>

            <div className={styles.projectStack}>
              {data.projects.map((project, index) => (
                <article
                  className={styles.projectCard}
                  key={`${project.name}-${index}`}
                >
                  <div className={styles.projectNumber}>0{index + 1}</div>

                  <div className={styles.projectInfo}>
                    <h3>{project.name}</h3>

                    {project.description && <p>{project.description}</p>}

                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className={styles.projectTags}>
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
          </div>
        </section>
      )}

      {/* =====================================================
          EDUCATION
          ===================================================== */}

      {data.education.length > 0 && (
        <section id="education" className={styles.educationSection}>
          <div className={styles.sectionNumber}>06</div>

          <div className={styles.educationContent}>
            <div className={styles.sectionHeading}>
              <span>EDUCATION</span>

              <h2>
                Learning
                <br />
                never stops.
              </h2>
            </div>

            <div className={styles.educationGrid}>
              {data.education.map((education, index) => (
                <article
                  className={styles.educationCard}
                  key={`${education.institution}-${index}`}
                >
                  <span className={styles.educationIndex}>0{index + 1}</span>

                  <div>
                    <h3>
                      {education.degree}

                      {education.field && ` in ${education.field}`}
                    </h3>

                    <p>{education.institution}</p>

                    {(education.startYear || education.endYear) && (
                      <span className={styles.educationDate}>
                        {education.startYear || ""}
                        {education.startYear && education.endYear && " — "}
                        {education.endYear || ""}
                      </span>
                    )}

                    {education.grade && (
                      <span className={styles.educationGrade}>
                        {education.grade}
                      </span>
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

      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactNumber}>07</div>

        <p className={styles.contactLabel}>HAVE A PROJECT IN MIND?</p>

        <h2>
          Let's make
          <br />
          something <em>meaningful.</em>
        </h2>

        {data.email && (
          <a href={`mailto:${data.email}`} className={styles.contactEmail}>
            {data.email}
          </a>
        )}

        <div className={styles.contactLinks}>
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

        <footer className={styles.footer}>
          <span>{name}</span>

          <span>PORTFOLIOFORGE / 03</span>

          <span>© {new Date().getFullYear()}</span>
        </footer>
      </section>
    </div>
  );
}

export default ModernThree;
