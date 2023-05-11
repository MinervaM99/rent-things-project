import "./App.css";
import Menu from "./Menu";
import { Routes, Route } from "react-router-dom";
import routes from "./route.config";
import configureValidations from "./Validations";
import { useState } from "react";
import { claim } from "./security/security.model";
import AuthenticationContext from "./security/AuthentictionContext";

configureValidations();

function App() {
  const [claims, setClaims] = useState<claim[]>([
    //hardcodated claim
    {
      name: "email",
      value: "minerva@gmail.com",
    },
    { name: "role", value: "user" },
  ]);

  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  return (
    <>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                // errors?
                element={
                  route.isAdmin && !isAdmin() ? (
                    <>Accesul nu e permis</>
                  ) : (
                    <route.component />
                  )
                }
              ></Route>
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
