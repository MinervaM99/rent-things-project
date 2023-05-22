import { useEffect, useState } from "react";
import { itemDTO, landingPageDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import Authorized from "../security/Authorized";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";

export default function LandingPage() {
  const [items, setItems] = useState<landingPageDTO>({});

  useEffect(() => {
    axios.get(urlItems).then((response: AxiosResponse<landingPageDTO>) =>{
      setItems(response.data);
    })
  }, []);

  return (
    <>
      <Authorized
        authorized={<>You are authorized</>}
        notAuthorized={<>NOT authorized</>}
        role="admin"
      />
      <h3>Sport si Relaxare</h3>
      <ItemsList listOfItems={items.lastItemsAdded} />
    </>
  );
}
