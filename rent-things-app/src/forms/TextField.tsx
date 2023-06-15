import { InputLabel } from "@mui/material";
import { ErrorMessage, Field } from "formik";

export default function MyTextField(props: textFieldProps) {
  return (
    <>
      <div className="mb-3">
        <InputLabel htmlFor={props.field}>{props.displayName} </InputLabel>
        <Field name={props.field} id={props.field} className="form-control" type={props.type} />
        <ErrorMessage name={props.field}>
          {(msg) => <div className="text-danger">{msg}</div>}
        </ErrorMessage>
      </div>
    </>
  );
}

interface textFieldProps {
  field: string;
  displayName: string;
  type: "text" | "password";
}

MyTextField.defaultProps = {
  type: "text",
};