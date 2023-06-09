import { useEffect, useState } from "react";
import { itemDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlAccounts, urlItems } from "../endpoints";
import { useParams } from "react-router-dom";
import { userInfoDTO } from "../security/security.model";
import MyAccount from "./MyAccount";
import { Avatar } from "@mui/material";
import { generateRandomColor } from "../utils/utils";

export default function UserProfile(props: userProfileProps) {
  //user name
  const { userName }: any = useParams();
  const [items, setItems] = useState<itemDTO[]>([]);
  const [userInfo, setUserInfo] = useState<userInfoDTO>();
  const [errors, setErrors] = useState();
  const randomColor = generateRandomColor();
  console.log(userName);
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
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }

  function loadData() {
    try {
      axios
        .get(`${urlItems}/userItems/${userName}`)
        .then((response: AxiosResponse<itemDTO[]>) => {
          setItems(response.data);
        });
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }
  console.log(userInfo?.email);
  return (
    <>
      <p></p>
      <div className="mb-3" >
        <div style={{display: "flex"}}>
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
            <span style={{fontSize: "34px"}}>
              {userName.charAt(0).toUpperCase()}
            </span>
        </Avatar>
        Nume de utilizator: {userInfo?.userName}
        <br />
        Email: {userInfo?.email}
        <br />
        Numar de telefon: {userInfo?.phoneNumber}
        <br />
        </div>
        <h3>Anunțuri publicate: </h3>
        <ItemsList listOfItems={items} />
      </div>
    </>
  );
}
//to do cand apas pe buton, sa ma duca la ruta myAccount dar care sa aiba /user email astfel incat sa stie de la cine ia datele

interface userProfileProps {
  userEmail: string;
}
