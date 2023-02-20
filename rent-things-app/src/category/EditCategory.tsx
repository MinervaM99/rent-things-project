import { useParams } from "react-router";

export default function EditCategory() {
  const {id} : any = useParams();
  return (
    <>
      <h3>Edit category</h3>
      The id is {id}
    </>
  );
}
