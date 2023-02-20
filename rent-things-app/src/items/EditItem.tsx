import { useParams } from "react-router";

export default function EditItem() {
  const {id} : any = useParams();
  return (
    <>
      <h3>Edit Item</h3>
      The id is {id}
    </>
  );
}