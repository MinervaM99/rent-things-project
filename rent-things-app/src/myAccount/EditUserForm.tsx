import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import TextField from "../forms/TextField";
import * as Yup from "yup";
import { userInfoDTO } from "../security/security.model";
import { Container } from "@mui/material";

export default function EditUserForm(props: userFormProps) {
  const phoneRegexInt = /^(07\d{8})$/; 
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Acest câmp este obligatoriu")
            .email("Introduceți o adresă de email validă."),
          phoneNumber: Yup.string()
            .matches(
              phoneRegexInt,
              "Numarul de telefon trebuie sa includa prefixul 07 urmat de 8 cifre"
            )
            .required("Acest câmp este obligatoriu"),
        })}
      >
        {/* desable the subscribe button */}

        {(formikProps) => (
          <Form>
           

            <TextField field="email" displayName="Email" />
            <TextField field="phoneNumber" displayName="Numar de telefon" />

            <Button type="submit" disabled={formikProps.isSubmitting}>
              Salveaza
            </Button>
            <Link className="btn btn-secondary" to={props.cancelUrl}>
              Anuleaza
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface userFormProps {
  model: userInfoDTO;
  onSubmit(values: userInfoDTO, action: FormikHelpers<userInfoDTO>): void;
  cancelUrl: string;
}
