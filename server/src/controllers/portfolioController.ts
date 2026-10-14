import { Request, Response } from "express";
import Portfolio from "../models/Portfolio";

function createSlug(name: string): string {
  const cleanName = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const randomPart = Math.random().toString(36).substring(2, 7);

  return `${cleanName || "portfolio"}-${randomPart}`;
}

/**
 * Publish portfolio
 * POST /api/portfolio/publish
 */
export const publishPortfolio = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const { resumeData, selectedTemplateId } = req.body;

    if (!resumeData) {
      res.status(400).json({
        message: "Resume data is required",
      });
      return;
    }

    if (!selectedTemplateId) {
      res.status(400).json({
        message: "Template is required",
      });
      return;
    }

    const slug = createSlug(resumeData.name || "portfolio");

    const portfolio = await Portfolio.create({
      userId,
      slug,
      templateId: selectedTemplateId,
      resumeData,
      isPublished: true,
    });

    res.status(201).json({
      message: "Portfolio published successfully",

      portfolio: {
        id: portfolio._id,
        slug: portfolio.slug,
        templateId: portfolio.templateId,
        isPublished: portfolio.isPublished,
      },
    });
  } catch (error) {
    console.error("Publish portfolio error:", error);

    res.status(500).json({
      message: "Failed to publish portfolio",
    });
  }
};

/**
 * Get public portfolio
 * GET /api/portfolio/public/:slug
 */
export const getPublicPortfolio = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOne({
      slug,
      isPublished: true,
    }).lean();

    if (!portfolio) {
      res.status(404).json({
        message: "Portfolio not found",
      });
      return;
    }

    res.status(200).json({
      portfolio: {
        id: portfolio._id,
        slug: portfolio.slug,
        templateId: portfolio.templateId,
        resumeData: portfolio.resumeData,
        isPublished: portfolio.isPublished,
      },
    });
  } catch (error) {
    console.error("Get public portfolio error:", error);

    res.status(500).json({
      message: "Failed to load portfolio",
    });
  }
};
