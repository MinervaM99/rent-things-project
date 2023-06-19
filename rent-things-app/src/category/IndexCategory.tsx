import { urlCategorirs } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { categoryDTO } from "./category.model";

export default function IndexCategory() {
  return (
    <>
      <IndexEntity<categoryDTO>
        url={urlCategorirs}
        createURL="../category/create"
        title="Categorii"
        entityName="Adaugă o categorie nouă"
      >
        {(categories, buttons) => (
          <>
            <thead>
              <tr>
                <th>Acțiuni</th>
                <th>Nume categorie</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>
                    {buttons(`../category/edit/${category.id}`, category.id)}
                  </td>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
