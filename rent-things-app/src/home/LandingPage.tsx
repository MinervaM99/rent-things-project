import { useEffect, useState } from "react";
import { landingPageDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import Authorized from "../security/Authorized";

export default function LandingPage() {
  const [items, setItems] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setItems({
        sportsAndRelax: [
          {
            id: 1,
            title: "Idiotul",
            description: "Dostoievsky",
            price: 5,
            pictureURL:
              "https://upload.wikimedia.org/wikipedia/ro/0/06/Idiotul.jpg",
            forSale: true,
            categoryIds: 1,
          },
          {
            id: 2,
            title: "Crima si pedeapsa",
            description: "Dostoievsky",
            price: 4,
            pictureURL:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Cover_of_the_first_edition_of_Crime_and_Punishment.jpg/200px-Cover_of_the_first_edition_of_Crime_and_Punishment.jpg",
            forSale: false,
            categoryIds: 2,
          },
        ],
        transport: [
          {
            id: 3,
            title: "Remorca auto",
            description: "Remorca 2 roti",
            price: 40,
            pictureURL:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Baset_trailer.jpg/220px-Baset_trailer.jpg",
            forSale: false,
            categoryIds: 1,
          },
          {
            id: 4,
            title: "Bicicleta de munte",
            description: "Foarte buna",
            price: 20,
            pictureURL:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hardtail-mountain-bike.jpg/220px-Hardtail-mountain-bike.jpg",
            forSale: true,
            categoryIds: 2,
          },
        ],
      });
    }, 1000);

    return () => clearTimeout(timerId);
  });

  return (
    <>
      <Authorized
        authorized={<>You are authorized</>}
        notAuthorized={<>NOT authorized</>}
        role="admin"
      />
      <h3>Sport si Relaxare</h3>
      <ItemsList listOfItems={items.sportsAndRelax} />
      <h3>Transport</h3>
      <ItemsList listOfItems={items.transport} />
    </>
  );
}
