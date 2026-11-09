const imageFields = /* groq */ `
  image,
  url,
  alt
`;

const ctaFields = /* groq */ `
  label,
  href
`;

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]{
    name, tagline, description, url,
    logo { ${imageFields} },
    phone, phoneSecondary, email, emailSecondary, address,
    facebook, instagram, linkedin,
    navLinks[]{ label, href, mega },
    headerCta { ${ctaFields} },
    primaryCta { ${ctaFields} },
    secondaryCta { ${ctaFields} },
    footerServicesTitle, footerCompanyTitle, footerResourcesTitle,
    footerCompanyLinks[]{ label, href },
    footerResourceLinks[]{ label, href },
    copyright, footerTagline,
    skipToContent, viewMore, viewAllServices, backToServices, backToBlog,
    openMenu, closeMenu, logoAriaLabel, megaMenuAria, serviceEyebrow, byPrefix, articleFallbackTitle,
    primaryNavAria, mobileNavAria,
    seoTitle, seoDescription, seoAuthor, seoKeywords
  }
`;

export const homepageQuery = /* groq */ `
  *[_type == "homepage"] | order(_updatedAt desc)[0]{
    heroEyebrow, heroTitle, heroHighlight, heroSubtitle, heroBody,
    heroPrimaryCta { ${ctaFields} },
    heroSecondaryCta { ${ctaFields} },
    heroDashboardImage { ${imageFields} },
    heroBannerImage { ${imageFields} },
    capabilitiesEyebrow, capabilitiesTitle,
    capabilities[]{ title, icon, image { ${imageFields} } },
    valueEyebrow, valueTitle, valueBody,
    valueCta { ${ctaFields} },
    valueImage { ${imageFields} },
    servicesEyebrow, servicesTitle, servicesAside, servicesViewMore, servicesViewMoreHref, servicesCardLink,
    processEyebrow, processTitle, processIntro,
    processSteps[]{ step, title, body, image { ${imageFields} } },
    brandsEyebrow, brandsTitle,
    brandsBackground { ${imageFields} },
    brandLogos[]{ ${imageFields} },
    whyEyebrow, whyTitle, whyBody,
    whyImage { ${imageFields} },
    whyCta { ${ctaFields} },
    whyCards[]{ title, description, icon },
    blogEyebrow, blogTitle, blogLinkLabel,
    ctaEyebrow, ctaTitle,
    ctaImage { ${imageFields} },
    ctaPrimary { ${ctaFields} },
    ctaSecondary { ${ctaFields} },
    testimonialsEyebrow, testimonialsTitle,
    testimonials[]->{
      quote, name, role, isPublished,
      image { ${imageFields} }
    }
  }
`;

export const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage"] | order(_updatedAt desc)[0]{
    eyebrow, title, intro,
    heroImage { ${imageFields} },
    mission { title, body },
    vision { title, body },
    values { title, body },
    strengthsEyebrow, strengthsTitle, strengthsBody,
    strengthsImage { ${imageFields} },
    techEyebrow, techTitle, techBody, techHighlights,
    techImage { ${imageFields} },
    seoTitle, seoDescription
  }
`;

export const contactPageQuery = /* groq */ `
  *[_type == "contactPage"] | order(_updatedAt desc)[0]{
    eyebrow, title,
    heroImage { ${imageFields} },
    officeImage { ${imageFields} },
    infoEyebrow, infoTitle, addressLabel, phoneLabel, emailLabel,
    formEyebrow, formTitle, formBody, firstNameLabel, lastNameLabel, emailFieldLabel, messageLabel,
    submitLabel, successTitle, successBody, successResetLabel,
    seoTitle, seoDescription
  }
`;

export const servicesPageQuery = /* groq */ `
  *[_type == "servicesPage"] | order(_updatedAt desc)[0]{
    eyebrow, title, viewMore, categoryEyebrow, cardLinkLabel,
    heroImage { ${imageFields} },
    categories[]{ id, title },
    seoTitle, seoDescription
  }
`;

