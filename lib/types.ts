export interface Collection {
  id: number;
  title: string;
  photographer: string[];
  caption: string;
  grade: number;
  category: string;
  date: string;
  likes: number;
  created_at?: string;
}

export interface Image {
  id: number;
  collection_id: number;
  url: string;
  alt_text?: string;
  order?: number;
  created_at?: string;
}

export interface CollectionWithImages extends Collection {
  images: string[];
}
