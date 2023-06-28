import { Link } from "react-router-dom";
import { urlAccounts, urlTransactions } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { transactionDTO } from "./transactions.model";
import { formatDate } from "../utils/utils";
import { useContext, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import customConfirm from "../utils/customConfirm";
import Button from "@mui/material/Button";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { userInfoDTO } from "../security/security.model";
//to do
export default function IndexTransaction(props: IndexTransactionProps) {
  const { claims } = useContext(AuthenticationContext);
  const [reload, setReload] = useState(false);
  const [lenderInfo, setLenderInfo] = useState<userInfoDTO>();
  function reloadData() {
    setReload((prevReload) => !prevReload);
  }
  //obtine username din claims
  function getUserName(): string {
    return claims.find((x) => x.name === "userName")?.value || "";
  }
  const userName = getUserName();

  //delete - sterge o tranzactie respinsa sau in asteptare
  async function deleteTransaction(id: string) {
    console.log("ola", id);
    try {
      await axios.delete(`${urlTransactions}/${id}`);
      Swal.fire({
        text: "Crerea de imprumut a fost ștearsă definitiv.",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
    } catch (error) {
      Swal.fire("Eroare. Ceva nu a funcționat", "error");
    }
  }

  function detailsLender(userId: number) {
    try {
      axios
        .get(`urlAccounts/${userId}`)
        .then((response: AxiosResponse<userInfoDTO>) => {
          setLenderInfo(response.data);
        });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <IndexEntity<transactionDTO>
        url={`${urlTransactions}/${props.urlTransactionParam}`}
        title={props.title}
        reload={reloadData} // Pass the reload function as a prop
      >
        {(transactions) => {
          return (
            <>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "14px" }}>
                    Acțiuni
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "14px" }}>
                    Status
                  </TableCell>
                  {props.transactionType === 1 ? (
                    <TableCell align="left" sx={{ fontSize: "14px" }}>
                      Debitor
                    </TableCell>
                  ) : (
                    <TableCell align="left" sx={{ fontSize: "14px" }}>
                      Proprietar
                    </TableCell>
                  )}

                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    Produs
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    Data de început
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    Data de sfârșit
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    Preț total
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "14px" }}>
                    Id Cerere
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow
                    key={`${transaction.id}-${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                     
                    {transaction.status === 2 ? (
                      <TableCell></TableCell>
                    ) : (
                      <TableCell align="right">
                        <Button
                          style={{ color: "red" }}
                          onClick={() =>
                            customConfirm(
                              () => deleteTransaction(transaction.id),
                              `Această acțiune va determina ștergerea definitivă a informațiilor legate de această tranzacție`,
                              "Sterge"
                            )
                          }
                        >
                          Șterge
                        </Button>
                      </TableCell>
                    )}
                    {transaction.status === 2 ? (
                      <TableCell>ACCEPTAT</TableCell>
                    ) : transaction.status === 3 ? (
                      <TableCell align="center">RESPINS</TableCell>
                    ) : (
                      <TableCell>...</TableCell>
                    )}
                    {props.transactionType === 1 ? (
                     
                      <TableCell align="left">
                        <Link to={`/account/${transaction.itemId?.userId?.userName}`}>
                        {transaction.itemId?.userId?.userName}
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        <Link to={`/account/${transaction.itemId?.userId?.userName}`}>
                        {transaction.itemId?.userId?.userName}
                        </Link>
                      </TableCell>
                    )}

                    <TableCell align="left">
                      <Link to={`/item/${transaction.itemId.id}`}>
                        {transaction.itemId?.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(transaction.startDate)}
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(transaction.endDate)}
                    </TableCell>
                    <TableCell align="left">
                      {transaction.earnings} Ron
                    </TableCell>
                    <TableCell align="left">{transaction.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          );
        }}
      </IndexEntity>
    </>
  );
}

interface IndexTransactionProps {
  urlTransactionParam?: string;
  title: string;
  transactionType?: number;
}
