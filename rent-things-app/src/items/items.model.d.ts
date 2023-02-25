export interface itemDTO {
  id: number;
  title: string;
  description?: string;
  price: number;
  itemImage?: File;
  pictureURL?: string;
  forSale?: boolean;
  // category: string;
  // condition: string;
}

export interface landingPageDTO{
  transport?: itemDTO[];
  sportsAndRelax?: itemDTO[];
}