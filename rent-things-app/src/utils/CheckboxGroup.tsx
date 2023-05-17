import React, { useState } from "react";
import { FormCheck, FormGroup } from "react-bootstrap";
import { useField } from "formik";

interface CheckboxGroupProps {
  options: { label: string; value: number }[];
  field: string;
  displayName: string;
}

export default function CheckboxGroup(props: CheckboxGroupProps) {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(); // Modificare: specifică tipul variabilei selectedValue
  const [, meta, helpers] = useField<number>(props.field); 

  const handleCheckboxChange = (value: number) => {
    if (selectedValue === value) {
      setSelectedValue(undefined); 
      helpers.setValue(0); 
    } else {
      setSelectedValue(value);
      helpers.setValue(value); 
    }
  };

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <FormGroup>
        {props.options.map((option) => (
          <FormCheck
            key={option.value}
            type="checkbox"
            id={option.value.toString()}
            label={option.label}
            checked={selectedValue === option.value}
            onChange={() => handleCheckboxChange(option.value)}
            inline
          />
        ))}
      </FormGroup>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
}

