import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./security.model";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function AuthForm(props: authFormProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Acest camp este obligatoriu")
            .email("You have to insert a valid email"),
          password: Yup.string().required("Acest camp este obligatoriu"),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField displayName="Email" field="email" />
            <TextField
              displayName="Password"
              field="password"
              type="password"
            />

            <Link className="btn btn-secondary" to="/">
              Anuleaza
            </Link>
            <Button disabled={formikProps.isSubmitting} type="submit">
              {props.textSubmitButton}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface authFormProps {
  model: userCredentials;
  textSubmitButton: string;
  onSubmit(
    values: userCredentials,
    actions: FormikHelpers<userCredentials>
  ): void;
}

AuthForm.defaultProps ={
  textSubmitButton: "Intra in cont"
}
