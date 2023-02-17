export interface itemDTO {
  id: number;
  title: string;
  description: string;
  priece: number;
  itemImage: string;
  // category: string;
  // condition: string;
}


export interface landingPageDTO{
  transport?: itemDTO[];
  sportsAndRelax?: itemDTO[];
}