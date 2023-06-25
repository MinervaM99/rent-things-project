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
import { ageOptions, conditionOptions } from "../utils/SemanticNumberStorage";

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
        icon: "info",
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f5f7",
        paddingBottom: "70px",
      }}
    >
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
              sx={{ width: "750px", height: "550px", padding: "20px" }}
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
                variant="body2"
                color="text.secondary"
                fontSize={"18px"}
                sx={{ display: "flex", padding: "0px 0 10px 0" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid gray",
                    borderRadius: "12px",
                    width: "105px",
                    fontSize: "13px",
                    marginRight: "10px",
                  }}
                >
                  {item.condition
                    ? conditionOptions.map((age) =>
                        age.value === item.age ? <>{age.label}</> : null
                      )
                    : null}
                </div>
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "12px",
                    width: "130px",
                    fontSize: "13px",
                    padding: "0 0px 0 10px",
                  }}
                >
                  {item.age
                    ? ageOptions.map((age) =>
                        age.value === item.age ? <>{age.label}</> : null
                      )
                    : null}{" "}
                </div>
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"25px"}
                dangerouslySetInnerHTML={{ __html: item.name }}
              ></Typography>

              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"13px"}
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontWeight: "bold",
                  marginBottom: "50px",
                  fontSize: "15px",
                  marginTop: "25px",
                }}
              >
                Locația produdului: {item?.location}
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
              sx={{ width: 350, height: 360, padding: "20px" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={"20px"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "10px" 
                }}
              >
                Împrumută
              </Typography>
              {item?.dayPrice != null ? (
                item?.dayPrice > 0 ? (
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    fontSize={"15px"}
                  >
                    <b>{item?.dayPrice} </b> Ron/zi
                  </Typography>
                ) : null
              ) : null}
              {item?.weekPrice != null ? (
                item?.weekPrice > 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"15px"}
                  >
                    <b>{item?.weekPrice}</b> Ron/saptamana
                  </Typography>
                ) : null
              ) : null}
              {item?.monthPrice != null ? (
                item?.monthPrice > 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"15px"}
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
                    <Typography
                      variant="body2"
                      fontSize={"13px"}
                      sx={{ paddingTop: "10px" }}
                    >
                      Acest produs nu este disponibil in intervalul:
                    </Typography>
                    {transactions.map((transaction, index) => {
                      const unavailableStartDate = new Date(
                        transaction.startDate
                      );
                      const unavailableEndDate = new Date(transaction.endDate);

                      const itemDetails = (
                        <div key={index}>
                          <Typography
                            variant="body2"
                            fontSize={"13px"}
                            sx={{ paddingTop: "2px" }}
                          >
                            {formatDate(unavailableStartDate)} --{" "}
                            {formatDate(unavailableEndDate)}
                          </Typography>
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
                    <Link
                      style={{
                        margin: "8px 0 0 13px",
                        color: "#5d5d5d",
                        fontSize: "18px",
                      }}
                      to={buildLink()}
                    >
                      <b>{item?.userId?.userName}</b>
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
    </div>
  );
}
