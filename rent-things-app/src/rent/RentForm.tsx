import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import TextField from "../forms/TextField";
import * as Yup from "yup";
import DateField from "../forms/DateField";
import { RentDTO } from "./rent.model";

export default function RentForm(props: categoryFormProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            // dataNasterii: Yup.date().nullable()
            // .required("Acest camp este obligatoriu"),
        })}
      >
        {/* desable the subscribe button */}

        {(formikProps) => (
          <Form>
            <DateField displayName="Din data de " field="startDate"/>
            <DateField displayName="Pana in data de" field="endDate"/>
            <Button disabled={formikProps.isSubmitting} type="submit">
              Inchiriaza
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
  model: RentDTO;
  onSubmit(values: RentDTO, action: FormikHelpers<RentDTO>): void;
}
