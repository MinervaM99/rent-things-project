import moment from "moment";
import { itemCreationDTO } from "../items/items.model";
import { transactionDTO } from "../transactions/transactions.model";

export function convertItemToFormData(item: itemCreationDTO): FormData {
  const formData = new FormData();

  formData.append("name", item.name);
  formData.append("description", item.description);
  formData.append("condition", String(item.condition));
  formData.append("available", String(item.available));
  formData.append("categoryId", String(item.categoryId));
  formData.append("age", String(item.age));
  if (item.userId) {
    formData.append("userId", item.userId);
  }
 
  if (item.photo) {
    formData.append("photo", item.photo);
  }

  if (item.dayPrice) {
    formData.append("dayPrice", String(item.dayPrice));
  }

  if (item.weekPrice) {
    formData.append("weekPrice", String(item.weekPrice));
  }

  if (item.monthPrice) {
    formData.append("monthPrice", String(item.monthPrice));
  }

  if (item.location) {
    formData.append("location", item.location);   
  }

  return formData;
}
export function formatDateToBackendFormat(date: any) {
  const selectedDateTime = moment(date.target.value).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  return selectedDateTime;
}
