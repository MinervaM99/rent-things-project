import { Form, Formik, FormikProps } from "formik";
import { categoryDTO } from "../category/category.model";
import Button from "../utils/Button";
import { KeyboardEvent, useEffect, useState } from "react";
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
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";

const SearchBox = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: #f5f5f5e2;
  width: 400px;
  height: 50px;
  margin-top: 6%;
  border: 2px solid #007369;
`;

const SearchTextField = styled.input`
  border-radius: 8px 0 0 8px;
  height: 100%;
  width: 100%;
  border: none;
  position: relative;
  margin-left: 0;
  font-size: 15px;
  /* text-align: left; */
  color: #008c72;
  padding-left: 10px;
`;

const SearchBarButton = styled(Button)`
  height: 46px;
  width: 50px;
  background-color: #25684f;
  border-radius: 0 2px 2px 0;
  border: none;
`;

export default function FilterItems() {
  const { itemName } = useParams();
  const [categories, setCategories] = useState<categoryDTO[]>([]);
  const [items, setItems] = useState<itemDTO[]>([]);
  const navigate = useNavigate();

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

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    formikProps: FormikProps<filterItemsForm>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if Enter is pressed
      formikProps.submitForm();
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
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
                <Box
                  my={3}
                  textAlign="left"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "65px 0 50px 0",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div
                    className="col-auto"
                    style={{ backgroundColor: "#fff", marginLeft: "70px" }}
                  >
                    <SearchBox style={{ width: "450px" }}>
                      <SearchTextField
                        aria-placeholder="Caută un obiect"
                        id="name"
                        placeholder="Caută un obiect..."
                        {...formikProps.getFieldProps("name")}
                        onKeyDown={(event) => handleKeyDown(event, formikProps)}
                      />
                      <SearchBarButton>
                        <SearchIcon
                          onClick={() => formikProps.submitForm()}
                          style={{ fontSize: "32px", color: "#fff" }}
                        />
                      </SearchBarButton>
                    </SearchBox>
                  </div>
                  <Typography
                    sx={{
                      fontSize: "40px",
                      width: "50%",
                      color: "#008C72",
                      fontWeight: "900",
                      fontFamily: "Lucida Console",
                      margin: "-15px 0 0 0"
                    }}
                    variant="h4"
                    component="div"
                    fontWeight="bold"
                  >
                    Găsește obiectul de care
                    <br /> ai nevoie
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "50%",
                        fontFamily: "Lucida Console",
                        padding: "5px 0 0 0"
                      }}
                      variant="h1"
                      component="div"
                      color="text.secondary"
                    >
                      și vecinul dispus să
                      <br /> îl împrumute
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Divider />
                </Box>
              </div>
              <div
                className="row gx-3 align-items-center"
                style={{ backgroundColor: "#f4f5f7", padding: "7px 0 5px 0" }}
              >
                <Select
                  className="from-select"
                  id="category"
                  sx={{
                    width: "190px",
                    height: "35px",
                    backgroundColor: "#fff",
                    marginLeft: "77px",
                  }}
                  placeholder="categorie"
                  {...formikProps.getFieldProps("categoryId")}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Setează înălțimea maximă pentru meniu
                        overflow: "auto", // Activează bara de defilare pentru meniu
                      },
                    },
                  }}
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

                <Select
                  className="form-select"
                  id="condition"
                  placeholder="conditie"
                  sx={{ marginLeft: "10px", width: "190px", height: "35px" }}
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

                <div
                  className="col-auto"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <Button
                    className="btn btn-primary"
                    // style={{backgroundColor: "#8e3fe7" }}
                    onClick={() => formikProps.submitForm()}
                    disabled={false}
                    style={{margin: "0 -7px 0 10px"}}
                    
                  >
                    Caută
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchItems(initialValues);
                    }}
                    disabled={false}
                  >
                    Sterge
                  </Button>
                </div>
              </div>
            </Form>
            <ItemsContainer>
              {items.length === 0 ? (
                <InputLabel
                  sx={{
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  Nu s-a găsit niciun obiect.{" "}
                </InputLabel>
              ) : (
                <ItemsList listOfItems={items} />
              )}
            </ItemsContainer>
          </>
        )}
      </Formik>
    </div>
  );
}

interface filterItemsForm {
  name: string;
  categoryId: number;
  condition: number;
  page: number;
  recordsPerPage: number;
}

const ItemsContainer = styled.div`
  background-color: #f4f5f7;
  margin-bottom: 20px;
`;
