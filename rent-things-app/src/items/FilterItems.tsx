import { Field, Form, Formik } from "formik";
import { categoryDTO } from "../category/category.model";
import Button from "../utils/Button";

export default function FilterItems() {
  const initialValues: filterItemsForm = {
    title: "",
    categoryId: 0,
    forSale: false,
  };

  const categories: categoryDTO[] = [
    { id: 1, name: "Bucatarie" },
    { id: 2, name: "Gradina si curte" },
    { id: 3, name: "Haine" },
  ];

  return (
    <>
      <h3>Filter Items</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {(formikProps) => (
          <Form>
            <div className="row gx-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Numele produsului"
                  {...formikProps.getFieldProps("title")}
                />
              </div>
              <div className="col-auto">
                <select
                  className="from-select"
                  {...formikProps.getFieldProps("categoryId")}
                >
                  <option value="0">--- Alege o categorie ---</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <div className="from-check">
                  <Field
                    className="from-check-input"
                    id="forSale"
                    name="forSale"
                    type="checkbox"
                  />
                  <label className="from-check-label" htmlFor="forSale">
                    For sale
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <Button
                  className="btn btn-primary"
                  onClick={() => formikProps.submitForm()}
                  disabled={false}
                >
                  Filtreaza
                </Button>
                <Button
                  className="btn btn-danger ms-3"
                  onClick={() => formikProps.setValues(initialValues)}
                  disabled={false}
                >
                  Sterge{" "}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface filterItemsForm {
  title: string;
  categoryId: number;
  forSale: boolean;
}
