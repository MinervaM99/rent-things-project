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
import axios, { AxiosResponse } from "axios";
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
  const [hasMoreData2, setHasMoreData2] = useState(true);

  const [reloadTransactions, setReloadTransactions] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const recordsLoades: number = 5;
  const navigate = useNavigate();

  //obtine username din claims
  function getUserName(): string {
    return claims.find((x) => x.name === "userName")?.value || "";
  }
  const userName = getUserName();

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
        text: "Ai acceptat/respins cererea de imprumut.",
        icon: "success",
      });
      setReloadTransactions(true);
    } catch (error: any) {
      Swal.fire({
        title: "Eroare",
        text: "A apărut o eroare. Încercați din nou.",
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
      const response = await axios.get(`${urlTransactions}/lend/${userName}`, {
        params: { page, recordsLoades, status: 1 },
      });
      const totalAmountOfRecords = parseInt(
        response.headers["totalamountofrecords"],
        10
      );
      const totalPages = Math.ceil(totalAmountOfRecords / recordsLoades);
      setHasMoreData(page < totalPages);
      setinProcessTransactions([...response.data]);
      setReloadTransactions(false);
      console.log(response.data);
    } catch (error) {
      Swal.fire("", "Eroare", "error");
      navigate("/");
    }
  }

  //incarca date istoric tranzactii acceptate
  async function loadAcceptedTransactions() {
    try {
      const response = await axios.get(`${urlTransactions}/lend/${userName}`, {
        params: { page, recordsLoades, status: 2 },
      });
      const totalAmountOfRecords = parseInt(
        response.headers["totalamountofrecords"],
        10
      );
      const totalPages = Math.ceil(totalAmountOfRecords / recordsLoades);
      setHasMoreData2(page < totalPages);
      setConfirmedTransactions([...response.data]);
      setReloadTransactions(false);
      console.log(response.data);
    } catch (error) {
      Swal.fire("", "Eroare", "error");
    }
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: "50px", marginTop: "30px" }}>
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
                <h6 style={{ color: "red" }}>
                  *Acceptarea unei cereri de imprumut care se suprapune ca
                  interval de timp cu o altă cerere de împrumut pentru același
                  produs, va determina respingerea tuturor celorlalte cereri de
                  împrumut!
                </h6>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Vecin</th>
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
                          <Link to={`/item/${transaction.itemId.id}`}>
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

      <Container>
        <h4>Istoric Tranzactii acceptate</h4>
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

        {hasMoreData2 && (
          <div style={{ marginTop: "20px" }}>
            <Button onClick={() => setPage2((prevPage) => prevPage + 1)}>
              Încarcă următoarele
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}
