import { itemDTO } from "./items.model";
import css from "./SpecificItem.module.css";

export default function SpecificItem(props: itemDTO) {
  const buildLink = () => `/item/${props.id}`;

  return (
    <div className={css.div}>
      <h4>specific item</h4>
      <a href={buildLink()}>
        <img alt="Product" src={props.pictureURL} />
      </a>
      <p>
        <a href={buildLink()}>{props.title}</a> <br />
      </p>
    </div>
  );
}
