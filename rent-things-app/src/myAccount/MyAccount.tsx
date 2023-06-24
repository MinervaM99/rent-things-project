import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlAccounts, urlItems } from "../endpoints";
import { itemDTO } from "../items/items.model";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Button } from "@mui/material";
import { generateRandomColor } from "../utils/utils";
import IndexTransaction from "../transactions/IndexTransaction";

export default function MyAccount() {
  const { claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [items, setItems] = useState<itemDTO[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("optiunea1");
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }
  const userName = getUserName();
  function getUserId(): string {
    return claims.find((x) => x.name === "userId")?.value || "";
  }
  const myUserId = getUserId();
  const buildAvatarLink = () => `/account/${userName}`;
  const buildEditLink = () => `/edit/${userName}`;

  useEffect(() => {
    loadData();
  }, [userName, isDeleted]);

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
        <div style={{  marginLeft: "10px",paddingTop: "50px" }}>
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
          <Button
        sx={{paddingBottom: "10px", marginLeft: "-5px"}}
            size="medium"
            color="inherit"
            onClick={() => navigate(`/account/edit`)}
          >
            Editează
          </Button>
        </div>
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
           
            <div className="mb-3" style={{marginLeft: "30px"}}>
              <ItemsList listOfItems={items} />
            </div>
          </>
        )}
        {selectedOption === "optiunea2" && (
          <>
            {/* To do - sa pun parametru si sa vad cum fac sa iau tranzactiile */}
            <IndexTransaction
              urlTransactionParam={`borrow/${myUserId}/${1 as number}`}
              title="Cerereri de împrumut în așteptare"
            />

            <IndexTransaction
              urlTransactionParam={`borrow/${myUserId}/${2 as number}`}
              title="Răspunsul la cererile de împrumut trimise"
            />
          </>
        )}
        {selectedOption === "optiunea3" && (
          <>
            <IndexTransaction
              urlTransactionParam={`lend/${myUserId}/${2 as number}`}
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
  margin-left: 10px;
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
