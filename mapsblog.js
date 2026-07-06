const BlogsiteMapping = {
  blog: {
    containerId: "blog-card",
    fields: {
      Id: 0, // Column A
      Title: 1, // Column B
      Summary: 2, // Column C
      Full_description: 3, // Column D
      Source: 4, // Column E
      Media_url: 5, // Column F
      Date: 6, // Column G
      Url_single_page: 7, // Column H
      Author: 8, // Column I
    }
  }
};

if (typeof window !== "undefined") {
  window.BlogsiteMapping = BlogsiteMapping;
}
