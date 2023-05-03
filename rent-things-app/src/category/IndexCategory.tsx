import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryDTO } from "./category.model";
import { urlCategorirs } from "../endpoints";
import GenericListComponent from "../utils/GenericListComponent";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import customConfirm from "../utils/customConfirm";

export default function IndexCategory() {
  const [categories, setCategories] = useState<categoryDTO[]>();
  const [totalAmountOfPages, setTotalAmountOfPAges] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  async function loadData() {
    axios
      .get(urlCategorirs, { params: { page, recordsPerPage } })
      // .get('https://localhost:7216/api/categories')
      .then((response: AxiosResponse<categoryDTO[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPAges(Math.ceil(totalAmountOfRecords / recordsPerPage));

        setCategories(response.data);
      });
  }

  async function deleteCategory(id: number) {
    try {
      await axios.delete(`${urlCategorirs}/${id}`);
      loadData();
    } catch (error: any) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  }

  return (
    <>
      <h1>Categories</h1>
      <Link className="btn btn-primary" to="/category/create">
        Creaza o categorie
      </Link>
      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />
      <GenericListComponent list={categories}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Nume categorie</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id}>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`../category/edit/${category.id}`}
                  >
                    Edit
                  </Link>

                  <Button
                    onClick={() => customConfirm(() => deleteCategory(category.id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericListComponent>

      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />
    </>
  );
}
