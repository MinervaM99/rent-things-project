import { useParams } from "react-router-dom";
import ItemForm from "../forms/ItemForm";

export default function EditItem() {
  const { id }: any = useParams();
  return (
    <>
      <h3>Edit Item</h3>
      The id is {id}
      <ItemForm
        model={{
          id: 100,
          title: "Bicicleta",
          description: "foarte faina, rosie",
          price: 25,
          pictureURL:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hardtail-mountain-bike.jpg/220px-Hardtail-mountain-bike.jpg",
        }}
        onSubmit={values => console.log(values)}
      />
    </>
  );
}
