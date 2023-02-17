import { itemDTO } from "./items.model";
import SpecificItem from "./SpecificItem";
import css from "./ItemsList.module.css";
import GenericListComponent from "../utils/GenericListComponent";
import Loading from "../utils/Loading";

export default function ItemsList(props: itemsListProps) {
 
  return(
    <GenericListComponent list={props.items}>
    <div className={css.div}>
      {props.items?.map(item =>
        <SpecificItem {...item} key={item.id} />)}
    </div> 
  </GenericListComponent>
  );
 
    // if(!props.items){
    //   return <Loading />
    // }else if(props.items.length === 0){
    //   return <>Nu exista produse de afisat</>
    // }else {
    //   return(<div className={css.div}>
    //     {props.items.map(item =>
    //       <SpecificItem {...item} key={item.id} />)}
    //   </div> )
      
   // }
}

interface itemsListProps {
  items?: itemDTO[];
}
