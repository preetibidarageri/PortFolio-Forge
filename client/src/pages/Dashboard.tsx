import styles from "./dashboard.module.css";
import dashboardCenter from "../assets/d3.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { templates } from "../templates/templates";
import type { ResumeData } from "../types/resume";
import { extractResumeData } from "../utils/resumeParser";
import PortfolioPhotoUpload from "../components/PortfolioPhotoUpload";
function Dashboard() {
  const navigate = useNavigate();

  /* =========================================================
     RESUME DATA
     ========================================================= */

  // Parsed resume data is stored here.
  // It will NOT be displayed in the Dashboard.
  // It will be passed to Portfolio Preview later.
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  /* =========================================================
     USER
     ========================================================= */

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const userName = user?.name || "there";

  /* =========================================================
     REFS
     ========================================================= */

  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const templateSectionRef = useRef<HTMLDivElement>(null);

  const resumeDataSectionRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* =========================================================
     RESUME STATE
     ========================================================= */

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isExtracting, setIsExtracting] = useState(false);

  /* =========================================================
     TEMPLATE STATE
     ========================================================= */

  const [selectedCategory, setSelectedCategory] = useState<
    "modern" | "professional"
  >("modern");

  const [templateIndex, setTemplateIndex] = useState(0);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );

  /* =========================================================
     RESUME UPLOAD + EXTRACTION
     ========================================================= */

  const handleResumeSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    /* ---------------------------------------------------------
       ALLOWED FILE TYPES
       --------------------------------------------------------- */

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX resume.");

      e.target.value = "";

      return;
    }

    try {
      /* -------------------------------------------------------
         START EXTRACTION
         ------------------------------------------------------- */

      setResumeFile(file);

      setResumeData(null);

      setSelectedTemplateId(null);

      setIsExtracting(true);

      /* -------------------------------------------------------
         PARSE RESUME
         ------------------------------------------------------- */

      const extractedData = await extractResumeData(file);

      console.log("Extracted resume data:", extractedData);

      /* -------------------------------------------------------
         HOLD PARSED DATA IN STATE
         ------------------------------------------------------- */

      setResumeData(extractedData);

      /* -------------------------------------------------------
         MOVE TO TEMPLATE SECTION
         ------------------------------------------------------- */

      setTimeout(() => {
        templateSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);
    } catch (error) {
      console.error("Resume extraction failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to analyze the resume.",
      );

      setResumeFile(null);

      setResumeData(null);

      setSelectedTemplateId(null);

      e.target.value = "";
    } finally {
      setIsExtracting(false);
    }
  };

  /* =========================================================
     FILTER TEMPLATES BY CATEGORY
     ========================================================= */

  const categoryTemplates = templates.filter(
    (template) => template.category === selectedCategory,
  );

  /* =========================================================
     CURRENT TEMPLATE
     ========================================================= */

  const currentTemplate = categoryTemplates[templateIndex];

  /* =========================================================
     CATEGORY CHANGE
     ========================================================= */

  const handleCategoryChange = (category: "modern" | "professional") => {
    setSelectedCategory(category);

    setTemplateIndex(0);

    // Clear previously selected template
    setSelectedTemplateId(null);
  };

  /* =========================================================
     PREVIOUS TEMPLATE
     ========================================================= */

  const handlePreviousTemplate = () => {
    if (categoryTemplates.length === 0) return;

    setTemplateIndex((prev) =>
      prev === 0 ? categoryTemplates.length - 1 : prev - 1,
    );

    // Changing template means the previous selection is no longer active
    setSelectedTemplateId(null);
  };

  /* =========================================================
     NEXT TEMPLATE
     ========================================================= */

  const handleNextTemplate = () => {
    if (categoryTemplates.length === 0) return;

    setTemplateIndex((prev) =>
      prev === categoryTemplates.length - 1 ? 0 : prev + 1,
    );

    // Changing template means the previous selection is no longer active
    setSelectedTemplateId(null);
  };

  /* =========================================================
     SELECT TEMPLATE
     ========================================================= */

  const handleSelectTemplate = () => {
    if (!resumeData) {
      alert("Please upload and analyze your resume first.");
      return;
    }

    if (!currentTemplate) {
      alert("Please select a template.");
      return;
    }

    setSelectedTemplateId(currentTemplate.id);

    setTimeout(() => {
      resumeDataSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };
  /* =========================================================
     SCROLL TO UPLOAD
     ========================================================= */

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =========================================================
     VIEW PORTFOLIO
     ========================================================= */

  const handleViewPortfolio = () => {
    if (!resumeData) {
      alert("Resume data is missing. Please upload your resume again.");
      return;
    }

    if (!selectedTemplateId) {
      alert("Please select a template first.");
      return;
    }

    console.log("========== PORTFOLIO HANDOFF ==========");
    console.log("Resume Data:", resumeData);
    console.log("Selected Template:", selectedTemplateId);
    console.log("========================================");

    navigate("/portfolio-preview", {
      state: {
        resumeData: resumeData,
        selectedTemplateId: selectedTemplateId,
      },
    });
  };
  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <div className={styles.heroContainer}>
        <div className={styles.bgImage}></div>

        <div className={styles.bgOverlay}></div>

        <div className={styles.heroContent}>
          {/* WELCOME */}

          <h2 className={styles.welcomeHeading}>Welcome, {userName}</h2>

          {/* MAIN TITLE */}

          <h1 className={styles.mainTitle}>
            Build Your Future: Professional
            <br />
            Resumes & Portfolios Made Easy.
          </h1>

          {/* SUBTITLE */}

          <p className={styles.subTitle}>
            Get hired faster with a modern portfolio and a professionally
            designed resume.
          </p>

          {/* HERO CARDS */}

          <div className={styles.cardsContainer}>
            {/* =================================================
                LEFT CARD
                ================================================= */}

            <div className={styles.leftCard}>
              <h2 className={styles.cardTitle}>Build Your Portfolio</h2>

              <p className={styles.cardDesc}>
                Highlight your work, showcase skills, and attract top recruiters
                with an online profile.
              </p>

              <div className={styles.cardActionWrapper}>
                <span className={styles.actionLabel}>
                  Upload Resume to start
                </span>

                <button
                  type="button"
                  className={styles.burgundyBtn}
                  onClick={scrollToUpload}
                >
                  <svg
                    className={styles.btnIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.05 10.04 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" />
                  </svg>
                  Upload Your Resume
                </button>
              </div>
            </div>

            {/* =================================================
                CENTER IMAGE
                ================================================= */}

            <div className={styles.centerCard}>
              <img
                src={dashboardCenter}
                alt="Professional presenting resume"
                className={styles.centerImg}
              />
            </div>

            {/* =================================================
                RIGHT CARD
                ================================================= */}

            <div className={styles.rightCard}>
              <h2 className={styles.cardTitle}>Create Your Portfolio</h2>

              <p className={styles.cardDesc}>
                Input your experience and details. Choose from templates to
                craft your perfect CV.
              </p>

              <div className={styles.cardActionWrapper}>
                <span className={styles.actionLabel}>
                  Enter Data to Build Your Resume
                </span>

                <button
                  type="button"
                  className={styles.greenBtn}
                  onClick={() => navigate("/build-portfolio")}
                >
                  <svg
                    className={styles.btnIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                  </svg>
                  Build Your Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* =====================================================
          STEP 01 — UPLOAD RESUME
          ===================================================== */}
      <section ref={uploadSectionRef} className={styles.uploadSection}>
        <div className={styles.uploadSectionContent}>
          <p className={styles.sectionLabel}>STEP 01</p>

          <h2>Upload Your Resume</h2>

          <p>
            Start building your professional portfolio by uploading your
            existing resume.
          </p>

          <div className={styles.uploadBox}>
            {/* UPLOAD ICON */}

            <div className={styles.uploadIcon}>↑</div>

            {/* FILE NAME */}

            <h3>{resumeFile ? resumeFile.name : "Drop your resume here"}</h3>

            {/* FILE STATUS */}

            <p>
              {isExtracting
                ? "Analyzing your resume..."
                : resumeFile
                  ? "Resume analyzed successfully"
                  : "PDF or DOCX files are supported"}
            </p>

            {/* LOADING */}

            {isExtracting && (
              <div className={styles.resumeLoading}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {/* HIDDEN FILE INPUT */}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleResumeSelect}
              style={{ display: "none" }}
            />

            {/* CHOOSE FILE BUTTON */}

            <button
              type="button"
              className={styles.chooseFileButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={isExtracting}
            >
              {isExtracting
                ? "Analyzing Resume..."
                : resumeFile
                  ? "Change Resume"
                  : "Choose Resume"}
            </button>
          </div>
        </div>
      </section>
      {/* =====================================================
          STEP 02 — SELECT TEMPLATE
          ===================================================== */}
      <section ref={templateSectionRef} className={styles.templateSection}>
        <div className={styles.templateSectionContent}>
          {/* HEADING */}

          <div className={styles.templateHeading}>
            <p className={styles.sectionLabel}>STEP 02</p>

            <h2>Select Your Template</h2>

            <p>Choose a design that matches your professional style.</p>
          </div>

          {/* TEMPLATE SELECTOR */}

          <div className={styles.templateSelector}>
            {/* =================================================
                LEFT CATEGORY PANEL
                ================================================= */}

            <div className={styles.categoryPanel}>
              <h3>Choose Style</h3>

              <div className={styles.categoryButtonsWrapper}>
                {/* MODERN */}

                <button
                  type="button"
                  className={`${styles.categoryButton} ${
                    selectedCategory === "modern" ? styles.activeCategory : ""
                  }`}
                  onClick={() => handleCategoryChange("modern")}
                >
                  <span>Modern</span>

                  <span>01</span>
                </button>

                {/* PROFESSIONAL */}

                <button
                  type="button"
                  className={`${styles.categoryButton} ${
                    selectedCategory === "professional"
                      ? styles.activeCategory
                      : ""
                  }`}
                  onClick={() => handleCategoryChange("professional")}
                >
                  <span>Professional</span>

                  <span>02</span>
                </button>
              </div>
            </div>

            {/* =================================================
                RIGHT TEMPLATE AREA
                ================================================= */}

            <div className={styles.templatePreviewArea}>
              {/* TOP BAR */}

              <div className={styles.templateTopBar}>
                <span className={styles.templateCounter}>
                  Template{" "}
                  {categoryTemplates.length > 0 ? templateIndex + 1 : 0} /{" "}
                  {categoryTemplates.length}
                </span>

                <span className={styles.categoryName}>{selectedCategory}</span>
              </div>

              {/* TEMPLATE IMAGE */}

              <div className={styles.previewWindow}>
                {/* PREVIOUS */}

                <button
                  type="button"
                  aria-label="Previous template"
                  className={`${styles.arrowButton} ${styles.leftArrow}`}
                  onClick={handlePreviousTemplate}
                  disabled={categoryTemplates.length <= 1}
                >
                  ←
                </button>

                {/* TEMPLATE IMAGE */}

                <div className={styles.templateMockup}>
                  {currentTemplate?.image ? (
                    <img
                      src={currentTemplate.image}
                      alt={currentTemplate.name}
                      className={styles.templateImage}
                    />
                  ) : (
                    <div className={styles.noTemplateImage}>
                      Template Preview
                    </div>
                  )}
                </div>

                {/* NEXT */}

                <button
                  type="button"
                  aria-label="Next template"
                  className={`${styles.arrowButton} ${styles.rightArrow}`}
                  onClick={handleNextTemplate}
                  disabled={categoryTemplates.length <= 1}
                >
                  →
                </button>
              </div>

              {/* TEMPLATE INFORMATION */}

              {currentTemplate && (
                <div className={styles.templateInfo}>
                  <h3>{currentTemplate.name}</h3>

                  <p>{currentTemplate.description}</p>

                  {/* SELECT TEMPLATE */}

                  <button
                    type="button"
                    className={styles.selectTemplateButton}
                    onClick={handleSelectTemplate}
                    disabled={!resumeData || isExtracting}
                  >
                    {resumeData ? "Use This Template" : "Upload Resume First"}

                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      ```tsx
      {/* =====================================================
    STEP 03 — PORTFOLIO READY
    ===================================================== */}
      <section ref={resumeDataSectionRef} className={styles.resumeDataSection}>
        <div className={styles.resumeDataSectionContent}>
          {/* STEP LABEL */}

          <p className={styles.sectionLabel}>STEP 03</p>

          {/* HEADING */}

          <h2>Your Portfolio Is Ready</h2>

          <p>
            Your resume has been processed. Your selected template is ready to
            generate your portfolio.
          </p>

          {/* =================================================
        SELECTED TEMPLATE
        ================================================= */}

          {selectedTemplateId && currentTemplate && (
            <div className={styles.selectedTemplateMessage}>
              <span>Selected Template</span>

              <strong>{currentTemplate.name}</strong>
            </div>
          )}

          {/* =================================================
        SELECTED RESUME
        ================================================= */}

          {resumeFile && (
            <div className={styles.resumeSelectedMessage}>
              <span>Resume</span>

              <strong>{resumeFile.name}</strong>
            </div>
          )}

          {/* =================================================
        PHOTO — ONLY FOR TEMPLATES THAT REQUIRE IT
        ================================================= */}

          {currentTemplate?.requiresPhoto && resumeData && (
            <div className={styles.photoRequirement}>
              <div className={styles.photoRequirementHeader}>
                <span className={styles.photoIcon}>📷</span>

                <div>
                  <h3>This template uses a profile picture</h3>

                  <p>
                    Add your picture to personalize this portfolio. You can also
                    continue without a photo.
                  </p>
                </div>
              </div>

              <PortfolioPhotoUpload
                photo={resumeData.photo}
                onPhotoChange={(photo) => {
                  setResumeData((previous) => {
                    if (!previous) {
                      return previous;
                    }

                    return {
                      ...previous,
                      photo,
                    };
                  });
                }}
              />
            </div>
          )}

          {/* =================================================
        VIEW PORTFOLIO BUTTON
        ================================================= */}

          {resumeData && selectedTemplateId && (
            <div className={styles.resumeContinueWrapper}>
              <button
                type="button"
                className={styles.continueButton}
                onClick={handleViewPortfolio}
              >
                View Portfolio
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </section>
      ```
    </>
  );
}

export default Dashboard;
