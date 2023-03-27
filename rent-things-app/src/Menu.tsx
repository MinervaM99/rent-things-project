import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            My rent app
          </NavLink>
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
        </div>
      </nav>
    </>
  );
}
