import { FormGroup } from "react-bootstrap";
import Select from "react-select";
import { ErrorMessage, useField } from "formik";
import { InputLabel } from "@mui/material";

interface SelectGroupProps {
  options: { label: string; value: number }[];
  field: string;
  displayName: string;
}

export default function SelectGroup(props: SelectGroupProps) {
  const [, , helpers] = useField<number>(props.field);
  const handleSelectChange = (
    selectedOption: { label: string; value: number } | null
  ) => {
    helpers.setValue(selectedOption?.value || 0);
  };

  return (
    <div className="mb-5">
      <InputLabel>{props.displayName}</InputLabel>
      <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
      <FormGroup>
        <Select
          onChange={handleSelectChange}
          className="basic-single"
          classNamePrefix="select"
          options={props.options}
        />
      </FormGroup>
    </div>
  );
}
