import {
  ErrorMessage,
  Field,
  FormikContextType,
  useFormikContext,
} from "formik";
// import ReactMarkdown from "react-markdown";
// import "./MarkdownField.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ReactQuillField(props: reactQuillFieldProps) {
  //const { values } = useFormikContext<any>();

  const { setFieldValue }: FormikContextType<any> = useFormikContext();

  const handleChange = (value: string) => {
    setFieldValue(props.field, value);
  };
  return (
    <div className="mb-3 form-markdown">
      <div>
        <label>{props.displayName}</label>

       
        <div>
          <Field name={props.field}>
            {({ field }: { field: any }) => (
              <ReactQuill
                value={field.value}
                onChange={handleChange}
                className="form-textarea"
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
