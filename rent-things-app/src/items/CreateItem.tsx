import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";

export default function CreateItem() {
  const navigate = useNavigate();
  return (
    <>
      <h3>Create Item</h3>
      <Button
        onClick={() => {
          //saveing in the database
          navigate("/");
        }}>
        Salveaza
      </Button>
    </>
  );
}
