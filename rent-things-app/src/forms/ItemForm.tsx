import { Field, Form, Formik, FormikHelpers } from "formik";
import { itemDTO } from "../items/items.model";
import * as Yup from "yup";
import TextField from "./TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import ImageField from "./ImageField";
import MarkdownField from "./MarkdownField";

export default function ItemForm(props: itemFormProps) {
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          title: Yup.string()
            .required("Acest camp este obligatoriu")
            .firstLetterUppercase(),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field="title" displayName="Titlu" />
            <MarkdownField displayName="Descriere" field="description"/>
            <TextField field="price" displayName="Pret" />
            <ImageField
              displayName="Adauga o imagine"
              field="itemImage"
              imgURL={props.model.pictureURL}
            />
            

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

            <Button type="submit">Salveaza</Button>
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
}
