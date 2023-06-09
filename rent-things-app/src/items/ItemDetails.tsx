import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlAccounts, urlItems, urlTransactions } from "../endpoints";
import { itemDTO } from "./items.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";
import { Avatar, Box, CardMedia, Paper, Typography } from "@mui/material";
import RentForm from "../rent/RentForm";
import { userDTO } from "../security/security.model";
import {
  transactionCreationDTO,
  transactionDTO,
} from "../transactions/transactions.model";
import Swal from "sweetalert2";

export default function ItemDetails() {
  const { id }: any = useParams();
  const [item, setItem] = useState<itemDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<userDTO>();
  const [transactions, setTransactions] = useState<transactionDTO[]>([]);

  useEffect(() => {
    try {
      axios
        .get(`${urlItems}/${id}`)
        .then((response: AxiosResponse<itemDTO>) => {
          setItem(response.data);
        });
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }, [id]);

  useEffect(() => {
    if (item && item.userId) {
      getUnavailableDates();
      getUserInfo();
    }
  }, [item]);

  function getUnavailableDates() {
    try {
      axios
        .get(`${urlTransactions}/${id}`)
        .then((response: AxiosResponse<transactionDTO[]>) => {
          setTransactions(response.data);
          console.log(response.data)
        });
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }
  function getUserInfo() {
    try {
      axios
        .get(`${urlAccounts}/${item?.userId}`)
        .then((response: AxiosResponse<userDTO>) => {
          setUserInfo(response.data);
        });
    } catch (error: any) {
      setErrors(error.response.data);
    }
  }

  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async function sendRequest(values: transactionCreationDTO) {
    try {
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);
      const confirmResult = await Swal.fire({
        html: `
          <h3>Doriti sa imprumutai acest produs?</h3>
          <p><strong>Din data de:</strong> ${startDate.toISOString()}</p>
          <p><strong>Pâna în data de:</strong> ${endDate.toISOString()}</p>
          <p>Datorați proprietarului ${values.earnings} Ron</p>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Trimite cererea",
        cancelButtonText: "Cancel",
      });

      if (confirmResult.isConfirmed) {
        await axios.post(urlTransactions, values);
        console.log(values);
        Swal.fire( "Cererea de împrumut a fost trimisă!", "success");
      }
    } catch (error) {
      Swal.fire("Error", "", "error");
    }
  }

  const randomColor = generateRandomColor();
  return (
    <>
      <DisplayErrors errors={errors} />
      {item ? (
        <div style={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              margin: "15px",
              "& > :not(style)": {
                m: 1,
                width: 750,
                height: 700,
              },
            }}
          >
            {/* Item detalis */}
            <Paper
              elevation={2}
              sx={{ width: "600px", height: "450px", padding: "20px" }}
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
              <Typography gutterBottom variant="h5" component="div">
                {item?.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item?.dayPrice}
              </Typography>
            </Paper>
          </Box>

          {/* Rent details */}
          <Box
            sx={{
              // flexWrap: "wrap",
              margin: "23px",
            }}
          >
            <Paper
              elevation={2}
              sx={{ width: 350, height: 350, padding: "20px" }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Împrumută produsul
              </Typography>
              {item?.dayPrice != null ? (
                item?.dayPrice > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {item?.dayPrice} Ron/zi
                  </Typography>
                ) : null
              ) : null}
              {item?.weekPrice != null ? (
                item?.weekPrice > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {item?.weekPrice} Ron/saptamana
                  </Typography>
                ) : null
              ) : null}
              {item?.monthPrice != null ? (
                item?.monthPrice > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {item?.monthPrice} Ron/luna
                  </Typography>
                ) : null
              ) : null}

              <RentForm
                model={{
                  userId: `${item.userId}`, //borrowerId
                  itemId: id,
                  startDate: "",
                  endDate: "",
                  earnings: 0,
                  status: 1,
                }}
                dayPrice={item.dayPrice}
                weekPrice={item.weekPrice}
                monthPrice={item.monthPrice}
                onSubmit={(values) => sendRequest(values)}
              />

              <Typography>
              <span>Acest produs nu este disponibil intervalul:</span>
                {transactions.map((transaction, index) => {
                  const unavailableStartDate = new Date(transaction.startDate);
                  const unavailableEndDate = new Date(transaction.endDate);

                  const itemDetails = (
                    <div key={index}>
                      <span>
                        {unavailableStartDate.getUTCDate()}/
                        {unavailableStartDate.getMonth()+1}/
                        {unavailableStartDate.getUTCFullYear()} -  {unavailableEndDate.getUTCDate()}/
                        {unavailableEndDate.getUTCMonth()+1}/
                        {unavailableEndDate.getUTCFullYear()}
                      </span>
                    </div>
                  );

                  return itemDetails;
                })}
              </Typography>
            </Paper>
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
                  {userInfo?.userName &&
                    userInfo.userName.charAt(0).toUpperCase()}
                </Avatar>
                <p style={{ margin: "8px" }}> Detalii </p>
              </Typography>
            </Paper>
          </Box>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
