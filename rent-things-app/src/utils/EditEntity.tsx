import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Swal from "sweetalert2";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id }: any = useParams();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
    axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(props.transform(response.data));
      console.log(response.data);
      Swal.fire("Success", "Anunțul a fost editat.", "success");
    });
    } catch(error: any){
      setErrors(error.response.data);
      Swal.fire("Error","Ceva nu a funcționat. Încercați din nou", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function edit(entityToEdit: TCreation) {
    try {
      if(props.transformFormData){
        const formData = props.transformFormData(entityToEdit);
        await axios({
          method:'put',
          url: `${props.url}/${id}`,
          data: formData,
          headers: {"Content-Type": "multipart/form-data"}
        })
      }else{
        await axios.put(`${props.url}/${id}`, entityToEdit);
      }
      
      navigate(props.indexURL);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Editeaza {props.entityName}</h3>

      <DisplayErrors errors={errors} />
      {entity ? props.children(entity, edit) : <Loading />}
    </>
  );
}

interface editEntityProps<TCreation, TRead> {
   url: string;
    entityName: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
