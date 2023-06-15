import { useContext, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import DisplayErrors from "../utils/DisplayErrors";
import { itemCreationDTO } from "./items.model";
import { urlCategorirs, urlItems } from "../endpoints";
import { convertItemToFormData } from "../utils/formDataUtils";
import { categoryDTO } from "../category/category.model";
import AuthenticationContext from "../security/AuthentictionContext";
import Swal from "sweetalert2";
import { Box, Container, InputLabel, Typography } from "@mui/material";

export default function CreateItem() {
  const [listCategory, setListCategory] = useState<categoryDTO[]>([]);
  const { claims } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(item: itemCreationDTO) {
    try {
      console.log(item);
      const formData = convertItemToFormData(item);

      console.log(formData.values());
      await axios({
        method: "post",
        url: urlItems,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        title: "Confirmare",
        text: "Anuntul a fost adaugat!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate(`/`);
    } catch (error: any) {
      console.log("Unexpected error", error);
      Swal.fire("", "A aparut o eroare. Incearcă din nou.", "error");
      navigate(`/`);
    }
  }

  useEffect(() => {
    axios
      .get(`${urlCategorirs}`)
      .then((response: AxiosResponse<categoryDTO[]>) => {
        setListCategory(response.data);
      });
  }, []);

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value.toString();
  }
  console.log(getUserName());

  return (
    <Container maxWidth="sm">
      <DisplayErrors errors={errors} />
      <Box my={5} textAlign="center">
        <Typography
          variant="h4"
          component="div"
          fontWeight="bold"
          color="text.secondary"
        >
          Adaugă un anunț
        </Typography>
      </Box>
      <ItemForm
        model={{
          name: "",
          description: "",
          condition: 0,
          pictureURL: "",
          age: 0,
          location: "",
          dayPrice: 0,
          monthPrice: 0,
          weekPrice: 0,
          available: true,
          userId: getUserName(),
          categoryId: 0,
        }}
        onSubmit={async (value) => {
          await create(value);
        }}
        selectedCategory={listCategory.map((object) => ({
          id: object.id,
          name: object.name,
        }))}
      />
    </Container>
  );
}
