import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlAccounts, urlItems } from "../endpoints";
import { itemDTO } from "../items/items.model";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { generateRandomColor } from "../utils/utils";
import IndexTransaction from "../transactions/IndexTransaction";

export default function MyAccount() {
  const { claims } = useContext(AuthenticationContext);
  const [items, setItems] = useState<itemDTO[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("optiunea1");
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
              to="/myAccount/1"
              onClick={() => handleOptionSelect("optiunea1")}
              selected={selectedOption === "optiunea1"}
            >
             Anunțurile mele
            </StyledLink>
            <Divider />
            <StyledLink
              to="#"
              onClick={() => handleOptionSelect("optiunea2")}
              selected={selectedOption === "optiunea2"}
            >
              Cereri de imprumut trimise
            </StyledLink>
            <Divider />
            <StyledLink
              to="/account/transactions"
              onClick={() => handleOptionSelect("optiunea4")}
              selected={selectedOption === "optiunea4"}
            >
              Cereri de împrumut primite
            </StyledLink>
            <Divider />
            <StyledLink
              to="#"
              onClick={() => handleOptionSelect("optiunea3")}
              selected={selectedOption === "optiunea3"}
            >
              Împrumuturi oferite
            </StyledLink>
          </NavLinks>
        </ContainerLinks>
      </Menu>
      <Content>
        {selectedOption === "optiunea1" && (
          <>
            <h2>Anunțurile mele</h2>
            <div className="mb-3">
              <ItemsList listOfItems={items} />
            </div>
          </>
        )}
        {selectedOption === "optiunea2" && (
          <>
            {/* To do - sa pun parametru si sa vad cum fac sa iau tranzactiile */}
            <IndexTransaction
              urlTransactionParam={`borrow/${userName}/${1 as number}`}
              title="Cerereri de împrumut în așteptare"
            />

            <IndexTransaction
              urlTransactionParam={`borrow/${userName}/${2 as number}`}
              title="Răspunsul la cererile de împrumut trimise"
            />
          </>
        )}
        {selectedOption === "optiunea3" && (
          <>
            <IndexTransaction
              urlTransactionParam={`lend/${userName}/${2 as number}`}
              title="Istoricul imprumuturilor oferite"
              transactionType={1} //lender
            />
          </>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: auto;
`;
const ContainerLinks = styled.div`
  padding-top: 35px;
`;
const Menu = styled.div`
  width: 20%;
  padding: 20px;
  background-color: #fff;
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
