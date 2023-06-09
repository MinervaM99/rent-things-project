import { Link } from "react-router-dom";
import { urlTransactions } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { transactionDTO } from "./transactions.model";
//to do
export default function IndexTransaction(props: IndexTransactionProps) {
  return (
    <>
      <IndexEntity<transactionDTO> url={`${urlTransactions}/${props.urlTransactionParam}`} title="Tranzacții">
        {(transactions, buttons) => (
          <>
            <thead>
              <tr>
                <th>nume Produs</th>
                <>Data de inceput</>
                <th>Data de sfarsit</th>
                <th>Pret</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <Link to={`/item/${transaction.itemId.id}`}>
                      {transaction.itemId.name}
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
    </>
  );
}

interface IndexTransactionProps{
    urlTransactionParam?: string;
}