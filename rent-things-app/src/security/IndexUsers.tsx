import IndexEntity from "../utils/IndexEntity";
import customConfirm from "../utils/customConfirm";
import Button from "../utils/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { userDTO } from "./security.model";
import { urlAccounts } from "../endpoints";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import AuthenticationContext from "./AuthentictionContext";

export default function IndexUsers() {
  const { update, claims } = useContext(AuthenticationContext);

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }
  const userName = getUserName();
  async function makeAdmin(id: string) {
    await doAdmin(`${urlAccounts}/makeAdmin`, id);
  }

  async function removeAdmin(id: string) {
    await doAdmin(`${urlAccounts}/removeAdmin`, id);
  }

  async function doAdmin(url: string, id: string) {
    try {
      await axios.post(url, JSON.stringify(id), {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        title: "Success",
        text: "Operația a fost realizată cu succes.",
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Eroare",
        text: `${error.response.data}`,
        icon: "error",
      });
    }
  }

  return (
    <>
      <IndexEntity<userDTO> title="Utilizatorii ShareCircle" url={`${urlAccounts}/listUsers`}>
        {(users) => { 
          return (
            <>
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontSize:"16px"}}>Acțiuni</TableCell>
                  <TableCell sx={{fontSize:"16px"}}>Id</TableCell>
                  <TableCell sx={{fontSize:"16px"}}>Nume de utilizator</TableCell>
                  <TableCell sx={{fontSize:"16px"}}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => ( 
                  <TableRow key={user.id}>
                    {user.userName === userName? null :<><TableCell>
                      <Button
                        onClick={() =>
                          customConfirm(
                            () => makeAdmin(user.id),
                            `${user.email} va avea drepturi de administrator`,
                            "Acorda"
                          )
                        }
                      >
                        Acordă Drepturi de Admin
                      </Button>

                      {/* <Button
                        className="btn btn-danger ms-2"
                        onClick={() =>
                          customConfirm(
                            () => removeAdmin(user.id),
                            `Doresti sa stergi drepturile de administrator ale utilizatorului ${user.email} ?`,
                            "Sterge"
                          )
                        }
                      >
                        Șterge drepturi
                      </Button> */}
                    </TableCell>
                    <TableCell sx={{fontSize:"12px"}}>{user.id}</TableCell>
                    <TableCell sx={{fontSize:"12px"}}>{user.userName}</TableCell>
                    <TableCell sx={{fontSize:"12px"}}>{user.email}</TableCell></>}
                    
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

