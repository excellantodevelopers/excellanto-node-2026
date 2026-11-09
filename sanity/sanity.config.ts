import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "excellanto-cms",
  title: "Excellanto CMS",
  projectId: projectId ?? "",
  dataset,
  plugins: [
    structureTool({ structure }),
    media(),
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const singletons = [
        "siteSettings",
        "homepage",
        "aboutPage",
        "contactPage",
        "servicesPage",
        "blogPage",
      ];
      if (creationContext.type === "global") {
        return prev.filter((template) => !singletons.includes(template.templateId));
      }
      return prev;
    },
  },
  vite: {
    envDir: "..",
    envPrefix: ["SANITY_STUDIO_", "NEXT_PUBLIC_"],
  },
});
