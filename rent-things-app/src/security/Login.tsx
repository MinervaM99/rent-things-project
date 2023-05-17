import axios from "axios";
import { authenticationResponse, userCredentials } from "./security.model";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { getClaims, saveToken } from "./handelJWT";
import AuthenticationContext from "./AuthentictionContext";
import { Link, useNavigate } from "react-router-dom";
import AuthFormLogin from "./AuthFormLogin";

export default function Login(props: loginProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  
  async function login(credentials: userCredentials) {
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
      <h2>Intra in cont</h2>
      <DisplayErrors errors={errors} />
      <AuthFormLogin
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await login(values)}
      />
      <p></p>
      <div className="mb-3">Nu ai un cont? <Link to={"../Register"}>Creaza un cont nou</Link></div>
    </>
  );
}

interface loginProps {}
