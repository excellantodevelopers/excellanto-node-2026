import { author } from "./author";
import { blog } from "./blog";
import { category } from "./category";
import { aboutPage } from "./documents/aboutPage";
import { blogPage } from "./documents/blogPage";
import { contactPage } from "./documents/contactPage";
import { homepage } from "./documents/homepage";
import { legalPage } from "./documents/legalPage";
import { service } from "./documents/service";
import { servicesPage } from "./documents/servicesPage";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";
import { capabilityItem } from "./objects/capabilityItem";
import { ctaButton } from "./objects/ctaButton";
import { iconName } from "./objects/iconName";
import { navLink } from "./objects/navLink";
import { processStep } from "./objects/processStep";
import { siteImage } from "./objects/siteImage";
import { titledBody } from "./objects/titledBody";
import { whyChooseItem } from "./objects/whyChooseItem";

export const schemaTypes = [
  siteImage,
  ctaButton,
  navLink,
  titledBody,
  processStep,
  iconName,
  capabilityItem,
  whyChooseItem,
  siteSettings,
  homepage,
  aboutPage,
  contactPage,
  servicesPage,
  blogPage,
  legalPage,
  service,
  testimonial,
  blog,
  author,
  category,
];
