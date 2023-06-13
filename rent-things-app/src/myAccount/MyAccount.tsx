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
  const [selectedOption, setSelectedOption] = useState<string>();
  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }
  const userName = getUserName();
  const buildAvatarLink = () => `/account/${userName}`;

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
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid yourColorHere",
            borderRadius: "50%",
          }}
        >
          <Link to={buildAvatarLink()}>
            {userName ? userName.charAt(0).toUpperCase() : null}
          </Link>
        </Avatar>
        <ContainerLinks>
          <NavLinks>
            <StyledLink
              to="/myAccount"
              onClick={() => handleOptionSelect("optiunea1")}
              selected={selectedOption === "optiunea1"}
            >
              Produsele mele
            </StyledLink>
            <Divider />
            <StyledLink
              to="#"
              onClick={() => handleOptionSelect("optiunea2")}
              selected={selectedOption === "optiunea2"}
            >
              Tranzacțiiel mele
            </StyledLink>
            <Divider />
            <StyledLink
              to="#"
              onClick={() => handleOptionSelect("optiunea3")}
              selected={selectedOption === "optiunea3"}
            >
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
              <ItemsList listOfItems={items} />
            </div>
          </>
        )}
        {selectedOption === "optiunea2" && (
          <>
            {/* To do - sa pun parametru si sa vad cum fac sa iau tranzactiile */}
            <h3>Cerereri de împrumut în așteptare</h3>
            <IndexTransaction
              urlTransactionParam={`borrow/${userName}`}
              statusParam={1}
            />

            <h3>Cereri de imprumut acceptate</h3>
            <IndexTransaction
              urlTransactionParam={`borrow/${userName}`}
              statusParam={2}
            />
            <h3>Cereri de imprumut respinse</h3>
            <IndexTransaction
              urlTransactionParam={`borrow/${userName}`}
              statusParam={3}
            />
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
const ContainerLinks = styled.div`
  padding-top: 35px;
`;
const Menu = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #f5f5f5;
  justify-content: center;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  text-decoration: none;
  color: ${({ selected }) => (selected ? "#7918c9" : "#333")};
  text-transform: uppercase;
  font-weight: bold;
  padding-block: 10px;

  &:hover {
    color: #a967df;
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
