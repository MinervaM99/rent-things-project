import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../forms/CategoryForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlCategorirs } from "../endpoints";
import { categoryCreationDTO} from "./category.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";

export default function EditCategory() {
  const { id }: any = useParams();
  const [category, setCategory] = useState<categoryCreationDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${urlCategorirs}/${id}`)
      .then((response: AxiosResponse<categoryCreationDTO>) => {
        setCategory(response.data);
      });
  }, [id]);

  async function edit(categoryToEdit: categoryCreationDTO) {
    try {
      await axios.put(`${urlCategorirs}/${id}`, categoryToEdit);
      navigate("../category");
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Edit category</h3>

      <DisplayErrors errors={errors} />
      {category ? (
        <CategoryForm
          model={category}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
