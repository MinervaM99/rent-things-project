import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import TextField from "./TextField";
import * as Yup from "yup";
import { categoryCreationDTO } from "../category/category.model";
import DateField from "./DateField";

export default function CategoryForm(props: categoryFormProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Acest camp este obligatoriu")
            .max(50, 'Ati depasit numarul de caractere permise')
            .firstLetterUppercase(),
            // dataNasterii: Yup.date().nullable()
            // .required("Acest camp este obligatoriu"),
        })}
      >
        {/* desable the subscribe button */}

        {(formikProps) => (
          <Form>
            <TextField field="name" displayName="Name" />

            <Button disabled={formikProps.isSubmitting} type="submit">
              Salveaza
            </Button>
            <Link className="btn btn-secondary" to="/category">
              Anuleaza
            </Link>
            {/* <DateField displayName="Data nasterii" field="dataNasterii"/> */}
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
