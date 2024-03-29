import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./route.config";
import configureValidations from "./Validations";
import { useEffect, useState } from "react";
import { claim } from "./security/security.model";
import AuthenticationContext from "./security/AuthentictionContext";
import { getClaims } from "./security/handelJWT";
import configureInterceptor from "./utils/httpInterceptors";
import NavigationMenu from "./Menu";
import { Box } from "@mui/material";
import styled from "styled-components";

configureValidations();
configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

 
  function isUser() {
    return claims.length > 0;
  }


  return (
    <>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <NavigationMenu />
        <Box
        sx={{
          flexDirection: 'column',
          // minHeight: '70vh',
        }}
      >
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isAdmin && !isAdmin() ? (
                    route.isUser && !isUser() ? (
                      <>Accesul nu este permis</>
                    ) : (
                      <route.component />
                    )
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
          </Box>
        <Footer className="bd-footer py-5" style={{ backgroundColor: "#fff"}}>
          <div className="container">
            CircleShare {new Date().getFullYear().toString()}
          </div>
        </Footer>
      </AuthenticationContext.Provider>
    </>
  );
}

export const Footer = styled.footer`
 
` 

export default App;
