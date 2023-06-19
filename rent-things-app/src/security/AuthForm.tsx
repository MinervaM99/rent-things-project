import { Form, Formik, FormikHelpers } from "formik";
import { userCredentialsRegister } from "./security.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import MyTextField from "../forms/TextField";
import styled from "styled-components";

export default function AuthForm(props: authFormProps) {
  const phoneRegexInt = /^(07\d{8})$/;

  return (
    <div>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Acest camp este obligatoriu")
            .email("Email-ul nu este valid"),
          password: Yup.string()
            .required("Acest camp este obligatoriu")
            .min(
              8,
              "Parola trebuie să conțină cel puțin 8 caractere dintre care cel puțin o cifră și un caracter special"
            ),
          phoneNumber: Yup.string()
            .matches(
              phoneRegexInt,
              "Numarul de telefon trebuie sa includa prefixul 07 urmat de 8 cifre"
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
            <MyTextField displayName="Email" field="email" />
            <MyTextField
              displayName="Password"
              field="password"
              type="password"
            />
            <MyTextField displayName="Numar de telefon" field="phoneNumber" />
            <MyTextField displayName="Nume de utilizator" field="userName" />
            <FormButton disabled={formikProps.isSubmitting} type="submit">
              {props.textSubmitButton}
            </FormButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export const FormButton = styled(Button)`
  margin: 10px 0 0px 0px;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  background: #3B8C6E;
  color: #fff;
  text-align: center;
  padding:5px;
  height: 30px;
  &:hover, &:focus{
    background: #3b8c6ec2;
  }
  width: 100%
`;

export const FormCancelButton = styled(Link)`
  margin: 6px 0 10px 0px;
  border-radius: 5px;
  font-size: 13px;
  text-align: center;
  border: none;
  background: #1e5959;
  color: #fff;
  padding: 5px;
  height: 30px;
  &:hover,
  &:focus {
    background: #1e5959d1;
  }
`;

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
