import { useState } from "react";
import axios from "axios";
import { urlAccounts } from "../endpoints";
import { useNavigate } from "react-router-dom";

export default function PhoneVerification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerification = async () => {
    // try {
    //   const response = await axios.post(`${urlAccounts}/verify-phone`, {
    //     userName: "username", // Inlocuiți cu username-ul utilizatorului autentificat
    //     code: verificationCode,
    //   });
    //   setVerificationResult("Verificare reușită!");
    //   // Redirecționați utilizatorul către pagina principală sau altă pagină relevantă
    //   navigate("/");
    // } catch (error: any) {
    //   setError("Cod de verificare invalid");
    // }
  };

  const handleResendCode = async () => {
    // try {
    //   // Apelați endpoint-ul pentru a trimite codul de verificare din nou
    //   await axios.post(`${urlAccounts}/resend-code`, {
    //     userName: "username", // Inlocuiți cu username-ul utilizatorului autentificat
    //   });
    //   setError("");
    //   setVerificationResult("Codul de verificare a fost retrimis");
    // } catch (error: any) {
    //   setError("Nu s-a putut retrimite codul de verificare");
    // }
  };

  return (
    <div>
      <h3>Introduceți codul de verificare</h3>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerification}>Verificare</button>
      {error && <p className="error">{error}</p>}
      {verificationResult && <p>{verificationResult}</p>}
      <button onClick={handleResendCode}>Retrimiteți codul</button>
    </div>
  );
}

