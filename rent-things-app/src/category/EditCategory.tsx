import { useParams } from "react-router-dom";
import CategoryForm from "../forms/CategoryForm";

export default function EditCategory() {
  const {id} : any = useParams();
  return (
    <>
      <h3>Edit category</h3>
      <CategoryForm
        model={{ name: "Action" }}
        onSubmit={async (value) => {
          await new Promise((r) => setTimeout(r, 1000));
          console.log(id);
          console.log(value);
        }}
      />
    </>
  );
}
