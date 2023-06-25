import CategoryForm from "./CategoryForm";
import { urlCategorirs } from "../endpoints";
import { categoryCreationDTO, categoryDTO } from "./category.model";
import EditEntity from "../utils/EditEntity";
import { Container } from "@mui/material";

export default function EditCategory() {
  return (
    <Container maxWidth="sm">
      <EditEntity<categoryCreationDTO, categoryDTO>
        url={urlCategorirs}
        entityName="o categorie"
        indexURL="../category"
      >
        {(entity, edit) => (
          <CategoryForm
            model={entity}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </EditEntity> 
    </Container>
  );
}
