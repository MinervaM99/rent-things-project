import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import TextField from "./TextField";
import * as Yup from "yup";
import { categoryCreationDTO } from "./category.model";

export default function CategoryForm(props: categoryFormProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Acest camp este obligatoriu")
            .firstLetterUppercase(),
        })}
      >
        {/* desable the subscribe button */}

        {(formikProps) => (
          <Form>
            <TextField field="name" displayName="Name" />

            <Button disable={formikProps.isSubmitting} type="submit">
              Salveaza
            </Button>
            <Link className="btn btn-secondary" to="/category">
              Anuleaza
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface categoryFormProps{
  model: categoryCreationDTO;
  onSubmit(values: categoryCreationDTO, action: FormikHelpers<categoryCreationDTO>): void;
}
