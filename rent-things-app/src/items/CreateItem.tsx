

import Button from "../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";

export default function CreateItem() {
  const navigate = useNavigate();
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
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name">Nume: </label>
            <Field name="name" id="name" className="form-control" />
          </div>
          
          <Button type="submit">Salveaza</Button>
          <Link className="btn btn-secondary" to="/category">
            Anuleaza
          </Link>
        </Form>
      </Formik>
    </>
  );
}

