import { Field, Form, Formik } from "formik";
import { categoryDTO } from "../category/category.model";
import Button from "../utils/Button";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlCategorirs, urlItems } from "../endpoints";
import { itemDTO } from "./items.model";
import ItemsList from "./ItemsList";
import { conditionOptions } from "../utils/SemanticNumberStorage";
import {
  MenuItem,
  Select,
  Box,
  Container,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function FilterItems() {
  const { itemName } = useParams();
  const [categories, setCategories] = useState<categoryDTO[]>([]);
  const [items, setItems] = useState<itemDTO[]>([]);
  const navigate = useNavigate();

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
    if (itemName) {
      searchItems(initialValues, itemName);
    } else {
      searchItems(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName]);

  function searchItems(values: filterItemsForm, searchParam?: string) {
    if (searchParam) {
      values.name = searchParam;
      navigate(`/items/filter/${searchParam}`);
    }
    axios
      .get(`${urlItems}/filter`, { params: values })
      .then((response: AxiosResponse<itemDTO[]>) => {
        setItems(response.data);
      });
  }

  return (
    <Container maxWidth="lg">
      <Box my={3} textAlign="center">
        <Typography
          variant="h4"
          component="div"
          fontWeight="bold"
          color="text.secondary"
        >
          Găsește obiectul de care ai nevoie
        </Typography>
      </Box>
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
                  <TextField
                    type="text"
                    sx={{ width: "300px" }}
                    className="form-control"
                    id="name"
                    placeholder="Numele produsului"
                    {...formikProps.getFieldProps("name")}
                  />
                </div>

                <div className="col-auto">
                  <Select
                    className="from-select"
                    id="category"
                    sx={{ width: "200px", height: "40px" }}
                    placeholder="categorie"
                    {...formikProps.getFieldProps("categoryId")}
                  >
                    <MenuItem sx={{ color: "gray" }} value={0}>
                      <InputLabel>Categoria</InputLabel>
                    </MenuItem>
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="col-auto">
                  <Select
                    className="form-select"
                    id="condition"
                    placeholder="conditie"
                    sx={{ width: "200px", height: "40px" }}
                    {...formikProps.getFieldProps("condition")}
                  >
                    <MenuItem sx={{ color: "gray" }} value={0}>
                      <InputLabel>Condiția</InputLabel>
                    </MenuItem>
                    {conditionOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
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
                      navigate("/items/filter");
                    }}
                    disabled={false}
                  >
                    Sterge
                  </Button>
                </div>
              </div>
            </Form>
            {items.length == 0 ? (
              <InputLabel>Nu am găsit niciun obiect. </InputLabel>
            ) : (
              <ItemsList listOfItems={items} />
            )}
          </>
        )}
      </Formik>
    </Container>
  );
}

interface filterItemsForm {
  name: string;
  categoryId: number;
  condition: number;
  page: number;
  recordsPerPage: number;
}
