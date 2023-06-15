import { Form, Formik, FormikHelpers } from "formik";
import { userCredentialsRegister } from "./security.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import MyTextField from "../forms/TextField";

export default function AuthForm(props: authFormProps) {
  const phoneRegexInt = /^(07\d{8})$/;

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
              "Numarul de telefon trebuie sa includa prefixul 07 urmat de 8 cifre"
            )
            .required("Acest câmp este obligatoriu"),
          userName: Yup.string()
            .matches(
              /^[a-zA-Z0-9]*$/,
              "Numele de utilizator poate conține doar litere și cifre"
            ).required("Acest camp este obligatoriu"),
        })}
      >
        {(formikProps) => (
          <Form>
            {/* <TextField displayName="Nume utilizator" field="userName" /> */}
            <MyTextField displayName="Email" field="email" />
            <MyTextField
              displayName="Password"
              field="password"
              type="password"
            />
            <MyTextField displayName="Numar de telefon" field="phoneNumber" />
            <MyTextField displayName="Nume de utilizator" field="userName" />

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
  model: userCredentialsRegister;
  textSubmitButton: string;
  onSubmit(
    values: userCredentialsRegister,
    actions: FormikHelpers<userCredentialsRegister>
  ): void;
}

AuthForm.defaultProps = {
  textSubmitButton: "Intra in cont",
};
