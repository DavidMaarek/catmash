export interface CatsList {
  images: Cat[]
}

export interface Cat {
  url: string;
  id: string;
}

export interface CatRanking {
  url: string;
  id: string;
  vote: number;
}
