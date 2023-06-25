import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavDropdown, Form, FormControl } from "react-bootstrap";
import "./home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authorized from "./security/Authorized";
import { logout } from "./security/handelJWT";
import { useContext } from "react";
import AuthenticationContext from "./security/AuthentictionContext";
import styled from "styled-components";
import { Button } from "@mui/material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";

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
          <Logo className="navbar-brand" to="/">
            <div className="logo-container">
              <span className="logo-text">CircleShare</span>
            </div>
          </Logo>
          <div
            className="collapse navbar-collapse"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <NavbarLink className="nav-link" to="/items/filter">
                  Filtrează item-uri
                </NavbarLink>
              </li> */}
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
            </ul>

            <div className="d-flex">
              <Authorized
                authorized={
                  <>
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav">
                        <Button size="medium">
                          <NavbarLink
                            className="nav-link"
                            to="/items/create"
                            style={{
                              border: "1px solid #ecf6e5ac",
                              borderRadius: "5px",
                              fontSize: "12px",
                              padding: "5px 10px",
                              backgroundColor: "#759e7c",
                            }}
                          >
                            Adaugă un anunț
                          </NavbarLink>
                        </Button>
                      </ul>
                    </div>
                  </>
                }
              ></Authorized>
              <Authorized
                authorized={
                  <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                      <NavbarLink
                        className="nav-link"
                        to="/account/transactions"
                      >
                        <NotificationAddOutlinedIcon fontSize="large" />
                      </NavbarLink>
                      <li className="nav-item mr-auto">
                        <NavOptionsDropdown
                          title={
                            <NavDropdownTitle>
                              Bună, {getUserName()}
                            </NavDropdownTitle>
                          }
                          id="basic-nav-dropdown"
                        >
                          <NavDropdownItem>
                            {/* <Link to={buildUserAccountLink()}>Contul Meu</Link> */}
                            <NavDropdownLink to="/myAccount/1">
                              Contul Meu
                            </NavDropdownLink>
                          </NavDropdownItem>
                          <NavDropdown.Divider />
                          <NavDropdownItem>
                            <NavDropdownLogout
                              onClick={() => {
                                logout();
                                update([]);
                                navigate("/");
                              }}
                            >
                              Log out
                            </NavDropdownLogout>
                          </NavDropdownItem>
                        </NavOptionsDropdown>
                      </li>
                    </ul>
                  </div>
                }
                notAuthorized={
                  <>
                    <NavbarAuthentificationLink
                      to={"/login"}
                      className="nav-link btn btn-link"
                    >
                      Autentificare
                    </NavbarAuthentificationLink>
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
  color: #ffffff;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus {
    color: #ffffff81;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const NavbarAuthentificationLink = styled(Link)`
  color: #ffffff;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover {
    color: #ffffff;
    background-color: #0b2b40;
  }
  @media (max-width: 700px) {
    display: none;
  }
  border-radius: 10px;
  border: 1px #0b2b40 solid;
`;

export const Logo = styled(Link)`
  color: #fff;
  margin: 10px;
  margin-top: 6px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #ffffffb4;
  }
  &:focus {
    color: #fff;
  }
`;

export const NavDropdownLink = styled(Link)`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  color: #3b8c6e;
  padding: 8px 0;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #1e5959;
  }

  &:focus {
    color: #fff;
  }
`;

export const NavDropdownLogout = styled.span`
  color: #3b8c6e;
  font-size: 14px;
  padding: 8px 0;

  &:hover {
    color: #1e5959;
  }
`;

export const NavOptionsDropdown = styled(NavDropdown)`
  color: #fff;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover {
    color: #ffffffa6;
  }
  &:focus {
    color: #fff;
  }
`;

const NavDropdownItem = styled(NavDropdown.Item)`
  color: #fff;
  margin: 0;
`;

const NavDropdownTitle = styled.span`
  color: #fff;
  .dropdown-toggle::after {
    color: white;
  }
  &:hover {
    color: #ffffffa6;
  }

  &:focus {
    color: #fff;
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
  width: 100%;
`;

export const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 99999;
  display: flex;
  background-color: #25684f;
  width: 100%;
  height: 60px;
`;
