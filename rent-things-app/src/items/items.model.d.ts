import { categoryDTO } from "../category/category.model";
import { userInfoDTO } from "../security/security.model";

export interface itemDTO {
  id: number;
  name: string;
  description: string;
  //itemImage?: File;
  photo: string;
  available?: boolean;
  categoryName: categoryDTO; 
  condition: number;
  dayPrice?: number;
  monthPrice?: numbers;
  weekPrice?: number;
  age: number;
  userId?: userInfoDTO; //information about userName
}

export interface itemCreationDTO {
  name: string;
  userId?: string;
  description: string;
  condition: number;
  //picture url
  pictureURL?: string;
  //add the photo
  photo?: File;
  age: number;
  location?: string;
  dayPrice?: number;
  monthPrice?: number;
  weekPrice?: number;
  available?: boolean;
  categoryId: number;
}

export interface landingPageDTO {
  lastItemsAdded?: itemDTO[];
}
