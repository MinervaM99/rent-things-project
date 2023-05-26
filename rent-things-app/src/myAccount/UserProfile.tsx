import { useEffect, useState } from "react";
import { itemDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";

export default function UserProfile(props: userProfileProps){
  const [items, setItems] = useState<itemDTO[]>([]);

  useEffect(() => {
    console.log(`${urlItems}/userItems/${props.userEmail}`);
    loadData();
  }, [props.userEmail]);

  function loadData() {
    try{
    axios
      .get(`${urlItems}/userItems/${props.userEmail}`)
      .then((response: AxiosResponse<itemDTO[]>) => {
        setItems(response.data);
      });
      console.log("loadData")
    }catch(error: any){
      console.log(error.data);
    }
  }
  return (
    <>
      <h2>Contul meu</h2>
      <span>{props.userEmail}</span>
      <div className="mb-3">
        <h3>Produsele publicate de mine: </h3>
        <ItemsList listOfItems={items} />
      </div>
    </>
  );
}


//to do cand apas pe buton, sa ma duca la ruta myAccount dar care sa aiba /user email astfel incat sa stie de la cine ia datele

interface userProfileProps{
  userEmail: string;
}