import ItemForm from "./ItemForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlCategorirs, urlItems } from "../endpoints";
import { itemCreationDTO, itemDTO } from "./items.model";
import { convertItemToFormData } from "../utils/formDataUtils";
import EditEntity from "../utils/EditEntity";
import { categoryDTO } from "../category/category.model";
import { FormContainer } from "../style";

export default function EditItem() {
  const [listCategory, setListCategory] = useState<categoryDTO[]>([]);

  function transform(item: itemDTO): itemCreationDTO {
    console.log("bbb", item);
    return {
      name: item.name,
      description: item.description,
      userId: item.userId?.id,
      pictureURL: item.photo,
      dayPrice: item.dayPrice,
      age: item.age,
      weekPrice: item.weekPrice,
      monthPrice: item.monthPrice,
      condition: item.condition,
      available: item.available,
      categoryId: item.categoryId?.id,
      location: `${item.location ? item.location: ""}`
    };
  }
  //to do - categoryId?
  //Nu se pune valoarea in selecturi si checkboxuri: to do
  useEffect(() => {
    axios
      .get(`${urlCategorirs}`)
      .then((response: AxiosResponse<categoryDTO[]>) => {
        setListCategory(response.data);
      });
  }, []);

  return (
    <FormContainer
      style={{ margin: "60px auto 50px auto", maxWidth: "700px" }}
    >
      <EditEntity<itemCreationDTO, itemDTO>
        url={urlItems}
        indexURL="/myAccount/1"
        entityName="anunțul"
        transformFormData={convertItemToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <ItemForm
            model={entity}
            onSubmit={async (values) => await edit(values)}
            selectedCategory={listCategory.map((object) => ({
              id: object.id,
              name: object.name,
            }))}
          ></ItemForm>
        )}
      </EditEntity>
    </FormContainer>
  );
}
