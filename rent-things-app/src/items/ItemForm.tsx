import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
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
import MyTextField from "../forms/TextField";
import ReactQuillField from "../forms/ReactQuillField";
import CheckboxGroup from "../utils/CheckboxGroup";
import CheckBoxWithInput from "../utils/CheckBoxWithInput";
import SelectGroup from "../utils/SelectGroup";
import Map from "../utils/Map";
import { Container, InputLabel } from "@mui/material";
import { ageOptions, conditionOptions } from "../utils/SemanticNumberStorage";

export default function ItemForm(props: itemFormProps) {
  const categoryOptions = props.selectedCategory.map((object) => ({
    value: object.id,
    label: object.name,
  }));

  const initialCategory = categoryOptions.find(c => c.value === props.model.categoryId)

  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionModel | null>(initialCategory ? initialCategory : null);

  const initialAge = ageOptions.find(a => a.value === props.model.age);
  const [selectedAge, setSelectedAge] =
    useState<SelectedOptionModel | null>(initialAge ? initialAge : null);

  const handleChange = (selectedOption: SelectedOptionModel | null) => {
    if(selectedOption) setSelectedOption(selectedOption);
    console.log(selectedOption?.value);
  };

  const handleChangeAge = (selectedOption: SelectedOptionModel | null) => {
    if(selectedOption) setSelectedAge(selectedOption);
  };

  // const [location, setLocation] = useState<string>(""); // props.model.location


console.log(props.model, categoryOptions);
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={(values, actions) => {
          if (!selectedOption) {
            actions.setFieldError("categoryId", "Selectează o categorie.");
            actions.setSubmitting(false);
          } else {
            values.categoryId = selectedOption.value;
            values.age = selectedAge ? selectedAge.value : props.model.age;
            console.log("submit");
            props.onSubmit(values);
          }
        }}
        validationSchema={Yup.object({
          description: Yup.string()
            .required("Adaugă o descriere pentru produsul tău.")
            .firstLetterUppercase(),
          name: Yup.string()
            .required("Acest camp este obligatoriu")
            .firstLetterUppercase(),
          condition: Yup.string().required("Acest camp este obligatoriu"),
          age: Yup.string().required("Acest camp este obligatoriu"),
          dayPrice: Yup.string().test({
            name: "dayPrice",
            message: "Acest camp este obligatoriu",
            test: function (value) {
              return value !== undefined && value !== null && value !== "";
            },
          }),
        })}
      >
        {(formikProps) => (
          <Form>
            <div className="mb-5">
              <InputLabel sx={{paddingBottom: "10px"}}>
                Selecteaza categoria care se potrivește cel mai bine produsului
                tău
              </InputLabel>
              <ErrorMessage name="categoryId">
                {(msg) => <div className="text-danger">{msg}</div>}
              </ErrorMessage>
              <Select
                menuPlacement="auto"
                className="basic-single"
                classNamePrefix="select"
                defaultValue={selectedOption}
                name="categoryId"
                onChange={handleChange}
                options={categoryOptions}
              />
            </div>
            <MyTextField field="name" displayName="Titlu" />
            <ReactQuillField field="description" displayName="Descriere" />
            <ImageField
              displayName="Adauga o imagine"
              field="photo"
              imgURL={props.model.pictureURL}
            />

            <CheckboxGroup
              value={props.model.condition}
              options={conditionOptions}
              field="condition"
              displayName="Selectează condiția produsului:"
            />

            <div className="mb-5">
              <InputLabel sx={{paddingBottom: "10px"}}>
                Selecteaza varsta produsului
              </InputLabel>
              <ErrorMessage name="age">
                {(msg) => <div className="text-danger">{msg}</div>}
              </ErrorMessage>
              <Select
                menuPlacement="auto"
                className="basic-single"
                classNamePrefix="select"
                defaultValue={selectedAge}
                name="age"
                onChange={handleChangeAge}
                options={ageOptions}
              />
            </div>

            {/* <div>
          <Map/>
            </div> */}

            <div className="mb-5">
              <InputLabel>Cum doresti sa inciriezi acest produs?</InputLabel>
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

            {/* <MyTextField field="location" displayName="Locația" /> */}
            <MyTextField field="location" displayName="Locația obiectului" />

            <Button type="submit" disabled={formikProps.isSubmitting}>
              Salveaza
            </Button>
            <Link className="btn btn-secondary" to="../">
              Anuleaza
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface itemFormProps {
  model: itemCreationDTO;
  onSubmit(
    values: itemCreationDTO,
    action?: FormikHelpers<itemCreationDTO>
  ): void;
  selectedCategory: categoryDTO[];
}

export interface SelectedOptionModel {
  value: any;
  label: string;
}
