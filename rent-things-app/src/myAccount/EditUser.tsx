import axios, { AxiosResponse } from "axios";
import { urlAccounts } from "../endpoints";
import { userInfoDTO } from "../security/security.model";
import EditUserForm from "./EditUserForm";
import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import Loading from "../utils/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { FormContainer } from "../style";

export default function EditUser() {
  const { claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<userInfoDTO>();
  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }
  const userName = getUserName();

  useEffect(() => {
    loadInfoUser();
  }, [userName]);

  function loadInfoUser() {
    try {
      axios
        .get(`${urlAccounts}/${userName}`)
        .then((response: AxiosResponse<userInfoDTO>) => {
          setUserInfo(response.data);
        });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (values: userInfoDTO) => {
    try {
      axios.post(`${urlAccounts}/edit`, values);
      Swal.fire("Editat cu succes!");
      navigate(`/account/${userName}`);
      loadInfoUser();
    } catch (error) {
      Swal.fire("Eroare", "Ceva nu a funcționat.", "error");
      navigate(`/account/${userName}`);
    }
  };

  return (

    <FormContainer style={{ margin: "60px auto 50px auto", maxWidth: "500px" }}>
      <Box my={3} textAlign="center">
        <Typography sx={{fontFamily: "Lucida Console"}}
          variant="h4"
          component="div"
          color="text.secondary"
        >
          Actualizează datele
        </Typography>
      </Box>
      {userInfo?.userName ? (
        <EditUserForm model={userInfo} onSubmit={handleSubmit} cancelUrl={`/account/${userName}`}/>
      ) : (
        <Loading />
      )}
    </FormContainer>
  );
}
