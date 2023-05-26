import { Field, Form, Formik } from "formik";
import { categoryDTO } from "../category/category.model";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlCategorirs, urlItems } from "../endpoints";
import { itemDTO } from "./items.model";
import ItemsList from "./ItemsList";

export default function FilterItems() {
  const [categories, setCategories] = useState<categoryDTO[]>([]);
  const [items, setItems] = useState<itemDTO[]>([]);

  // to do - show all items on  the page, and continue with filter part 1 and 2
  const initialValues: filterItemsForm = {
    name: "",
    categoryId: 0,
    condition: 0,
    page: 1,
    recordsPerPage: 10,
  };

  useEffect(() => {
    try {
      axios
        .get(`${urlCategorirs}`)
        .then((response: AxiosResponse<categoryDTO[]>) => {
          setCategories(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    searchItems(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchItems(values: filterItemsForm) {
    axios
      .get(`${urlItems}/filter`, { params: values })
      .then((response: AxiosResponse<itemDTO[]>) => {
        setItems(response.data);
      });
  }

  return (
    <>
      <h3>Filter Items</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          values.page = 1;
          searchItems(values);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="row gx-3 align-items-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Numele produsului"
                    {...formikProps.getFieldProps("name")}
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
                  <select
                    className="form-select"
                    id="condition"
                    placeholder="conditie"
                    {...formikProps.getFieldProps("condition")}
                  >
                    <option value="0">---Conditia---</option>
                    <option key={1} value={1}>
                      Nou{" "}
                    </option>
                    <option key={2} value={2}>
                      Aproape nou{" "}
                    </option>
                    <option key={3} value={3}>
                      In stare Buna{" "}
                    </option>
                    <option key={4} value={4}>
                      Utilizat{" "}
                    </option>
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
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchItems(initialValues);
                    }}
                    disabled={false}
                  >
                    Sterge{" "}
                  </Button>
                </div>
              </div>
            </Form>

            <ItemsList listOfItems={items} />
          </>
        )}
      </Formik>
    </>
  );
}

interface filterItemsForm {
  name: string;
  categoryId: number;
  condition: number;
  page: number;
  recordsPerPage: number;
}
