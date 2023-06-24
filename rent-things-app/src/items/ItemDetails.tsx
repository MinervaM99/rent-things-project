import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { urlAccounts, urlItems, urlTransactions } from "../endpoints";
import { itemDTO } from "./items.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";
import {
  Avatar,
  Box,
  CardMedia,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import RentForm from "../transactions/RentForm";
import { userDTO, userInfoDTO } from "../security/security.model";
import {
  transactionCreationDTO,
  transactionDTO,
} from "../transactions/transactions.model";
import Swal from "sweetalert2";
import AuthenticationContext from "../security/AuthentictionContext";
import { formatDate, generateRandomColor } from "../utils/utils";
import Authorized from "../security/Authorized";

export default function ItemDetails() {
  const { claims } = useContext(AuthenticationContext);
  //itemId
  const { id }: any = useParams();
  //built the link for user details page using user name
  const buildLink = () => `/account/${item?.userId?.userName}`;
  const [item, setItem] = useState<itemDTO>();
  // const [userInfo, setUserInfo] = useState<userInfoDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<transactionDTO[]>([]);
  const navigate = useNavigate();

  //obtine username din claims
  function getUserName(): string {
    return claims.find((x) => x.name === "userName")?.value || "";
  }
  const userName = getUserName();

  function getUserId(): string {
    return claims.find((x) => x.name === "userId")?.value || "";
  }
  const myUserId = getUserId();

  useEffect(() => {
    loadItemDetails();
  }, [id]);

  useEffect(() => {
    if (item && item.userId) {
      getUnavailableDates();
    }
  }, [item]);

  async function loadItemDetails() {
    try {
      await axios
        .get(`${urlItems}/${id}`)
        .then((response: AxiosResponse<itemDTO>) => {
          setItem(response.data);
        });
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }

  function getUnavailableDates() {
    try {
      axios
        .get(`${urlTransactions}/${id}`)
        .then((response: AxiosResponse<transactionDTO[]>) => {
          setTransactions(response.data);
          console.log("aaa", response.data);
        });
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }

  async function sendTransactionRequest(values: transactionCreationDTO) {
    if (userName === "") {
      Swal.fire({
        icon: "error",
        title: `Trebuie sa vă conectați pentru a trimite o cerere.`,
        confirmButtonText: "Ok",
      });
    } else {
      try {
        const startDate = new Date(values.startDate);
        const endDate = new Date(values.endDate);
        const confirmResult = await Swal.fire({
          html: `
          <h3>Doriti sa imprumutai acest produs?</h3>
          <p><strong>Din data de:</strong> ${formatDate(
            startDate
          )}, ora ${startDate.toLocaleTimeString()}</p>
          <p><strong>Pâna în data de:</strong> ${formatDate(
            endDate
          )}, ora ${endDate.toLocaleTimeString()}</p>
          <p>Datorați proprietarului ${values.earnings} Ron</p>
        `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Trimite cererea",
          cancelButtonText: "Cancel",
        });
        if (confirmResult.isConfirmed) {
          const response = await axios.post(urlTransactions, values);
          console.log(response.data);
          Swal.fire("Cererea de împrumut a fost trimisă!", "success");
          navigate(`/item/${id}`);
        }
      } catch (error: any) {
        setErrors(error.response.data);
        Swal.fire({
          icon: "error",
          html: `<h3> ${error.response.data}</h3> `,
          confirmButtonText: "Ok",
        });
      }
    }
  }
  const randomColor = generateRandomColor();

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      {/* <DisplayErrors errors={errors} /> */}
      {item ? (
        <div style={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              height: "auto",
              margin: "35px 0px 0px 0px",
              width: "70%",
            }}
          >
            {/* Item detalis */}
            <Paper
              elevation={2}
              sx={{ width: "700px", height: "600px", padding: "20px" }}
            >
              <CardMedia
                component="img"
                image={item?.photo}
                alt="Product"
                style={{
                  objectFit: "contain",
                  height: "70%",
                  width: "100%",
                  marginBottom: "20px",
                }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"25px"}
                dangerouslySetInnerHTML={{ __html: item.name }}
              ></Typography>
              {/* <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"18px"}
              >
                {item.condition}
              </Typography> */}
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"13px"}
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></Typography>
              <Typography sx={{ marginBottom: "100px", fontSize: "15px" , marginTop: "25px"}}>
                Locatia produdului: {item?.location}
              </Typography>
            </Paper>
          </Box>

          {/* Rent details */}
          <Box
            sx={{
              // flexWrap: "wrap",
              margin: "35px 0px 0px 25px",
              position: "sticky",
            }}
          >
            <Paper
              elevation={2}
              sx={{ width: 350, height: 350, padding: "20px" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"25px"}
                
              >
                Împrumută produsul
              </Typography>
              {item?.dayPrice != null ? (
                item?.dayPrice > 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"15px"}
                  >
                    {item?.dayPrice} Ron/zi
                  </Typography>
                ) : null
              ) : null}
              {item?.weekPrice != null ? (
                item?.weekPrice > 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"13px"}
                  >
                    {item?.weekPrice} Ron/saptamana
                  </Typography>
                ) : null
              ) : null}
              {item?.monthPrice != null ? (
                item?.monthPrice > 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"13px"}
                  >
                    {item?.monthPrice} Ron/luna
                  </Typography>
                ) : null
              ) : null}

              <RentForm
                model={{
                  userId: `${myUserId}`, //borrowerId (me)
                  itemId: id,
                  startDate: "",
                  endDate: "",
                  earnings: 0,
                  status: 1,
                }}
                dayPrice={item.dayPrice}
                weekPrice={item.weekPrice}
                monthPrice={item.monthPrice}
                onSubmit={(values) => sendTransactionRequest(values)}
              />

              {/* Display unavailable dates */}
              <Typography>
                {transactions.length === 0 ? null : (
                  <>
                    <span>Acest produs nu este disponibil in intervalul:</span>
                    {transactions.map((transaction, index) => {
                      const unavailableStartDate = new Date(
                        transaction.startDate
                      );
                      const unavailableEndDate = new Date(transaction.endDate);

                      const itemDetails = (
                        <div key={index}>
                          <span>
                            {formatDate(unavailableStartDate)} --{" "}
                            {formatDate(unavailableEndDate)}
                          </span>
                        </div>
                      );

                      return itemDetails;
                    })}
                  </>
                )}
              </Typography>
            </Paper>

            {/* User Details */}
            <Paper
              elevation={2}
              sx={{
                width: 350,
                height: 80,
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                display={"flex"}
              >
                <Avatar sx={{ bgcolor: randomColor }}>
                  {item?.userId?.userName &&
                    item.userId.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Authorized
                  authorized={
                    <Link style={{ margin: "8px" }} to={buildLink()}>
                      {item?.userId?.userName}
                    </Link>
                  }
                  notAuthorized={
                    <span style={{ margin: "8px" }}>
                      {item?.userId?.userName}
                    </span>
                  }
                ></Authorized>
              </Typography>
            </Paper>
          </Box>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
