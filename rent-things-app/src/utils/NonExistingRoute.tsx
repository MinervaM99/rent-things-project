import { Link } from "react-router-dom";

export default function NonExistingRoute() {
  return (
    <>
      <h1>404 - Page not found</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </>
  );
}
