import { Link } from "react-router-dom";
import { urlTransactions } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { transactionDTO } from "./transactions.model";
import { formatDate } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../security/AuthentictionContext";
import customConfirm from "../utils/customConfirm";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
//to do
export default function IndexTransaction(props: IndexTransactionProps) {
  const { claims } = useContext(AuthenticationContext);
  const [reload, setReload] = useState<Boolean>(false);
  //obtine username din claims
  function getUserName(): string {
    return claims.find((x) => x.name === "userName")?.value || "";
  }
  const userName = getUserName();

  //delete - sterge o tranzactie respinsa sau in asteptare
  async function deleteTransaction(id: string) {
    try {
      await axios.delete(`${urlTransactions}/${id}`);
      Swal.fire({
        text: "Crerea de imprumut a fost ștearsă definitiv.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setReload(true);
    } catch (error) {
      Swal.fire("Eroare. Ceva nu a funcționat", "error");
    }
  }
  

  return (
    <>
      <IndexEntity<transactionDTO>
        url={`${urlTransactions}/${props.urlTransactionParam}`}
        reload={reload}
      >
        {(transactions, buttons) => (
          <>
            <TableHead>
              <TableRow style={{ backgroundColor: '#d5aff5ae', color: 'white' }}>
                <TableCell></TableCell>
                <TableCell align="left">Comunitate</TableCell>
                <TableCell align="left">Produs</TableCell>
                <TableCell align="left">Data de început</TableCell>
                <TableCell align="left">Data de sfârșit</TableCell>
                <TableCell align="left">Caștig</TableCell>
                <TableCell align="left">Id Cerere</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                ?.filter(
                  (transaction) => transaction.status === props.statusParam
                )
                .map((transaction, index) => (
                  <TableRow
                  key={`${transaction.id}-${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {transaction.status === 2 ? (
                      <TableCell></TableCell>
                    ) : (
                      <TableCell align="right">
                        <Button
                          style={{ color: 'red' }}
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
                    <TableCell align="left">
                      <Link to={`/account/${userName}`}>
                        Detalii Proprietar
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/item/${transaction.itemId}`}>
                        {transaction.itemId?.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{formatDate(transaction.startDate)}</TableCell>
                    <TableCell align="left">{formatDate(transaction.endDate)}</TableCell>
                    <TableCell align="left">{transaction.earnings} Ron</TableCell>
                    <TableCell align="left">{transaction.id}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </>
        )}
      </IndexEntity>
    </>
  );
}

interface IndexTransactionProps {
  urlTransactionParam?: string;
  statusParam?: number;
}
