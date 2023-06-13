import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GenericListComponent from "./GenericListComponent";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import customConfirm from "./customConfirm";
import Swal from "sweetalert2";
import { Paper, Table, TableContainer } from "@mui/material";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage, props.reload]);

  async function loadData() {
    try {
      const response = await axios.get(props.url, {
        params: { page, recordsPerPage },
      });

      const totalAmountOfRecords = parseInt(
        response.headers["totalamountofrecords"],
        10
      );
      const totalPages = Math.ceil(totalAmountOfRecords / recordsPerPage);
      setHasMoreData(page < totalPages);
      setEntities((prevEntities) => [...prevEntities, ...response.data]);
    } catch (error: any) {
      Swal.fire("", `${error.response.data}`, "error");
      // navigate("/");
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

  return (
    <>
      <h1>{props.title}</h1>
      {props.createURL ? (
        <Link className="btn btn-primary" to={props.createURL}>
          {props.entityName}
        </Link>
      ) : null}
      {/* 
      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      /> */}

      <GenericListComponent list={entities}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            {props.children(entities, buttons)}
          </Table>
        </TableContainer>
      </GenericListComponent>

      {hasMoreData && (
        <div style={{ marginTop: "20px" }}>
          <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
            Încarcă următoarele
          </Button>
        </div>
      )}
    </>
  );
}

interface indexEntityProps<T> {
  url: string;
  title?: string;
  createURL?: string;
  entityName?: string;
  reload?: any;
  children(
    entities: T[],
    buttons: (editURL: string, id: number) => ReactElement
  ): ReactElement;
}
