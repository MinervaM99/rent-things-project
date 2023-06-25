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
    <div>
      <StyledDiv>
        <div style={{ display: "flex", paddingTop: "30px" }}>
          <div style={{ display: "flex", paddingTop: "15px" }}>
            <Avatar
              sx={{
                bgcolor: randomColor,
                width: 75,
                height: 75,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "50px",
                fontFamily: "Lucida Console",
              }}
            >
              <span style={{ fontSize: "45px" }}>
                {userName.charAt(0).toUpperCase()}
              </span>
            </Avatar>
          </div>
          <Box sx={{ marginLeft: "25px", paddingTop: "30px" }}>
            <Typography
              sx={{ fontFamily: "Lucida Console", paddingBottom: "10px" }}
              variant="h4"
              component="div"
              color="text.secondary"
            >
              {userInfo?.userName}
            </Typography>
            <div >
              <b style={{ padding: "0 10px 10px 0" ,fontSize: "14px",color: "#474545ee"}}>Email:</b>
              <i style={{ fontSize: "18px" }}>{userInfo?.email}</i>
            </div>
            <div style={{paddingTop: "1px"}}>
              <b style={{ paddingRight: "10px", marginTop: "30px" ,fontSize: "14px",color: "#474545ee"}}>
                Număr de telefon:
              </b>
              <i style={{ fontSize: "15px" }}><b>{userInfo?.phoneNumber}</b></i>
              
            </div>
          </Box>
        </div>

        {userNameClaim === userName ? (
          <Button
            sx={{ padding: "8px", margin: "-43px 0 0 50px " }}
            size="medium"
            color="inherit"
            onClick={() => navigate(`/account/edit`)}
          >
            Editează
          </Button>
        ) : null}
      </StyledDiv>
      {items.length === 0 ? null : (
        <div
          style={{
            backgroundColor: "#f4f5f7",
            margin: "0px 10px 0 10px",
            paddingRight: "10px",
          }}
        >
          <Typography
            sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingLeft: "60px",
            }}
            variant="h5"
            component="div"
            color="text.secondary"
          >
            ANUNȚURI PUBLICATE DE {userInfo?.userName}
          </Typography>
          <div style={{ display: "flex", paddingLeft: "45px" }}>
            <ItemsList listOfItems={items} />
          </div>
        </div>
      )}
    </div>
  );
}
//to do cand apas pe buton, sa ma duca la ruta myAccount dar care sa aiba /user email astfel incat sa stie de la cine ia datele

const StyledDiv = styled("div")`
  background-color: #fff;
  height: 35vh;
  width: 100%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  position: sticky;
  paddingTop: 15px;
`;
