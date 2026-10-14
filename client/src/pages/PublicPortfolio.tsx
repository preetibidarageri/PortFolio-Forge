import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { templateComponents } from "../templates/templateRegistry";

import type { ResumeData } from "../types/resume";

interface PortfolioResponse {
  id: string;
  slug: string;
  templateId: string;
  resumeData: ResumeData;
  isPublished: boolean;
}

function PublicPortfolio() {
  const { slug } = useParams();

  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!slug) {
          setError("Portfolio not found.");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/portfolio/public/${slug}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Portfolio not found");
        }

        setPortfolio(result.portfolio);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error ? error.message : "Failed to load portfolio.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading portfolio...
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <h1>Portfolio Not Found</h1>

        <p>
          {error || "This portfolio does not exist or is no longer published."}
        </p>
      </div>
    );
  }

  const SelectedTemplate = templateComponents[portfolio.templateId];

  if (!SelectedTemplate) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Template Not Found</h1>
      </div>
    );
  }

  return <SelectedTemplate data={portfolio.resumeData} />;
}

export default PublicPortfolio;
