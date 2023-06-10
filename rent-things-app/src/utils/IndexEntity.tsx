  import axios, { AxiosResponse } from "axios";
  import { ReactElement, useEffect, useState } from "react";
  import { Button } from "react-bootstrap";
  import { Link, useNavigate } from "react-router-dom";
  import GenericListComponent from "./GenericListComponent";
  import Pagination from "./Pagination";
  import RecordsPerPageSelect from "./RecordsPerPageSelect";
  import customConfirm from "./customConfirm";
import Swal from "sweetalert2";

  export default function IndexEntity<T>(props: indexEntityProps<T>) {
    const [entities, setEntities] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPAges] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage]);

    async function loadData() {
      try{axios
        .get(props.url, { params: { page, recordsPerPage } })
        .then((response: AxiosResponse<T[]>) => {
          const totalAmountOfRecords = parseInt(
            response.headers["totalamountofrecords"],
            10
          );
          setTotalAmountOfPAges(Math.ceil(totalAmountOfRecords / recordsPerPage));
          setEntities(response.data);
        });}catch(error){
          Swal.fire("","Eroare", "error");
          navigate("/");
        }
      
    }

    async function deleteEntity(id: number) {
      try {
        await axios.delete(`${props.url}/${id}`);
        loadData();
      } catch (error: any) {
        if (error && error.response) {
          console.error(error.response.data);
        }
      }
    }

    const buttons = (editURL: string, id: number) => {
      return (
        <>
          <Link className="btn btn-success" to={editURL}>
            Edit
          </Link>

          <Button
            onClick={() => customConfirm(() => deleteEntity(id))}
            className="btn btn-danger"
          >
            Delete
          </Button>
        </>
      );
    };

    if (!entities || entities.length === 0) {
      return <h4 style={{padding:"30px"}}>Nu există date de afișat.</h4>;
    }

    return (
      <>
        <h1>{props.title}</h1>
        {props.createURL ? <Link className="btn btn-primary" to={props.createURL}>
          {props.entityName}
        </Link> : null}
        
        <RecordsPerPageSelect
          onChange={(amountOfRecords) => {
            setPage(1);
            setRecordsPerPage(amountOfRecords);
          }}
        />
        <Pagination
          currentPage={page}
          totalAmountOfPages={totalAmountOfPages}
          onChange={(newPage) => setPage(newPage)}
        />

        <GenericListComponent list={entities}>
          <table className="table table-striped">
            {props.children(entities!, buttons)}
          </table>
        </GenericListComponent>
      </>
    );
  }

  interface indexEntityProps<T> {
    url: string;
    title: string;
    createURL?: string;
    entityName?: string;
    children(
      entities: T[],
      buttons: (editURL: string, id: number) => ReactElement
    ): ReactElement;
  }
