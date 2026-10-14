import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import heroImage from "../assets/reg3.png";

function Home() {
  const navigate = useNavigate();
  const heroScrollRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = heroScrollRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const animationHeight = window.innerHeight * 2;
      const scrollTop = Math.max(0, -rect.top);
      const current = Math.min(scrollTop, animationHeight);
      const value = animationHeight > 0 ? current / animationHeight : 0;
      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const slideOneX = -(progress * 100);
  const slideTwoX = 100 - progress * 100;

  return (
    <main className={styles.home}>
      <section ref={heroScrollRef} className={styles.heroScroll}>
        <div className={styles.hero}>
          <div
            className={styles.heroBackground}
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          >
            <div className={styles.imageOverlay} />
          </div>
          <div
            className={styles.slideOne}
            style={{
              transform: `translate3d(${slideOneX}%, 0, 0)`,
            }}
          >
            <div className={styles.heroText}>
              <span className={styles.eyebrow}>PORTFOLIOFORGE</span>
              <h1>
                Build a Portfolio
                <br />
                <span>That Gets You Noticed.</span>
              </h1>
              <p>
                Create a professional portfolio, showcase your skills and
                projects, and make a strong impression on recruiters and
                employers.
              </p>
            </div>
            <div className={styles.lowerSection}>
              <div className={styles.lowerText}>
                <span>CREATE</span>
                <span>SHOWCASE</span>
                <span>GET NOTICED</span>
              </div>
              <p>
                Your skills deserve more than a resume.
                <br />
                Build something that represents you.
              </p>
            </div>
            <button
              type="button"
              className={styles.getStarted}
              onClick={() => navigate("/Register")}
            >
              <span>Get Started</span>
              <strong>↗</strong>
            </button>
          </div>
          <div
            className={styles.slideTwo}
            style={{
              transform: `translate3d(${slideTwoX}%, 0, 0)`,
            }}
          >
            <div className={styles.slideTwoContent}>
              <div className={styles.slideTwoHeader}>
                <span className={styles.sectionLabel}>WHY PORTFOLIOFORGE?</span>
                <h2>
                  Everything You Need to
                  <br />
                  <span>Build a Portfolio That Stands Out.</span>
                </h2>
                <p>
                  Create a professional portfolio without starting from scratch.
                  Showcase your skills, projects, education and experience in
                  one place.
                </p>
              </div>
              <div className={styles.featureGrid}>
                <article
                  className={`${styles.featureCard} ${styles.glassCard}`}
                >
                  <span className={styles.cardNumber}>01</span>
                  <div className={styles.cardContent}>
                    <h3>Professional Templates</h3>
                    <p>
                      Choose modern, professionally designed templates and
                      create a polished online presence.
                    </p>
                  </div>
                  <span className={styles.cardArrow}>↗</span>
                </article>
                <article
                  className={`${styles.featureCard} ${styles.opaqueCard}`}
                >
                  <span className={styles.cardNumber}>02</span>
                  <div className={styles.cardContent}>
                    <h3>Easy to Build</h3>
                    <p>
                      Add your information, skills, projects and experience
                      without complicated coding.
                    </p>
                  </div>
                  <span className={styles.cardArrow}>↗</span>
                </article>
                <article
                  className={`${styles.featureCard} ${styles.glassCard}`}
                >
                  <span className={styles.cardNumber}>03</span>
                  <div className={styles.cardContent}>
                    <h3>Showcase Your Work</h3>
                    <p>
                      Present your projects, achievements, certifications and
                      skills in a powerful way.
                    </p>
                  </div>
                  <span className={styles.cardArrow}>↗</span>
                </article>
                <article
                  className={`${styles.featureCard} ${styles.opaqueCard}`}
                >
                  <span className={styles.cardNumber}>04</span>
                  <div className={styles.cardContent}>
                    <h3>Fully Responsive</h3>
                    <p>
                      Your portfolio looks great on desktops, tablets and mobile
                      devices.
                    </p>
                  </div>
                  <span className={styles.cardArrow}>↗</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionThree}>
        <div className={styles.sectionThreeHeader}>
          <span className={styles.sectionThreeLabel}>HOW IT WORKS</span>
          <h2>
            Build Your Portfolio
            <br />
            <strong>In Three Simple Steps.</strong>
          </h2>
          <p>
            From your first idea to a professional online presence,
            PortfolioForge makes the entire process simple.
          </p>
        </div>
        <div className={styles.stepsContainer}>
          <article className={styles.stepCard}>
            <div className={styles.stepTop}>
              <span className={styles.stepNumber}>01</span>
              <span className={styles.stepArrow}>↗</span>
            </div>
            <div className={styles.stepContent}>
              <span className={styles.stepMiniLabel}>START HERE</span>
              <h3>Choose a Template</h3>
              <p>
                Pick a professionally designed template that matches your
                personality, career and personal brand.
              </p>
            </div>
          </article>
          <article className={`${styles.stepCard} ${styles.stepCardPeach}`}>
            <div className={styles.stepTop}>
              <span className={styles.stepNumber}>02</span>
              <span className={styles.stepArrow}>↗</span>
            </div>
            <div className={styles.stepContent}>
              <span className={styles.stepMiniLabel}>MAKE IT YOURS</span>
              <h3>Add Your Content</h3>
              <p>
                Add your profile, skills, projects, education, experience and
                everything that makes you unique.
              </p>
            </div>
          </article>
          <article className={styles.stepCard}>
            <div className={styles.stepTop}>
              <span className={styles.stepNumber}>03</span>
              <span className={styles.stepArrow}>↗</span>
            </div>
            <div className={styles.stepContent}>
              <span className={styles.stepMiniLabel}>GO LIVE</span>
              <h3>Publish & Share</h3>
              <p>
                Publish your portfolio and share your professional identity with
                recruiters, employers and the world.
              </p>
            </div>
          </article>
        </div>
        <div className={styles.stepsFooter}>
          <span>YOUR STORY</span>
          <div className={styles.footerLine} />
          <span>YOUR PORTFOLIO</span>
          <div className={styles.footerLine} />
          <span>YOUR FUTURE</span>
        </div>
      </section>
      <section className={styles.portfolioHero}>
        <div className={styles.portfolioHeroContent}>
          <p className={styles.portfolioLabel}>PORTFOLIOFORGE</p>

          <h1 className={styles.portfolioTitle}>
            YOUR STORY.
            <br />
            <span>YOUR PORTFOLIO.</span>
          </h1>

          <p className={styles.portfolioText}>
            Build a portfolio that tells your story,
            <br />
            showcases your skills, and makes you stand out.
          </p>
        </div>

        <div className={styles.portfolioCircleLeft}></div>
        <div className={styles.portfolioCircleRight}></div>

        <div className={styles.portfolioScroll}>
          SCROLL
          <span>↓</span>
        </div>
      </section>

      <section className={styles.portfolioBrand}>
        <h2>PortfolioForge</h2>

        <p>
          Build your portfolio.
          <span> Showcase your talent.</span>
        </p>

        <div className={styles.portfolioPF}>PF</div>
      </section>
    </main>
  );
}

export default Home;
