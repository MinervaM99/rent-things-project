import axios from "axios";
import { authenticationResponse, userCredentialsRegister } from "./security.model";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handelJWT";
import AuthenticationContext from "./AuthentictionContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Box, Container, Typography } from "@mui/material";
import styled from "styled-components";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function register(credentials: userCredentialsRegister) { 
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
        credentials
      );
      saveToken(response.data);
      console.log(response.data);
      update(getClaims());
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contul tău a fost creat!',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/");
    } catch (error: any) {
      // setErrors(error.response.data);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${error.response.data}`,
        showConfirmButton: true
      })
    }
  }

  return (
    <AuthContainer maxWidth = "xs" sx={{margin: "60px auto 50px auto"}}>
      <Box my={3} textAlign="center">
        <Typography sx={{fontFamily: "Lucida Console"}}
          variant="h4"
          component="div"
          color="text.secondary"
        >
          Crează un cont nou
        </Typography>
      </Box>
      <DisplayErrors errors={errors} />
      <AuthForm 
        model={{email: "", password: "", phoneNumber: "", userName: ""}}
        onSubmit={async (values) => await register(values)}
        textSubmitButton="Creaza contul"
      />
      
      <AuthLink className="mb-3">
      <Link to={"../login"}>Conecteaza-te</Link>Ai deja un cont? 
      </AuthLink>
    </AuthContainer>
  );
}

export const AuthLink = styled.div`
position: relative;
  
 display: flex;
 flex-direction: row-reverse;
`

export const AuthContainer = styled(Container)`
  display: grid;
  border-radius: 15px;
  box-shadow: -1px -1px 5px #1e595910, 4px 6px 8px #3B8C6E;
  padding: 15px 15px 20px 15px;
`

