import { Link } from "react-router-dom";
import { itemDTO } from "./items.model";
import css from "./SpecificItem.module.css";

export default function SpecificItem(props: itemDTO) {
  const buildLink = () => `/item/${props.id}`;

  return (
    <div className={css.div}>
      <h4>specific item</h4>
      <Link to={buildLink()}>
        <img alt="Product" src={props.photo} />
      </Link>
      <p>
        <Link to={buildLink()}>{props.name}</Link> <br />
      </p>
    </div>
  );
}
