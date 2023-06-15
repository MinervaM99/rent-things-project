import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO } from "./category.model";
import { urlCategorirs } from "../endpoints";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import Swal from "sweetalert2";
import { Container, Typography, Box } from "@mui/material";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(category: categoryCreationDTO) {
    try {
      await axios.post(urlCategorirs, category);
      Swal.fire({
        title: "Ati adaugat o categorie noua",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("../category"); // Navigăm către pagina principală doar dacă butonul "OK" a fost apăsat
        }
      });
    } catch (error: any) {
      setErrors(error.response.data);
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("../category"); 
        }
      });
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={5} textAlign="center">
        <Typography
          variant="h4"
          component="div"
          fontWeight="bold"
          color="text.secondary"
        >
          Adaugă o categorie nouă
        </Typography>
      </Box>
      <DisplayErrors errors={errors} />
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </Container>
  );
}
