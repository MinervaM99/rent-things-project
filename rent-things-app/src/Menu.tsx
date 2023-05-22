import { Link, NavLink } from "react-router-dom";
import { NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authorized from "./security/Authorized";
import { logout } from "./security/handelJWT";
import { useContext } from "react";
import AuthenticationContext from "./security/AuthentictionContext";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);

  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            My rent app
          </NavLink>
          <div
            className="collapse navbar-collapse"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Authorized
                authorized={
                  <>
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink className="nav-link" to="/category">
                          Categorii
                        </NavLink>
                        <NavLink className="nav-link" to="/items/filter">
                          Filtreaza item-uri
                        </NavLink>
                        <NavLink className="nav-link" to="/items/create">
                          Adauga un item
                        </NavLink>
                      </ul>
                    </div>

                    <Form>
                      <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </>
                }
              ></Authorized>
            </ul>

            <div className="d-flex">
              <Authorized
                authorized={
                  <>
                    <NavDropdown
                      title={<span>Hello, {getUserEmail()}</span>}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item href="/myAccount">
                       Contum Meu
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Imprumuturile mele
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Button
                          className="nav-link btn btn-link"
                          onClick={() => {
                            logout();
                            update([]);
                          }}
                          style={{ backgroundColor: "pink" }}
                        >
                          Log out
                        </Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                }
                notAuthorized={
                  <>
                    <Link to={"/login"} className="nav-link btn btn-link">
                      Autentificare
                    </Link>
                  </>
                }
              ></Authorized>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
