import axios from "axios";
import { authenticationResponse, userCredentialsLogin } from "./security.model";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { getClaims, saveToken } from "./handelJWT";
import AuthenticationContext from "./AuthentictionContext";
import { Link, useNavigate } from "react-router-dom";
import AuthFormLogin from "./AuthFormLogin";
import { Box, Container, Typography } from "@mui/material";
import { FormContainer, AuthLink } from "../style";

export default function Login(props: loginProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(credentials: userCredentialsLogin) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/login`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
      navigate("../");
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <FormContainer style={{ margin: "60px auto 50px auto", maxWidth: "500px" }}>
        <Box my={3} textAlign="center">
          <Typography
            sx={{ fontFamily: "Lucida Console" }}
            variant="h4"
            component="div"
            color="text.secondary"
          >
            Conectează-te
          </Typography>
        </Box>
        <DisplayErrors errors={errors} />
        <AuthFormLogin
          model={{ userName: "", password: "" }}
          onSubmit={async (values) => await login(values)}
        />

        <AuthLink className="mb-3">
          <Link to={"../Register"}>Creaza un cont nou </Link>Nu ai un cont? 
        </AuthLink>
      </FormContainer>
    </>
  );
}

interface loginProps {}
