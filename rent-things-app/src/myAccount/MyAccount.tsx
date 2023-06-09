import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";
import { itemDTO } from "../items/items.model";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { generateRandomColor } from "../utils/utils";
import IndexTransaction from "../transactions/IndexTransaction";

export default function MyAccount() {
  const { claims } = useContext(AuthenticationContext);
  const [items, setItems] = useState<itemDTO[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }
  const userName = getUserName();

  useEffect(() => {
    loadData();
  }, [userName]);

  function loadData() {
    try {
      axios
        .get(`${urlItems}/userItems/${userName}`)
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

  const randomColor = generateRandomColor();
  return (
    <Container>
      <Menu>
        <Avatar
          sx={{
            bgcolor: randomColor,
            width: 70,
            height: 70,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items && items.length > 0 && items[0].userId?.userName && (
            <StyledLetter>
              {items[0].userId.userName.charAt(0).toUpperCase()}
            </StyledLetter>
          )}
        </Avatar>
        <h3>Contul meu</h3>
        <ContainerLinks>
        <NavLinks>
          <StyledLink
            to="/myAccount"
            onClick={() => handleOptionSelect("optiunea1")}
          >
            Produsele mele
          </StyledLink>
          <Divider />
          <StyledLink to="#" onClick={() => handleOptionSelect("optiunea2")}>
            Tranzacțiiel mele
          </StyledLink>
          <Divider />
          <StyledLink to="#" onClick={() => handleOptionSelect("optiunea3")}>
            Editeaza contul
          </StyledLink>
        </NavLinks>
        </ContainerLinks>
      </Menu>
      <Content>
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
            <IndexTransaction/>
          </>
        )}
        {selectedOption === "optiunea3" && (
          <>
            <h2>Cui ai dat</h2>
          </>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const ContainerLinks= styled.div`
  padding-top: 35px;
`;
const Menu = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #f5f5f5;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  text-transform: uppercase;
  font-weight: bold;
  padding-block: 10px;

  &:hover {
    color: #7918c9;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const StyledLetter = styled.span`
  font-size: 34px;
`;