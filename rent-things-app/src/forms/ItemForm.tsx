import { Field, Form, Formik, FormikHelpers } from "formik";
import { itemDTO } from "../items/items.model";
import * as Yup from "yup";
import TextField from "./TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import ImageField from "./ImageField";
import MarkdownField from "./MarkdownField";
import Map from "../utils/Map";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { categoryDTO } from "../category/category.model";
import Select from "react-select";
import "./ItemForm.css";

export default function ItemForm(props: itemFormProps) {
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionModel | null>(null);

  const handleChange = (selectedOption: SelectedOptionModel | null) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption?.value);
  };

  const options = props.selectedCategory.map((object) => ({
    value: object,
    label: object.name,
  }));

  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={(values, actions) => {
          values.categoryIds = selectedOption?.value;
          props.onSubmit(values, actions);
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required("Acest camp este obligatoriu")
            .firstLetterUppercase(),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field="title" displayName="Titlu" />
            <MarkdownField displayName="Descriere" field="description" />
            <TextField field="price" displayName="Pret" />
            <ImageField
              displayName="Adauga o imagine"
              field="itemImage"
              imgURL={props.model.pictureURL}
            />

            <div>
              <label>Selecteaza o categorie</label>
              <Select
                menuPlacement="auto"
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                name="category"
                onChange={handleChange}
                options={options}
              />
            </div>

            {/* <div>
              <Map />
            </div> */}

            <div className="from-check">
              <Field
                className="from-check-input"
                id="forSale"
                name="forSale"
                type="checkbox"
              />
              <label className="from-check-label" htmlFor="forSale">
                De vanzare
              </label>
            </div>

            <Button type="submit" disable={formikProps.isSubmitting}>
              Salveaza
            </Button>
            <Link className="btn btn-secondary" to="/category">
              Anuleaza
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface itemFormProps {
  model: itemDTO;
  onSubmit(values: itemDTO, action: FormikHelpers<itemDTO>): void;
  selectedCategory: categoryDTO[];
}

export interface SelectedOptionModel {
  value: any;
  label: string;
}
