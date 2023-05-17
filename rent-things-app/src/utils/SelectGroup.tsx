import { FormGroup } from "react-bootstrap";
import Select from "react-select";
import { useField } from "formik";

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
    <div className="mb-3">
      <label>{props.displayName}</label>
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
