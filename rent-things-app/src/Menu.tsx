import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavDropdown, Form, FormControl, Navbar } from "react-bootstrap";
import "./home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authorized from "./security/Authorized";
import { logout } from "./security/handelJWT";
import { useContext } from "react";
import AuthenticationContext from "./security/AuthentictionContext";
import styled from "styled-components";
import { Button } from "@mui/material";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }

  return (
    <>
      <Navbar className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            My rent app
          </NavLink>
          <div
            className="collapse navbar-collapse"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavbarLink className="nav-link" to="/items/filter">
                  Filtrează item-uri
                </NavbarLink>
              </li>
              <Authorized
                role="admin"
                authorized={
                  <>
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav me-auto">
                        <NavbarLink className="nav-link" to="/category">
                          Categorii
                        </NavbarLink>
                        <NavbarLink className="nav-link" to="/users">
                          Utilizatori
                        </NavbarLink>
                      </ul>
                    </div>
                  </>
                }
              ></Authorized>
              <Authorized
                authorized={
                  <>
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav">
                        <NavbarLink className="nav-link" to="/items/create">
                          Adaugă un item
                        </NavbarLink>
                      </ul>
                    </div>
                  </>
                }
              ></Authorized>
            </ul>

            <div className="d-flex">
              <Authorized
                authorized={
                  <>
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav">
                        <NavbarLink
                          className="nav-link"
                          to="/account/transactions"
                        >
                          Tranzactii
                        </NavbarLink>
                        <li className="nav-item mr-auto">
                          <NavDropdown
                            title={<span>Bună, {getUserName()}</span>}
                            id="basic-nav-dropdown"
                          >
                            <NavDropdown.Item>
                              {/* <Link to={buildUserAccountLink()}>Contul Meu</Link> */}
                              <Link to="/myAccount/1">Contul Meu</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                              <Button
                                onClick={() => {
                                  logout();
                                  update([]);
                                  navigate("/");
                                }}
                                style={{ backgroundColor: "pink" }}
                              >
                                Log out
                              </Button>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </li>
                      </ul>
                    </div>
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
      </Navbar>
    </>
  );
}

export const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus {
    color: blue;
  }
  &:active {
    color: red;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 50px;
  background-color: purple;
  display: flex;
  flex-direction: column;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;
