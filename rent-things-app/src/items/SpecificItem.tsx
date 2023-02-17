import { itemDTO } from "./items.model";
import css from './SpecificItem.module.css';

export default function SpecificItem(props: itemDTO){

  const buildLink = () => `/items/${props.id}` 
  return(
    <div className={css.div}>
      <h3>Specific Item</h3>
      <a href={buildLink()}>
        <img alt="itemImage" src={props.itemImage} />
      </a>
      <p>
        <a href = {buildLink()}>{props.title}</a> <br/>
        <a href ={buildLink()}>{props.priece} RON/zi</a>
      </p>
    </div>

  );
}