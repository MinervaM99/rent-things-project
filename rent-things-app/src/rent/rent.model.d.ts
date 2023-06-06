export interface RentDTO{
  startDate: Date | string;
  endDate: Date | string;
  borrowerId?: string;
  itemId?: number;
}