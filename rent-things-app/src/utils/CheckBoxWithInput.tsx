import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import { FormCheck, InputGroup, FormControl } from "react-bootstrap";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  field: string;
  displayName?: string;
}

const CheckBoxWithInput: React.FC<Props> = (props) => {
  const { options, field, displayName } = props;
  const [fieldInput, , fieldHelpers] = useField(field);
  const [isChecked, setIsChecked] = useState(fieldInput.value === "");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  
    if (!isChecked) {
      fieldHelpers.setValue("");
    } else {
      fieldHelpers.setValue(undefined); // setează câmpul dayPrice ca fiind nevalid
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Verifică dacă valoarea introdusă este un număr valid și nu este negativ
    const parsedValue = Number(value);

    if (!isNaN(parsedValue) && isFinite(parsedValue) && parsedValue >= 0) {
      fieldHelpers.setValue(parsedValue);
    }
  };

  return (
    <>
      <div style={{ marginLeft: "80px" }}>
        <label>{displayName}</label>
        {options.map((option) => (
          <div key={option.value}>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <FormCheck
                type="checkbox"
                id={option.value}
                label={option.label}
                checked={isChecked}
                onChange={handleCheckboxChange}
                inline
                style={{ marginLeft: "10px", marginTop: "0px" }}
              />
            </div>
            <InputGroup>
              <FormControl
                type="number" // schimbare type de la text la number
                step="0.01" // permite numere cu două zecimale
                disabled={!isChecked}
                placeholder="00.00"
                id={option.value}
                value={fieldInput.value || ""}
                onChange={handleInputChange}
              />
              <InputGroup.Text>Ron</InputGroup.Text>
            </InputGroup>
          </div>
        ))}
         <ErrorMessage name={props.field}>
          {(msg) => <div className="text-danger">{msg}</div>}
        </ErrorMessage>
      </div>
    </>
  );
};

export default CheckBoxWithInput;
