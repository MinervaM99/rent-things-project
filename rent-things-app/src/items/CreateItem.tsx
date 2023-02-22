import Button from "../utils/Button";
import { Link} from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";

export default function CreateItem() {
  return (
    <>
      <h3>Create Item</h3>

      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(value) => {
          //when the form is posted
          console.log(value);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Acest camp este obligatoriu"),
        })}
      >
        <Form>
          <TextField field="name" displayName="Name"/>

          <Button type="submit">Salveaza</Button>
          <Link className="btn btn-secondary" to="/category">
            Anuleaza
          </Link>
        </Form>
      </Formik>
    </>
  );
}
