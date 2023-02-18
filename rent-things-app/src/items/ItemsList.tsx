import { itemDTO } from "./items.model";
import SpecificItem from "./SpecificItem";
import css from "./ItemsList.module.css";
import Loading from "../utils/Loading";
import GenericListComponent from "../utils/GenericListComponent";

export default function ItemsList(props: itemsListProps) {
  return (
    <GenericListComponent list={props.listOfItems}>
      <div className={css.div}>
        {props.listOfItems?.map((item) => (
          <SpecificItem {...item} key={item.id} />
        ))}
      </div>
    </GenericListComponent>
  );
}

interface itemsListProps {
  listOfItems?: itemDTO[];
}
