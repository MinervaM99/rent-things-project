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

export default function CreateItem() {
  const [listCategory, setListCategory] = useState<categoryDTO[]>([]);
  const { claims } = useContext(AuthenticationContext);
  const [email, setEmail] = useState<string>(getUserEmail());

  const navigate = useNavigate();
  const containerStyles = {
    maxWidth: "700px",
    marginTop: "50px",
    marginBottom: "30px",
    marginLeft: "auto",
    marginRight: "auto",
  };
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 400 &&
          error.response?.data.code === 'ITEM_ALREADY_EXIST'
        ) {
          setErrors(error.response.data);
          console.log('Item already exists');
        }
      } else {
        console.log('Unexpected error', error);
      }
    }
  }

  useEffect(() => {
    axios
      .get(`${urlCategorirs}`)
      .then((response: AxiosResponse<categoryDTO[]>) => {
        setListCategory(response.data);
      });
  }, []);

  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }

  return (
    <>
      <DisplayErrors errors={errors} />
      <div style={containerStyles}>
        <h3>Inchiriaza un produs</h3>
      </div>
      <span>{getUserEmail()}</span>
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
          userId: getUserEmail(),
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
  );
}
