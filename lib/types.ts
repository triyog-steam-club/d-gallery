
export type Collection = {
  title: string;
};

export type Image = {
  url: string;
};

export type CollectionWithImages = Collection & {
  images: string[];
};
