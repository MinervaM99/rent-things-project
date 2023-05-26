import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO } from "./category.model";
import { urlCategorirs } from "../endpoints";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import Swal from "sweetalert2";

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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 400 &&
          error.response?.data.code === "CATEGORY_ALREADY_EXIST"
        )
          setErrors(error.response.data);
        console.log("Category exists");
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  return (
    <>
      <h3>Adauga o categorie</h3>
      <DisplayErrors errors={errors} />
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
