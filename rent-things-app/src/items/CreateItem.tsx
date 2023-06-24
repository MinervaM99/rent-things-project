import { useContext, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import DisplayErrors from "../utils/DisplayErrors";
import { itemCreationDTO } from "./items.model";
import { urlCategorirs, urlItems } from "../endpoints";
import { convertItemToFormData } from "../utils/formDataUtils";
import { categoryDTO } from "../category/category.model";
import AuthenticationContext from "../security/AuthentictionContext";
import Swal from "sweetalert2";
import { Box, Typography } from "@mui/material";
import { FormContainer } from "../style";
import Authorized from "../security/Authorized";

export default function CreateItem() {
  const [listCategory, setListCategory] = useState<categoryDTO[]>([]);
  const { claims } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(item: itemCreationDTO) {
    try {
      const formData = convertItemToFormData(item);
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
      navigate("/")
    } catch (error: any) {
      Swal.fire("", `${error.response.data}`, "error");
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

  return (
    <FormContainer style={{ margin: "60px auto 50px auto", maxWidth: "700px" }}>
      <Authorized
        authorized={
          <>
            <DisplayErrors errors={errors} />
            <Box my={2} textAlign="center">
              <Typography
                sx={{ fontFamily: "Lucida Console" }}
                variant="h4"
                component="div"
                color="text.secondary"
                marginBottom="40px"
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
          </>
        }
        notAuthorized={ <Link to = {'/login'}></Link>}
      ></Authorized>
    </FormContainer>
  );
}
