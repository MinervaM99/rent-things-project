import { Form, Formik, FormikHelpers } from "formik";
import { userCredentialsLogin } from "./security.model";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function AuthFormLogin(props: authFormProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          userName: Yup.string()
            .required("Acest camp este obligatoriu"),
          password: Yup.string().required("Acest camp este obligatoriu"),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField displayName="Nume utilizator" field="userName" />
            <TextField
              displayName="Password"
              field="password"
              type="password"
            />

            <Link className="btn btn-secondary" to="/" style={{ marginRight: '10px' }}>
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
  model: userCredentialsLogin;
  textSubmitButton: string;
  onSubmit(
    values: userCredentialsLogin,
    actions: FormikHelpers<userCredentialsLogin>
  ): void;
}

AuthFormLogin.defaultProps ={
  textSubmitButton: "Intra in cont"
}
