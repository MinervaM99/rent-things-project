import { useContext, useEffect, useState } from "react";
import { itemDTO, landingPageDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import Authorized from "../security/Authorized";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import AuthenticationContext from "../security/AuthentictionContext";

export default function LandingPage() {
  const { claims } = useContext(AuthenticationContext);
  const [items, setItems] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  function getUserEmail(){
    return claims.filter((x) => x.name === "email")[0]?.value;
  }

  function loadData() {
    axios.get(urlItems).then((response: AxiosResponse<landingPageDTO>) => {
      setItems(response.data);
    });
  }

  return (
    <div style={{marginTop: "40px"}}>
      <h3>Ultimele adaugate</h3>
      <AlertContext.Provider
        value={() => {
          loadData();
        }}
      >
        <ItemsList listOfItems={items.lastItemsAdded} />
      </AlertContext.Provider>
    </div>
  );
}
