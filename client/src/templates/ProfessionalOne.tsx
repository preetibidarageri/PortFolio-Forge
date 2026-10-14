import styles from "./ProfessionalOne.module.css";
import type { ResumeData } from "../types/resume";

interface ProfessionalOneProps {
  data: ResumeData;
}

function ProfessionalOne({ data }: ProfessionalOneProps) {
  const name = data.name || "Your Name";
  const role = data.role || "Software Developer";

  return (
    <div className={styles.portfolio}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className={styles.header}>
        <div>
          <h1>{name}</h1>
          <p>{role}</p>
        </div>

        <div className={styles.contact}>
          {data.email && <span>{data.email}</span>}

          {data.phone && <span>{data.phone}</span>}

          {data.location && <span>{data.location}</span>}
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className={styles.content}>
        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside>
          {/* PROFILE */}

          {data.about && (
            <section>
              <h3>PROFILE</h3>

              <p>{data.about}</p>
            </section>
          )}

          {/* SKILLS */}

          {data.skills.length > 0 && (
            <section>
              <h3>SKILLS</h3>

              <ul>
                {data.skills.map((skill, index) => (
                  <li key={`${skill}-${index}`}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* CONTACT */}

          {(data.email || data.phone || data.location) && (
            <section>
              <h3>CONTACT</h3>

              {data.email && <p>{data.email}</p>}

              {data.phone && <p>{data.phone}</p>}

              {data.location && <p>{data.location}</p>}
            </section>
          )}

          {/* SOCIAL LINKS */}

          {(data.linkedin || data.github) && (
            <section>
              <h3>LINKS</h3>

              {data.linkedin && (
                <p>
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </p>
              )}

              {data.github && (
                <p>
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </p>
              )}
            </section>
          )}
        </aside>

        {/* ===================================================
            MAIN
        =================================================== */}

        <main>
          {/* =================================================
              EXPERIENCE
          ================================================= */}

          {data.experience.length > 0 && (
            <section>
              <h2>Experience</h2>

              {data.experience.map((experience, index) => (
                <div
                  className={styles.item}
                  key={`${experience.company}-${index}`}
                >
                  <div className={styles.date}>
                    {experience.startDate || ""}
                    {experience.startDate && experience.endDate ? " — " : ""}
                    {experience.endDate || ""}
                  </div>

                  <div>
                    <h3>{experience.role}</h3>

                    <p className={styles.company}>{experience.company}</p>

                    {experience.description && <p>{experience.description}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* =================================================
              PROJECTS
          ================================================= */}

          {data.projects.length > 0 && (
            <section>
              <h2>Projects</h2>

              {data.projects.map((project, index) => (
                <div
                  className={styles.project}
                  key={`${project.name}-${index}`}
                >
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
                </div>
              ))}
            </section>
          )}

          {/* =================================================
              EDUCATION
          ================================================= */}

          {data.education.length > 0 && (
            <section>
              <h2>Education</h2>

              {data.education.map((education, index) => (
                <div
                  className={styles.item}
                  key={`${education.institution}-${index}`}
                >
                  <div className={styles.date}>
                    {education.startYear || ""}
                    {education.startYear && education.endYear ? " — " : ""}
                    {education.endYear || ""}
                  </div>

                  <div>
                    <h3>
                      {education.degree}

                      {education.field ? ` in ${education.field}` : ""}
                    </h3>

                    <p className={styles.company}>{education.institution}</p>

                    {education.grade && <p>Grade: {education.grade}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* =================================================
              FALLBACK
          ================================================= */}

          {data.experience.length === 0 &&
            data.projects.length === 0 &&
            data.education.length === 0 && (
              <section>
                <h2>Portfolio</h2>

                <p>
                  Your resume information will appear here once it has been
                  parsed.
                </p>
              </section>
            )}
        </main>
      </div>
    </div>
  );
}

export default ProfessionalOne;