export const blogPageQuery = /* groq */ `
  *[_type == "blogPage"] | order(_updatedAt desc)[0]{
    eyebrow, title, emptyMessage, readMoreLabel, backToBlog, byPrefix, articleFallbackTitle,
    heroImage { ${imageFields} },
    seoTitle, seoDescription
  }
`;

export const legalPageBySlugQuery = /* groq */ `
  *[_type == "legalPage" && slug.current == $slug][0]{
    "slug": slug.current,
    eyebrow, title, description, content,
    seoTitle, seoDescription
  }
`;

export const allServicesQuery = /* groq */ `
  *[_type == "service"] | order(coalesce(orderRank, "z") asc, sortOrder asc, title asc) {
    title, shortTitle, description, megaDescription, icon, featured, sortOrder, orderRank, features, detailIntro,
    category,
    "slug": slug.current,
    image { ${imageFields} },
    sidebarTitle, sidebarBody,
    sidebarCta { ${ctaFields} },
    pageCta { ${ctaFields} },
    bannerEyebrow, backLabel, cardLinkLabel,
    seoTitle, seoDescription,
    mobileHeroEyebrow, mobileHeroTitle, mobileHeroImage { ${imageFields} },
    mobileWhyChoose[]{ title, body },
    mobileProcessEyebrow, mobileProcessTitle, mobileProcessIntro,
    mobileProcessSteps[]{ step, title, body, image { ${imageFields} } },
    mobileBrandsTitle, mobileIndustriesEyebrow, mobileIndustriesTitle, mobileIndustriesIntro,
    mobileIndustriesImage { ${imageFields} },
    mobileIndustries[]{ title, icon },
    websiteHeroEyebrow, websiteHeroTitle, websiteHeroImage { ${imageFields} },
    websiteOfferingsTitle,
    websiteOfferings[]{ title, body, image { ${imageFields} } },
    websiteWhyTitle, websiteWhyChoose[]{ title, body },
    websiteProcessSteps[]{ step, title, body, image { ${imageFields} } },
    websiteRedesignEyebrow, websiteRedesignTitle, websiteRedesignItems,
    websiteRedesignImage { ${imageFields} },
    websiteHighlights, websiteHighlightsImage { ${imageFields} },
    websiteDiscoverMore
  }
`;

export const serviceBySlugQuery = /* groq */ `
  *[_type == "service" && slug.current == $slug][0]{
    title, shortTitle, description, megaDescription, icon, featured, sortOrder, orderRank, features, detailIntro,
    category,
    "slug": slug.current,
    image { ${imageFields} },
    sidebarTitle, sidebarBody,
    sidebarCta { ${ctaFields} },
    pageCta { ${ctaFields} },
    bannerEyebrow, backLabel, cardLinkLabel,
    seoTitle, seoDescription,
    mobileHeroEyebrow, mobileHeroTitle, mobileHeroImage { ${imageFields} },
    mobileWhyChoose[]{ title, body },
    mobileProcessEyebrow, mobileProcessTitle, mobileProcessIntro,
    mobileProcessSteps[]{ step, title, body, image { ${imageFields} } },
    mobileBrandsTitle, mobileIndustriesEyebrow, mobileIndustriesTitle, mobileIndustriesIntro,
    mobileIndustriesImage { ${imageFields} },
    mobileIndustries[]{ title, icon },
    websiteHeroEyebrow, websiteHeroTitle, websiteHeroImage { ${imageFields} },
    websiteOfferingsTitle,
    websiteOfferings[]{ title, body, image { ${imageFields} } },
    websiteWhyTitle, websiteWhyChoose[]{ title, body },
    websiteProcessSteps[]{ step, title, body, image { ${imageFields} } },
    websiteRedesignEyebrow, websiteRedesignTitle, websiteRedesignItems,
    websiteRedesignImage { ${imageFields} },
    websiteHighlights, websiteHighlightsImage { ${imageFields} },
    websiteDiscoverMore
  }
`;
