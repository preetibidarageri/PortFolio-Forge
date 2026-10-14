import type React from "react";

import ModernOne from "./ModernOne";
import ProfessionalOne from "./ProfessionalOne";
import ModernThree from "./ModernThree";
import ModernFour from "./ModernFour";
import ModernTwo from "./ModernTwo";
import ModernFive from "./ModernFive";

export const templateComponents: Record<string, React.ComponentType<any>> = {
  "modern-one": ModernOne,
  "modern-two": ModernTwo,
  "modern-three": ModernThree,
  "modern-four": ModernFour,
  "modern-five": ModernFive,

  "professional-one": ProfessionalOne,
};
