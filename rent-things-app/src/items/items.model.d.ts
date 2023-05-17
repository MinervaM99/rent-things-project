export interface itemDTO {
  id: number;
  title: string; 
  description?: string;
  itemImage?: File;
  photo?: string;
  forSale?: boolean;
  categoryId: number;
  condition?: number;
  dayPrice?: number;
  monthPrice?: number;
  weekPrice?: number;
  age?: string;
}

export interface itemCreationDTO {
  title: string;
  userId: string;
  description: string;
  condition: number;
  //picture url
  photo: string;
  //add picture
  picture?: File;
  age: number;
  location?: string;
  dayPrice?: number;
  monthPrice?: number;
  weekPrice?: number;
  available: true;
  categoryId: number;
}

export interface landingPageDTO {
  transport?: itemDTO[];
  sportsAndRelax?: itemDTO[];
}
