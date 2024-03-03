export interface CatsFromApi {
  images: Cat[]
}

export interface Cat {
  url: string;
  id: string;
}

export interface CatWithVote {
  url: string;
  id: string;
  vote: number;
}
