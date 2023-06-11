import IndexEntity from "../utils/IndexEntity";
import customConfirm from "../utils/customConfirm";
import Button from "../utils/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { userDTO } from "./security.model";
import { urlAccounts } from "../endpoints";

export default function IndexUsers() {
  async function makeAdmin(id: string) {
    await doAdmin(`${urlAccounts}/makeAdmin`, id);
  }

  async function removeAdmin(id: string) {
    await doAdmin(`${urlAccounts}/removeAdmin`, id);
  }

  async function doAdmin(url: string, id: string) {
    try{
      await axios.post(url, JSON.stringify(id), {
        headers: { "Content-Type": "application/json" },
      });
  
      Swal.fire({
        title: "Success",
        text: "Operation finished correctly",
        icon: "success",
      });
    }catch(error:any){
      Swal.fire({
        title: "Eroare",
        text: "A apărut o eroare. Încercați din nou.",
        icon: "error",
      });
    } 
  }

  return (
    <IndexEntity<userDTO> title="Users" url={`${urlAccounts}/listUsers`}>
      {(users) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <Button
                    onClick={() =>
                      customConfirm(
                        () => makeAdmin(user.id),
                        `${user.email} va avea drepturi de administrator`,
                        "Acorda"
                      )
                    }
                  >
                    Make Admin
                  </Button>

                  <Button
                    className="btn btn-danger ms-2"
                    onClick={() =>
                      customConfirm(
                        () => removeAdmin(user.id),
                        `Doresti sa stergi drepturile de administrator ale utilizatorului ${user.email} ?`,
                        "Sterge"
                      )
                    }
                  >
                    Remove Admin
                  </Button>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
