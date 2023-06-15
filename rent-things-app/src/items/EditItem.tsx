import ItemForm from "./ItemForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlCategorirs, urlItems } from "../endpoints";
import { itemCreationDTO, itemDTO } from "./items.model";
import { convertItemToFormData } from "../utils/formDataUtils";
import EditEntity from "../utils/EditEntity";
import { categoryDTO } from "../category/category.model";
import { Container } from "@mui/material";

export default function EditItem() {
  const [listCategory, setListCategory] = useState<categoryDTO[]>([]);

  function transform(item: itemDTO): itemCreationDTO {
    return {
      name: item.name,
      description: item.description,
      // userId: item.userId,
      pictureURL: item.photo,
      dayPrice: item.dayPrice,
      age: item.age,
      weekPrice: item.weekPrice,
      monthPrice: item.monthPrice,
      condition: item.condition,
      available: item.available,
      categoryId: item.categoryName?  item.categoryName.id : 0,
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
    <Container maxWidth="sm">
      <EditEntity<itemCreationDTO, itemDTO>
        url={urlItems}
        indexURL="../"
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
      {/* The id is {id}
      {item && itemEdit ? (
        <ItemForm
          model={item}
          onSubmit={async (values) => await edit(values)}
          selectedCategory={itemEdit.categoryToSelect}
        />
      ) : (
        <Loading />
      )} */}
    </Container>
  );
}
