import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GenericListComponent from "./GenericListComponent";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import customConfirm from "./customConfirm";
import Swal from "sweetalert2";
import {
  Box,
  Container,
  Paper,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import Pagination from "./Pagination";
import styled from "styled-components";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>([]);

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage, props.reload]);

  function loadData() {
    try {
      axios
        .get(props.url, {
          params: { page, recordsPerPage },
        })
        .then((response: AxiosResponse<T[]>) => {
          const totalAmountOfRecords = parseInt(
            response.headers["totalamountofrecords"],
            10
          );
          setTotalAmountOfPages(
            Math.ceil(totalAmountOfRecords / recordsPerPage)
          );
          setEntities(response.data);
          console.log("aaaa", response.data);
        });

      // const totalAmountOfRecords = parseInt(
      //   response.headers["totalamountofrecords"],
      //   10
      // );
      // const totalPages = Math.ceil(totalAmountOfRecords / recordsPerPage);
      // setHasMoreData(page < totalPages);
      // setEntities((prevEntities) => [...prevEntities, ...response.data]);
    } catch (error: any) {
      Swal.fire("", `${error.response.data}`, "error");
      navigate("/");
    }
  }

  async function deleteEntity(id: number) {
    console.log("delete", id);
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
    <Container>
      <Box my={2} textAlign="center">
        <StyledTypography>{props.title}</StyledTypography>
      </Box>

      {props.createURL ? (
        <div style={{ marginBottom: "0px" }}>
          <Link className="btn btn-primary" to={props.createURL}>
            {props.entityName}
          </Link>
        </div>
      ) : null}

      {/* <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      /> */}
      
      {/* to do -- fa containerul fix, ca elementele de sub el sa nu se mute daca sunt putine inregistrari */}
      <GenericListComponent list={entities}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            {props.children(entities, buttons)}
          </Table>
        </TableContainer>
      </GenericListComponent>

      <div>
        <Pagination
          currentPage={page}
          totalAmountOfPages={totalAmountOfPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* {hasMoreData && (
        <div style={{ marginTop: "20px" }}>
          <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
            Încarcă următoarele
          </Button>
        </div>
      )}  */}
    </Container>
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
const StyledTypography = styled(Typography)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  padding-block: 10px;

  &:hover {
    color: #a967df;
  }
`;
