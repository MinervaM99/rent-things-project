import { useContext, useEffect, useState } from "react";
import { landingPageDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
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

  function getUserName(){
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }

  function loadData() {
    try{
      axios.get(urlItems).then((response: AxiosResponse<landingPageDTO>) => {
        setItems(response.data);
      });
    }catch(error: any){
      console.log(error.response.data)
    }
    
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
