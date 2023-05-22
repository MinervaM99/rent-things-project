import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlItems } from "../endpoints";
import { itemDTO } from "./items.model";
import Loading from "../utils/Loading";

export default function ItemDetails() {
  const { id }: any = useParams();
  const [item, setItem] = useState<itemDTO>();

  useEffect(() => {
    axios.get(`${urlItems}/details/${id}`).then((response: AxiosResponse<itemDTO>) => {
      setItem(response.data);
    });
  }, [id]);
  return (

    item ? <div>
      <h2> {item.name} {item.description}</h2>
    </div>: <Loading/>
    
  );
}
