export interface Tab {
  _id: string;
  title: string;
  composer?: string;
  slug?: string;
}

export interface DetailedTab extends Tab {
  videoUrl?: string;
  shopUrl?: string;
  previewTabFileUrl?: string;
  audioFileUrl?: string;
  tabFileUrl?: string;
  origin?: string;
}
