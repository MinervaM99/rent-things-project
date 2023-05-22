import { Form, Formik, FormikHelpers } from "formik";
import { itemCreationDTO } from "../items/items.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { categoryDTO } from "../category/category.model";
import Select from "react-select";
import "./ItemForm.css";
import ImageField from "../forms/ImageField";
import TextField from "../forms/TextField";
import ReactQuillField from "../forms/ReactQuillField";
import CheckboxGroup from "../utils/CheckboxGroup";
import CheckBoxWithInput from "../utils/CheckBoxWithInput";
import SelectGroup from "../utils/SelectGroup";

export default function ItemForm(props: itemFormProps) {
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionModel | null>(null);

  const handleChange = (selectedOption: SelectedOptionModel | null) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption?.value);
  };

  const categoryOptions = props.selectedCategory.map((object) => ({
    value: object.id,
    label: object.name,
  }));
  const conditionOptions = [
    { label: "Nou", value: 1 },
    { label: "Aproape nou", value: 2 },
    { label: "In stare bună", value: 3 },
    { label: "Utilizat", value: 4 },
  ];
  const ageOptions = [
    { label: "Mai putin de un an", value: 1 },
    { label: "Mai putin de 2 ani", value: 2 },
    { label: "Mai putin de 5 ani", value: 3 },
    { label: "Mai putin de 5 ani", value: 4 },
    { label: "Nu stiu", value: 5 },
  ];

  const containerStyles = {
    maxWidth: "600px",
    margin: "0 auto",
  };

  return (
    <>
      <div style={containerStyles}>
        <Formik
          initialValues={props.model}
          onSubmit={(values, actions) => {
            values.categoryId = selectedOption?.value;
            props.onSubmit(values, actions);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Acest camp este obligatoriu")
              .firstLetterUppercase(),
            description: Yup.string().required("Acest camp este obligatoriu"),
            condition: Yup.string().required("Acest camp este obligatoriu"),
            age: Yup.string().required("Acest camp este obligatoriu"),
          })}
        >
          {(formikProps) => (
            <Form>
                <div className="mb-3">
                <label>Selecteaza o categorie</label>
                <Select
                  menuPlacement="auto"
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                  name="categoryId"
                  onChange={handleChange}
                  options={categoryOptions}
                />
              </div>
              <TextField field="name" displayName="Titlu" />
              <ReactQuillField field="description" displayName="Descriere" />
              <ImageField
                displayName="Adauga o imagine"
                field="photo"
                imgURL={props.model.pictureURL}
              />

              <CheckboxGroup
                options={conditionOptions}
                field="condition"
                displayName="Selectează condiția produsului:"
              />

              <SelectGroup
                displayName="Selecteaza varsta produsului"
                field="age"
                options={ageOptions}
              />

              {/* <div>
              <Map />
            </div> */}

              <div className="mb-3">
                <label>Cum doresti sa inciriezi acest produs?</label>
                <div
                  className="mb-3"
                  style={{ display: "inline-flex", maxWidth: "600px" }}
                >
                  <CheckBoxWithInput
                    options={[{ label: "Zi", value: "dayPrice" }]}
                    field="dayPrice"
                  />
                  <CheckBoxWithInput
                    options={[{ label: "Saptamana", value: "weekPrice" }]}
                    field="weekPrice"
                  />
                  <CheckBoxWithInput
                    options={[{ label: "Luna", value: "monthPrice" }]}
                    field="monthPrice"
                  />
                </div>
              </div>

              <Button type="submit" disabled={formikProps.isSubmitting}>
                Salveaza
              </Button>
              <Link className="btn btn-secondary" to="../">
                Anuleaza
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

interface itemFormProps {
  model: itemCreationDTO;
  onSubmit(
    values: itemCreationDTO,
    action: FormikHelpers<itemCreationDTO>
  ): void;
  selectedCategory: categoryDTO[];
}

export interface SelectedOptionModel {
  value: any;
  label: string;
}
