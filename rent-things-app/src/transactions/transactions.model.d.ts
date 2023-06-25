import { itemDTO } from "../items/items.model"
import { userInfoDTO } from "../security/security.model"

export interface transactionDTO{
  id: string,
  itemId: itemDTO,
  userId: userInfoDTO,
  startDate: Date,
  endDate: Date,
  earnings: number,
  status: number
}

export interface transactionCreationDTO{
  itemId: number,
  userId: string,
  startDate: string,
  endDate: string,
  earnings: number,
  status: number
}