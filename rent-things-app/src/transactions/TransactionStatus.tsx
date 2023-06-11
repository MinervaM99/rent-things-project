import { useContext, useEffect, useState } from "react";
import { transactionDTO } from "./transactions.model";
import { urlAccounts, urlTransactions } from "../endpoints";
import AuthenticationContext from "../security/AuthentictionContext";
import { Button } from "@mui/material";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { userInfoDTO } from "../security/security.model";
import { Link } from "react-router-dom";

export default function IndexTransactionStatus() {
  const { claims } = useContext(AuthenticationContext);
  const [userInfo, setUserInfo] = useState<userInfoDTO>();
  function getUserName(): string {
    return claims.find((x) => x.name === "userName")?.value || "";
  }
  const userName = getUserName();
  console.log(userName);
  useEffect(() => {
    loadInfoUser();
  }, [userName]);

  function loadInfoUser() {
    try {
      axios
        .get(`${urlAccounts}/${userName}`)
        .then((response: AxiosResponse<userInfoDTO>) => {
          setUserInfo(response.data);
          console.log(response.data);
        });
    } catch (error: any) {
      Swal.fire("Eroare", "error");
    }
  }
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
        text: "Ai acceptat cererea de imprumut.",
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Eroare",
        text: "A apărut o eroare. Încercați din nou.",
        icon: "error",
      });
    }
  }

  return (
    <>
      <h5>Raspunde cererilor de imprumut</h5>
      <IndexEntity<transactionDTO>
        title="Tranzacții"
        loadDataTime={userInfo}
        url={`${urlTransactions}/lend/${userInfo?.id}`}
      >
        {(transactions) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Comunitate</th>
                <th>Data de început</th>
                <th>Data de sfârșit</th>
                <th>Caștig</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
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
                      Acceptă împrumutul
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
                      Respinge cererea
                    </Button>
                  </td>

                  <td>
                    <Link to={`/account/${transaction.userId}`}>
                      Detalii debitor
                    </Link>
                  </td>
                  <td>{transaction.startDate.toString()}</td>
                  <td>{transaction.endDate.toString()}</td>
                  <td>{transaction.earnings}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>

      <h5>Raspunsul la cererile tale de imprulut</h5>
    </>
  );
}
