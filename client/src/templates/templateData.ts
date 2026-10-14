export type TemplateCategory = "modern" | "professional" | "creative";

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  component: React.ComponentType<any>;
}
