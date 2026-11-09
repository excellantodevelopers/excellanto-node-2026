const blogFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedDate,
  "category": category->title,
  "author": author->name,
  featuredImage,
  "featuredImageAlt": featuredImage.alt,
  seoTitle,
  seoDescription,
  tags
`;

export const allPublishedBlogsQuery = /* groq */ `
  *[_type == "blog" && isPublished == true] | order(publishedDate desc) {
    ${blogFields}
  }
`;

export const blogBySlugQuery = /* groq */ `
  *[_type == "blog" && slug.current == $slug && isPublished == true][0] {
    ${blogFields},
    content
  }
`;

export const blogsByCategoryQuery = /* groq */ `
  *[_type == "blog" && isPublished == true && category->slug.current == $categorySlug]
    | order(publishedDate desc) {
    ${blogFields}
  }
`;

export const latestBlogsQuery = /* groq */ `
  *[_type == "blog" && isPublished == true] | order(publishedDate desc)[0...$limit] {
    ${blogFields}
  }
`;

export const publishedBlogSlugsQuery = /* groq */ `
  *[_type == "blog" && isPublished == true && defined(slug.current)] {
    "slug": slug.current
  }
`;
