import mongoose, { Document, Schema } from "mongoose";

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  templateId: string;
  resumeData: {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    about?: string;

    skills: string[];

    education: {
      degree: string;
      field?: string;
      institution: string;
      startYear?: string;
      endYear?: string;
      grade?: string;
    }[];

    experience: {
      role: string;
      company: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    }[];

    projects: {
      name: string;
      description?: string;
      technologies?: string[];
    }[];
  };

  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    templateId: {
      type: String,
      required: true,
    },

    resumeData: {
      type: Schema.Types.Mixed,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Portfolio = mongoose.model<IPortfolio>("Portfolio", portfolioSchema);

export default Portfolio;
