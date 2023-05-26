import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";
import { itemDTO } from "../items/items.model";

//to do - ceva nu merge bine deoarece se da rerender si apare eroarea 404, dar tot merge

export default function MyAccount() {
  const { claims } = useContext(AuthenticationContext);
  const [items, setItems] = useState<itemDTO[]>([]);

  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }
  const userEmail = getUserEmail();

  useEffect(() => {
    console.log(`${urlItems}/userItems/${userEmail}`);
    loadData();
  }, [userEmail]);

  function loadData() {
    try{
    axios
      .get(`${urlItems}/userItems/${userEmail}`)
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
      <span>{getUserEmail()}</span>
      <div className="mb-3">
        <h3>Produsele publicate de mine: </h3>
        <ItemsList listOfItems={items} />
      </div>
    </>
  );
}
