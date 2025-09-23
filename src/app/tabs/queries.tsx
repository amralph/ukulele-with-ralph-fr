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
  slug,
  composer,
  videoUrl,
  shopUrl,
  origin,
  "previewTabFileUrl": previewTabFile.asset->url,
  "audioFileUrl": audioFile.asset->url,
  "tabFileUrl": tabFile.asset->url
}
`;
