export const getTabsPageQuery = (
  pageSize: number,
  page: number,
  searchTerm: string
) => `
*[_type == "tab" && (
  title match "^${searchTerm}*" ||
  composer match "^${searchTerm}*" ||
  origin match "^${searchTerm}*"
)] | order(title asc)[${(page - 1) * pageSize}...${page * pageSize}]{
  _id,
  title,
  "slug": slug.current,
  composer,
  videoUrl,
  shopUrl,
  origin,
  "previewTabFileUrl": previewTabFile.asset->url,
  "audioFileUrl": audioFile.asset->url,
  "tabFileUrl": tabFile.asset->url
}
`;

export const getTabBySlugQuery = (slug: string) => `
*[_type == "tab" && slug.current == "${slug}"][0]{
  _id,
  title,
  "slug": slug.current,
  composer,
  videoUrl,
  shopUrl,
  origin,
  "previewTabFileUrl": previewTabFile.asset->url,
  "audioFileUrl": audioFile.asset->url,
  "tabFileUrl": tabFile.asset->url
}
`;
