import { Link } from "react-router-dom";

export default function IndexRentalFrequency() {
  return (
    <>
      <h1>Rental Frequency</h1>
      <Link className="btn btn-primary" to="/rentalFrequency/create">Creaza o perioada</Link>
    </>
  );
}
