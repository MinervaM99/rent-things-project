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
        <div className="container" style={{maxWidth: 1300}}>
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
        </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
          <div className="container">
            Rent things app {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;
