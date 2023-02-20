import { Link } from "react-router-dom";

export default function IndexCategory() {
  return (
    <>
      <h1>Categories</h1>
      <Link className="btn btn-primary" to="/category/create">Creaza o categorie</Link>
    </>
  );
}
