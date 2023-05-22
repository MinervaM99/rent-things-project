import axios from "axios";
import { authenticationResponse, userCredentials } from "./security.model";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handelJWT";
import AuthenticationContext from "./AuthentictionContext";
import { Link, useNavigate } from "react-router-dom";
import AuthFormLogin from "./AuthFormLogin";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function register(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
        credentials
      );
      saveToken(response.data);
      console.log(response.data);
      update(getClaims());
      navigate("/");
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Creaza un cont nou</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{email: "", password: "", phoneNumber: ""}}
        onSubmit={async (values) => await register(values)}
        textSubmitButton="Creaza contul"
      />
      <p></p>
      <div className="mb-3">
        Ai deja un cont? <Link to={"../Login"}>Conecteaza-te</Link>
      </div>
    </>
  );
}
