import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericListComponent(props: genericListProps){

  if(!props.list){
    if(props.loadingUI){
      return props.loadingUI;
    }
    return <Loading />
  }else if(props.list.lenght === 0){
    if(props.loadingUI){
      return props.loadingUI;
    }
    return <>Nu exista produse de afisat</>
  }else {
    return props.children;
  }
}

interface genericListProps{
  list: any;
  loadingUI?: ReactElement;
  emptyListUI?: ReactElement;
  children: ReactElement;
}