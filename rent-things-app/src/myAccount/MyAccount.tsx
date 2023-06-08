import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";
import { itemDTO } from "../items/items.model";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

//to do - ceva nu merge bine deoarece se da rerender si apare eroarea 404, dar tot merge

export default function MyAccount() {
  const { claims } = useContext(AuthenticationContext);
  const [items, setItems] = useState<itemDTO[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }
  const userEmail = getUserEmail();

  useEffect(() => {
    loadData();
  }, [userEmail]);

  function loadData() {
    try {
      axios
        .get(`${urlItems}/userItems/${userEmail}`)
        .then((response: AxiosResponse<itemDTO[]>) => {
          setItems(response.data);
        });
      console.log("loadData");
    } catch (error: any) {
      console.log(error.data);
    }
  }

  function handleOptionSelect(option: string) {
    setSelectedOption(option);
  }

  return (
    <>
      <FixedMenu>
        <h3>Meniu</h3>
        <FixedMenu>
          <h3>Meniu</h3>
          <Nav variant="pills" className="flex-column">
            <Link
              to="/myAccount"
              onClick={() => handleOptionSelect("optiunea1")}
            >
              Optiunea 1
            </Link>
            <Link to="#" onClick={() => handleOptionSelect("optiunea2")}>
              Optiunea 2
            </Link>
            <Link to="#" onClick={() => handleOptionSelect("optiunea3")}>
              Optiunea 3
            </Link>
          </Nav>
        </FixedMenu>
      </FixedMenu>
      <Content>
        <div style={{ width: "70%" }}>
          {selectedOption === "optiunea1" && (
            <>
              <h2>Produsele mele</h2>

              <div className="mb-3">
                <h3>Produsele publicate de mine:</h3>
                <ItemsList listOfItems={items} />
              </div>
            </>
          )}
          {selectedOption === "optiunea2" && (
            <>
              <h2>Imprumuturile mele</h2>
            </>
          )}
          {selectedOption === "optiunea3" && (
            <>
              <h2>Cui ai dat</h2>
            </>
          )}
        </div>
      </Content>
    </>
  );
}

const FixedMenu = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  z-index: 1; */
`;
const Content = styled.div`
  /* margin-left: 30%;
  padding: 20px; */
`;
