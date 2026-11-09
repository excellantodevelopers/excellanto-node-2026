import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], id: string, title: string, schemaType: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(schemaType).documentId(id).title(title));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Excellanto CMS")
    .items([
      S.listItem()
        .title("Website")
        .child(
          S.list()
            .title("Website")
            .items([
              singleton(S, "siteSettings", "Site Settings", "siteSettings"),
              singleton(S, "homepage", "Homepage", "homepage"),
              singleton(S, "aboutPage", "About Page", "aboutPage"),
              singleton(S, "contactPage", "Contact Page", "contactPage"),
              singleton(S, "servicesPage", "Services Index", "servicesPage"),
              singleton(S, "blogPage", "Blog Listing", "blogPage"),
            ])
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "service",
        title: "Services",
        S,
        context,
      }),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("blog").title("Blog posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Categories"),
      S.divider(),
      S.documentTypeListItem("legalPage").title("Legal pages"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteSettings",
            "homepage",
            "aboutPage",
            "contactPage",
            "servicesPage",
            "blogPage",
            "service",
            "testimonial",
            "blog",
            "author",
            "category",
            "legalPage",
          ].includes(item.getId() ?? "")
      ),
    ]);
