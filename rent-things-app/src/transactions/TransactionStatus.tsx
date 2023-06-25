import { useContext, useEffect, useState } from "react";
import { transactionDTO } from "./transactions.model";
import { urlTransactions } from "../endpoints";
import AuthenticationContext from "../security/AuthentictionContext";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import GenericListComponent from "../utils/GenericListComponent";
import Loading from "../utils/Loading";
import { formatDate } from "../utils/utils";

export default function IndexTransactionStatus() {
  const { claims } = useContext(AuthenticationContext);
  const [inProcessTransactions, setinProcessTransactions] =
    useState<transactionDTO[]>();
  const [confirmedTransactions, setConfirmedTransactions] =
    useState<transactionDTO[]>();

  const [hasMoreData, setHasMoreData] = useState(true);
  const [reloadTransactions, setReloadTransactions] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const recordsLoades: number = 5;
  const navigate = useNavigate();

  //obtine username din claims
  function getUserId(): string {
    return claims.find((x) => x.name === "userId")?.value || "";
  }
  const myUserId = getUserId();

  //post- modifica statusul tranzactiei
  async function handleTrRequest(id: string, status: number) {
    try {
      await axios.post(
        `${urlTransactions}/editStatus/${id}`,
        JSON.stringify(status),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      Swal.fire({
        title: "Succes",
        icon: "success",
      });
      setReloadTransactions(true);
    } catch (error: any) {
      Swal.fire({
        title: "Eroare",
        html: `${error.response.data}`,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    //apeleaza functia odata la 5 secunde cat timp esti in componenta
    // const interval = setInterval(() => {
    loadTransactionRequests();
    // }, 5000);

    // return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsLoades, reloadTransactions]);

  useEffect(() => {
    loadAcceptedTransactions();
  }, [page2, recordsLoades, reloadTransactions]);

  //incarca date despre tranzactiile de manageuit
  async function loadTransactionRequests() {
    try {
      const response = await axios.get(`${urlTransactions}/lend/${myUserId}/${1 as number}`, {
        params: { page, recordsLoades },
      });
      const totalAmountOfRecords = parseInt(
        response.headers["totalamountofrecords"],
        10
      );
      const totalPages = Math.ceil(totalAmountOfRecords / recordsLoades);
      setHasMoreData(page < totalPages);
      setinProcessTransactions([...response.data]);
      setReloadTransactions(false);
    } catch (error:any) {
      Swal.fire("Eroare", `${error.response.data}`, "error");
      
    }
  }

  //incarca date istoric tranzactii acceptate
  async function loadAcceptedTransactions() {
  
    try {
      const response = await axios.get(`${urlTransactions}/lend/${myUserId}/${2 as number}`, {
        params: { page, recordsLoades },
      });
      const totalAmountOfRecords = parseInt(
        response.headers["totalamountofrecords"],
        10
      );
      const totalPages = Math.ceil(totalAmountOfRecords / recordsLoades);
      setConfirmedTransactions([...response.data]);
      setReloadTransactions(false);
      console.log(response.data);
    } catch (error:any) {
      Swal.fire("Eroare", "error");
    }
  }

  return (
    <div 
    style={{height: "490px", marginTop:"-40px",backgroundColor:"#f4f5f7", }}>
      <Container
        maxWidth="lg"
        sx={{
          marginBottom: "50px",
          marginTop: "40px",
          paddingTop: "30px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <GenericListComponent
          list={inProcessTransactions}
          loadingUI={<Loading />}
        >
          <div>
            <h3>Raspunde cererilor de imprumut</h3>
            {inProcessTransactions?.length === 0 ? (
              <h6>Nu există nici o solicitare.</h6>
            ) : (
              <div>
                <h6 style={{ color: "red", marginBottom: "20px" }}>
                  *Acceptarea unei cereri de imprumut care se suprapune ca
                  interval de timp cu o altă cerere de împrumut pentru același
                  produs, va determina respingerea tuturor celorlalte cereri de
                  împrumut!
                </h6>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{textAlign: "center"}}>Acțiuni</th>
                      <th></th>
                      <th>Produs</th>
                      <th>Data de început</th>
                      <th>Data de sfârșit</th>
                      <th>Caștig</th>
                      <th>Id Cerere</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inProcessTransactions?.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>
                          <Button
                            onClick={() =>
                              customConfirm(
                                () => handleTrRequest(transaction.id, 2),
                                `Accepți acest împrumut?`,
                                "Acceptă"
                              )
                            }
                          >
                            Acceptă
                          </Button>
                          <Button
                            onClick={() =>
                              customConfirm(
                                () => handleTrRequest(transaction.id, 3),
                                `Respingi această cerere de împrumut?`,
                                "Respinge"
                              )
                            }
                          >
                            Respinge
                          </Button>
                        </td>

                        <td>
                          <Link to={`/account/${transaction.userId.userName}`}>
                            {transaction.userId.userName}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/item/${transaction.itemId?.id}`}>
                            {transaction.itemId.name}
                          </Link>
                        </td>
                        <td>{formatDate(transaction.startDate)}</td>
                        <td>{formatDate(transaction.endDate)}</td>
                        <td>{transaction.earnings} Ron</td>
                        <td>{transaction.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </GenericListComponent>
        {hasMoreData && (
          <div style={{ marginTop: "20px" }}>
            <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
              Încarcă următoarele
            </Button>
          </div>
        )}
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          marginBottom: "50px",
          marginTop: "30px",
          maxHeight: "350px",
          overflowY: "auto",
        }}
      >
        <h4>Istoricul împrumuturilor oferite</h4>
        <GenericListComponent
          list={confirmedTransactions}
          loadingUI={<Loading />}
        >
          {confirmedTransactions?.length === 0 ? (
            <h5>Nu exista tranzacții acceptate de ajișat</h5>
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Debitor</TableCell>
                    <TableCell>Produs</TableCell>
                    <TableCell>Data de început</TableCell>
                    <TableCell>Data de sfârșit</TableCell>
                    <TableCell>Caștig</TableCell>
                    <TableCell>Id Cerere</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {confirmedTransactions?.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Link to={`/account/${transaction.userId.userName}`}>
                          {transaction.userId.userName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/item/${transaction.itemId.id}`}>
                          {transaction.itemId.name}
                        </Link>
                      </TableCell>
                      <TableCell>{formatDate(transaction.startDate)}</TableCell>
                      <TableCell>{formatDate(transaction.endDate)}</TableCell>
                      <TableCell>{transaction.earnings} Ron</TableCell>
                      <TableCell>{transaction.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </GenericListComponent>
      </Container>
    </div>
  );
}
