export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Al nostru
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <a className="nav-link" href="/produse">
                Produse
              </a>
              <a className="nav-link" href="/login">
                Login
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
