export interface itemDTO {
  id: number;
  title: string;
  description?: string;
  price: number;
  itemImage?: File;
  pictureURL?: string;
  forSale?: boolean;
  categoryIds: number;
  // condition: string;
}

export interface landingPageDTO{
  transport?: itemDTO[];
  sportsAndRelax?: itemDTO[];
}