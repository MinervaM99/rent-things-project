import { useParams } from "react-router-dom";
import ItemForm from "./ItemForm";

export default function EditItem() {
  const { id }: any = useParams();

  return (
    <>
      <h3>Edit Item</h3>
      The id is {id}
      <ItemForm
        model={{
          title: "Bicicleta",
          description: "<p>O <strong>Bicicleta</strong></p>",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hardtail-mountain-bike.jpg/220px-Hardtail-mountain-bike.jpg",
          categoryId: 2,
          condition: 1,
          age: 2,
          dayPrice: 10,
          available: true,
          userId: "0421cd4b-ebaf-4fb5-a903-33e68218f527"
        }}
        onSubmit={(values) => console.log(values)}
        selectedCategory={[
          { id: 1, name: "Bucatarie" },
          { id: 2, name: "Gradina" },
          { id: 3, name: "Sport" },
          { id: 4, name: "Haine" },
        ]}
      />
    </>
  );
}
