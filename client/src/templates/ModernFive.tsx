import styles from "./ModernFive.module.css";
import type { ResumeData } from "../types/resume";

interface ModernFiveProps {
  data: ResumeData;
}

function ModernFive({ data }: ModernFiveProps) {
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
          NAVBAR
          ===================================================== */}
      <nav className={styles.navbar}>
        <a href="#top" className={styles.logo}>
          {initials || "PF"}
        </a>

        <div className={styles.navLinks}>
          {data.about && <a href="#about">About</a>}

          {data.skills.length > 0 && <a href="#skills">Skills</a>}

          {data.experience.length > 0 && <a href="#experience">Experience</a>}

          {data.projects.length > 0 && <a href="#projects">Projects</a>}

          {data.education.length > 0 && <a href="#education">Education</a>}
        </div>

        {(data.email || data.linkedin) && (
          <a href="#contact" className={styles.contactButton}>
            Let's Talk
            <span>↗</span>
          </a>
        )}
      </nav>

      <main id="top">
        {/* =====================================================
            HERO
            ===================================================== */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <span className={styles.heroNumber}>01</span>

            <span className={styles.heroLabel}>
              PORTFOLIO / {new Date().getFullYear()}
            </span>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroTitle}>
              <p className={styles.smallIntro}>Hello, I am</p>

              <h1>
                {name.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`}>{word}</span>
                ))}
              </h1>
            </div>

            <div className={styles.heroSide}>
              <div className={styles.photoFrame}>
                {data.photo ? (
                  <img src={data.photo} alt={`${name} profile`} />
                ) : (
                  <div className={styles.initials}>{initials}</div>
                )}

                <span className={styles.photoNumber}>01</span>
              </div>

              <div className={styles.heroInfo}>
                <p>{role}</p>

                {data.location && <span>Based in {data.location}</span>}
              </div>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <p className={styles.heroStatement}>
              {data.about ||
                "I create thoughtful digital experiences through design, technology and ideas."}
            </p>

            <a href="#projects" className={styles.scrollLink}>
              Explore work
              <span>↓</span>
            </a>
          </div>
        </section>

        {/* =====================================================
            ABOUT
            ===================================================== */}
        {data.about && (
          <section id="about" className={styles.aboutSection}>
            <div className={styles.sectionMeta}>
              <span>02</span>
              <span>ABOUT</span>
            </div>

            <div className={styles.aboutContent}>
              <h2>
                A developer with
                <br />
                <em>ideas and intent.</em>
              </h2>

              <div className={styles.aboutText}>
                <p>{data.about}</p>

                <div className={styles.personalDetails}>
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
            </div>
          </section>
        )}

        {/* =====================================================
            SKILLS
            ===================================================== */}
        {data.skills.length > 0 && (
          <section id="skills" className={styles.skillsSection}>
            <div className={styles.sectionMeta}>
              <span>03</span>
              <span>EXPERTISE</span>
            </div>

            <div className={styles.skillsContent}>
              <h2>
                Tools I
                <br />
                <em>work with.</em>
              </h2>

              <div className={styles.skillList}>
                {data.skills.map((skill, index) => (
                  <div className={styles.skillRow} key={`${skill}-${index}`}>
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
            <div className={styles.sectionMeta}>
              <span>04</span>
              <span>EXPERIENCE</span>
            </div>

            <div className={styles.experienceContent}>
              <h2>
                Where I've
                <br />
                <em>worked.</em>
              </h2>

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

                          <p>{experience.company}</p>
                        </div>

                        <span>
                          {experience.startDate || ""}
                          {experience.startDate && experience.endDate && " — "}
                          {experience.endDate || ""}
                        </span>
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
            <div className={styles.sectionMeta}>
              <span>05</span>
              <span>SELECTED WORK</span>
            </div>

            <div className={styles.projectsHeader}>
              <h2>
                Things I've
                <br />
                <em>created.</em>
              </h2>

              <p>
                A selection of projects, experiments and digital products built
                with purpose.
              </p>
            </div>

            <div className={styles.projectList}>
              {data.projects.map((project, index) => (
                <article
                  className={styles.projectItem}
                  key={`${project.name}-${index}`}
                >
                  <div className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className={styles.projectDetails}>
                    <h3>{project.name}</h3>

                    {project.description && <p>{project.description}</p>}

                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className={styles.technologyList}>
                          {project.technologies.map((technology, techIndex) => (
                            <span key={`${technology}-${techIndex}`}>
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  <div className={styles.projectIcon}>↗</div>
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
            <div className={styles.sectionMeta}>
              <span>06</span>
              <span>EDUCATION</span>
            </div>

            <div className={styles.educationContent}>
              <h2>
                Where I
                <br />
                <em>learned.</em>
              </h2>

              <div className={styles.educationList}>
                {data.education.map((education, index) => (
                  <article
                    className={styles.educationItem}
                    key={`${education.institution}-${index}`}
                  >
                    <span className={styles.educationIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

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

                    <span className={styles.educationYears}>
                      {education.startYear || ""}
                      {education.startYear && education.endYear && " — "}
                      {education.endYear || ""}
                    </span>
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
          <div className={styles.contactTop}>
            <span>07</span>
            <span>CONTACT</span>
          </div>

          <div className={styles.contactContent}>
            <p className={styles.contactIntro}>Have a project in mind?</p>

            <h2>
              Let's make
              <br />
              <em>something.</em>
            </h2>

            {data.email && (
              <a href={`mailto:${data.email}`} className={styles.emailLink}>
                {data.email}
                <span>↗</span>
              </a>
            )}
          </div>

          <div className={styles.contactFooter}>
            <div className={styles.socialLinks}>
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

            <div className={styles.footerRight}>
              <span>{name}</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ModernFive;
