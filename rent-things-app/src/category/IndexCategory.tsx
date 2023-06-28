import { urlCategorirs } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { categoryDTO } from "./category.model";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function IndexCategory() {
  return (
    <div
      // style={{
      //   backgroundColor: "#f4f5f7",
      //   paddingTop: "1px",
      //   margin: " 0 20px 0 20px",
      // }}
    >
      <IndexEntity<categoryDTO>
        url={`${urlCategorirs}/display`}
        createURL="../category/create"
        title="Categorii"
        entityName="Adaugă o categorie nouă"
      >
        {(categories, buttons) => (
          <>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "19px" }}>Acțiuni</TableCell>
                <TableCell sx={{ fontSize: "19px" }}>Nume categorie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {buttons(`../category/edit/${category.id}`, category.id)}
                  </TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {category.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </IndexEntity>
    </div>
  );
}
