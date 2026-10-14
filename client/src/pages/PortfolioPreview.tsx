import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PortfolioPreview.module.css";

import { templateComponents } from "../templates/templateRegistry";
import type { ResumeData } from "../types/resume";

interface PreviewState {
  resumeData: ResumeData;
  selectedTemplateId: string;
}

function PortfolioPreview() {
  const [isPublishing, setIsPublishing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as PreviewState | null;

  /* =========================================================
     SAFETY CHECK
     ========================================================= */

  if (!state?.resumeData || !state?.selectedTemplateId) {
    return (
      <main className={styles.errorPage}>
        <div className={styles.errorCard}>
          <h1>No Portfolio Data</h1>

          <p>
            Please upload your resume and select a template before previewing
            your portfolio.
          </p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const { resumeData, selectedTemplateId } = state;

  /* =========================================================
     GET SELECTED TEMPLATE
     ========================================================= */

  const SelectedTemplate = templateComponents[selectedTemplateId];

  /* =========================================================
     TEMPLATE NOT FOUND
     ========================================================= */

  if (!SelectedTemplate) {
    return (
      <main className={styles.errorPage}>
        <div className={styles.errorCard}>
          <h1>Template Not Found</h1>

          <p>The selected portfolio template could not be loaded.</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  /* =========================================================
     ACTION HANDLERS
     ========================================================= */

  const handleEdit = () => {
    navigate("/dashboard", {
      state: {
        resumeData,
        selectedTemplateId,
        editMode: true,
      },
    });
  };

  const handleDownload = () => {
    alert("Download Project will be added next.");
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login before publishing your portfolio.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/portfolio/publish",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            resumeData,
            selectedTemplateId,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to publish portfolio");
      }

      const slug = result.portfolio.slug;

      const publicUrl = `${window.location.origin}/portfolio/${slug}`;

      await navigator.clipboard.writeText(publicUrl);

      alert(
        `Portfolio published successfully!\n\n${publicUrl}\n\nThe link has been copied to your clipboard.`,
      );
    } catch (error) {
      console.error("Publish error:", error);

      alert(
        error instanceof Error ? error.message : "Failed to publish portfolio",
      );
    } finally {
      setIsPublishing(false);
    }
  };

  /* =========================================================
     PORTFOLIO PREVIEW
     ========================================================= */

  return (
    <main className={styles.previewPage}>
      {/* =====================================================
          TOP BAR
          ===================================================== */}

      <header className={styles.previewHeader}>
        <div>
          <p className={styles.previewLabel}>PORTFOLIOFORGE</p>

          <h1>Portfolio Preview</h1>
        </div>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* =====================================================
          ACTION BAR
          ===================================================== */}

      <section className={styles.actionBar}>
        <div className={styles.actionInfo}>
          <span>YOUR PORTFOLIO</span>

          <p>Review your portfolio and choose what you want to do next.</p>
        </div>

        <div className={styles.actionButtons}>
          {/* EDIT */}

          <button
            type="button"
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={handleEdit}
          >
            <span className={styles.buttonIcon}>✎</span>

            <span>
              <strong>Edit Portfolio</strong>
              <small>Modify your information</small>
            </span>
          </button>

          {/* DOWNLOAD */}

          <button
            type="button"
            className={`${styles.actionButton} ${styles.downloadButton}`}
            onClick={handleDownload}
          >
            <span className={styles.buttonIcon}>↓</span>

            <span>
              <strong>Download Project</strong>
              <small>Get editable project files</small>
            </span>
          </button>

          {/* PUBLISH */}

          <button
            type="button"
            className={`${styles.actionButton} ${styles.publishButton}`}
            onClick={handlePublish}
            disabled={isPublishing}
          >
            <span className={styles.buttonIcon}>↗</span>

            <span>
              <strong>
                {isPublishing ? "Publishing..." : "Publish Portfolio"}
              </strong>

              <small>
                {isPublishing
                  ? "Saving your portfolio"
                  : "Create your public link"}
              </small>
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          PORTFOLIO
          ===================================================== */}

      <section className={styles.portfolioContainer}>
        <SelectedTemplate data={resumeData} />
      </section>
    </main>
  );
}

export default PortfolioPreview;
