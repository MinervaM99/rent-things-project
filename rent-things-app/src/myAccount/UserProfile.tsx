import { useContext, useEffect, useState } from "react";
import { itemDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlAccounts, urlItems } from "../endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { userInfoDTO } from "../security/security.model";
import MyAccount from "./MyAccount";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { generateRandomColor } from "../utils/utils";
import styled from "styled-components";
import React from "react";
import AuthenticationContext from "../security/AuthentictionContext";

export default function UserProfile() {
  //user name
  const { claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const { userName }: any = useParams();
  const [items, setItems] = useState<itemDTO[]>([]);
  const [userInfo, setUserInfo] = useState<userInfoDTO>();

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }
  const userNameClaim = getUserName();
  const randomColor = generateRandomColor();

  useEffect(() => {
    loadInfoUser();
  }, [userName]);

  useEffect(() => {
    loadData();
  }, [userInfo]);

  function loadInfoUser() {
    try {
      axios
        .get(`${urlAccounts}/${userName}`)
        .then((response: AxiosResponse<userInfoDTO>) => {
          setUserInfo(response.data);
          console.log(response.data);
        });
    } catch (error: any) {}
  }

  function loadData() {
    try {
      axios
        .get(`${urlItems}/userItems/${userName}`)
        .then((response: AxiosResponse<itemDTO[]>) => {
          setItems(response.data);
        });
    } catch (error: any) {}
  }
  return (
    <>
      <StyledDiv>
        <div style={{ display: "flex", paddingTop: "50px" }}>
          <Avatar
            sx={{
              bgcolor: randomColor,
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "50px",
            }}
          >
            <span style={{ fontSize: "45px" }}>
              {userName.charAt(0).toUpperCase()}
            </span>
          </Avatar>
          <Box sx={{ marginLeft: "25px", paddingTop: "20px" }}>
            <Typography> {userInfo?.userName}</Typography>
            <br />
            Email: {userInfo?.email}
            <br />
            Numar de telefon: {userInfo?.phoneNumber}
          </Box>
        </div>

        {userNameClaim === userName ? (
          <Button
        sx={{padding: "20px", marginLeft: "40px"}}
            size="medium"
            color="inherit"
            onClick={() => navigate(`/account/edit`)}
          >
            Editează
          </Button>
        ) : null}
      </StyledDiv>
      {items.length === 0 ? null : (
        <Container>
          <h3>Anunțurile pubilicate de {userInfo?.userName} </h3>
          <ItemsList listOfItems={items} />
        </Container>
      )}
    </>
  );
}
//to do cand apas pe buton, sa ma duca la ruta myAccount dar care sa aiba /user email astfel incat sa stie de la cine ia datele

const StyledDiv = styled("div")`
  background-color: #fff;
  height: 45vh;
  width: 100%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
`;
