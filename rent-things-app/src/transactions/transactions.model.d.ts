
export interface transactionDTO{
  id: string,
  itemId: number,
  userId: string,
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