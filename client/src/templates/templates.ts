import modernOneImage from "../assets/modern1.png";
import professionalOneImage from "../assets/professional1.png";
import modernTwoImage from "../assets/modern2.png";
import modernThreeImage from "../assets/modern3.png";
import modernFourImage from "../assets/modern4.png";
import modernFiveImage from "../assets/modern5.png";

export type TemplateCategory = "modern" | "professional";

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  image: string;
  requiresPhoto: boolean;
}

export const templates: Template[] = [
  {
    id: "modern-one",
    name: "Modern One",
    category: "modern",
    description: "A clean and modern portfolio design.",
    image: modernOneImage,
    requiresPhoto: false,
  },

  {
    id: "modern-two",
    name: "Modern Two",
    category: "modern",
    description: "A bold editorial portfolio with luxury typography.",
    image: modernTwoImage,
    requiresPhoto: true,
  },

  {
    id: "modern-three",
    name: "Modern Three",
    category: "modern",
    description: "An elegant editorial collage portfolio.",
    image: modernThreeImage,
    requiresPhoto: true,
  },

  {
    id: "modern-four",
    name: "Modern Four",
    category: "modern",
    description: "A colorful and playful creative portfolio.",
    image: modernFourImage,
    requiresPhoto: false,
  },

  {
    id: "modern-five",
    name: "Modern Five",
    category: "modern",
    description: "A premium monochrome portfolio.",
    image: modernFiveImage,
    requiresPhoto: true,
  },

  {
    id: "professional-one",
    name: "Professional One",
    category: "professional",
    description: "A professional portfolio designed for recruiters.",
    image: professionalOneImage,
    requiresPhoto: false,
  },
];
