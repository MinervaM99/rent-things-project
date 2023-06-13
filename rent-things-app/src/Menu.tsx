import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavDropdown, Form, FormControl, Button, Navbar } from "react-bootstrap";
import "./home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authorized from "./security/Authorized";
import { logout } from "./security/handelJWT";
import { useContext } from "react";
import AuthenticationContext from "./security/AuthentictionContext";
import styled from "styled-components";


export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }

  return (
    <>
      <Navbar  className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            My rent app
          </NavLink>
          <div  className="collapse navbar-collapse"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/items/filter">
                  Filtrează item-uri
                </NavLink>
              </li>
              <Authorized
                role="admin"
                authorized={
                  <>
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav me-auto">
                        <NavLink className="nav-link" to="/category">
                          Categorii
                        </NavLink>
                        <NavLink className="nav-link" to="/users">
                          Utilizatori
                        </NavLink>
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
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/account/transactions">
                           Tranzactii
                          </NavLink>
                          <NavLink className="nav-link" to="/items/create">
                            Adaugă un item
                          </NavLink>
                        </li>
                        <li className="nav-item mr-auto">
                          <NavDropdown
                            title={<span>Bună, {getUserName()}</span>}
                            id="basic-nav-dropdown"
                          >
                            <NavDropdown.Item>
                              {/* <Link to={buildUserAccountLink()}>Contul Meu</Link> */}
                              <Link to="/MyAccount">Contul Meu</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to="/myAccount">Împrumuturile mele</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                              <Button
                                className="nav-link btn btn-link"
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
      {/* <div
        className="container"
        style={{
          // backgroundColor: "#237ad7",
          maxWidth: "100%",
          height: "500px",
        }}
      >
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #e7e7e7",
                borderRadius: "80px",
                padding: "10px",
                marginTop: "100px",
              }}
            />
            <Button variant="outline-success" className="ml-2">
              Search
            </Button>
          </Form>
      </div> */}
    </>
  );
}
