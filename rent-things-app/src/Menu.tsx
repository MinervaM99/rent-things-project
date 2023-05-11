import { NavLink } from "react-router-dom";
import { NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Authorized from "./security/Authorized";

export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            My rent app
          </NavLink>

          <Authorized
            role="admin"
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
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </ul>
                </div>

                <NavDropdown title="Profil" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Contul Meu
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Imprumuturile mele
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                </NavDropdown>

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
        </div>
      </nav>
    </>
  );
}
