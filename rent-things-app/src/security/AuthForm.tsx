import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./security.model";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function AuthForm(props: authFormProps) {
  const phoneRegexro = /^(07\d{8})$/;
  const phoneRegexInt = /^\+40\d{9}$/;

  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Acest camp este obligatoriu")
            .email("Email-ul nu este valid"),
          password: Yup.string().required("Acest camp este obligatoriu"),
          phoneNumber: Yup.string()
            .matches(
              phoneRegexInt,
              "Numarul de telefon trebuie sa includa prefixul +40 urmat de 9 cifre"
            )
            .required("Acest câmp este obligatoriu"),
          userName: Yup.string()
            .required("Acest camp este obligatoriu")
            .matches(
              /^[a-zA-Z0-9]*$/,
              "Numele de utilizator poate conține doar litere și cifre"
            ),
        })}
      >
        {(formikProps) => (
          <Form>
            {/* <TextField displayName="Nume utilizator" field="userName" /> */}
            <TextField displayName="Email" field="email" />
            <TextField
              displayName="Password"
              field="password"
              type="password"
            />
            <TextField displayName="Numar de telefon" field="phoneNumber" />
            <TextField displayName="Nume de utilizator" field="userName" />

            <Link
              className="btn btn-secondary"
              style={{ marginRight: "10px" }}
              to="/"
            >
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

AuthForm.defaultProps = {
  textSubmitButton: "Intra in cont",
};
