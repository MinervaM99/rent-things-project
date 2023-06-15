import {InputLabel} from "@mui/material";
import {
  ErrorMessage,
  Field,
  FormikContextType,
  useFormikContext,
} from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ReactQuillField(props: reactQuillFieldProps) {
  const { setFieldValue }: FormikContextType<any> = useFormikContext();

  const handleChange = (value: string) => {
    setFieldValue(props.field, value);
  };

  return (
    <div className="mb-5">
      <div>
        <InputLabel>{props.displayName}</InputLabel>

        <div>
          <Field name={props.field}>
            {({ field }: { field: any }) => (
              <ReactQuill
                value={field.value}
                onChange={handleChange}
                className="MuiTextField-root MuiOutlinedInput-root Mui-focused Mui-focused MuiInputBase-root MuiInput-root MuiInputBase-fullWidth"
              />
            )}
          </Field>
        </div>
      </div>
      <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
}

interface reactQuillFieldProps {
  displayName: string;
  field: string;
}
