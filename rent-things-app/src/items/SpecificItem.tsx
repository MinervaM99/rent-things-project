import { Link, useLocation, useNavigate } from "react-router-dom";
import { itemDTO } from "./items.model";
import css from "./SpecificItem.module.css";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { urlItems } from "../endpoints";
import axios from "axios";
import Swal from "sweetalert2";
import customConfirm from "../utils/customConfirm";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import styled from "styled-components";
import { dropRight } from "lodash";

export const ItemName = styled(Link)`
  font-size: 19px;
  color: black;
  margin-bottom: 10px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

export const ItemPrice = styled(Link)`
  font-size: 15px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: black;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const ItemNameBox = styled.div`
  margin-bottom: 10px;
  height: 57px;
`;

const ItemPricesBox = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  height: 62px;
`;

export default function SpecificItem(props: itemDTO) {
  const buildLink = () => `/item/${props.id}`;
  const navigate = useNavigate();
  const customAlert = useContext(AlertContext);
  const location = useLocation();
  const isSpecificRoute = location.pathname === "/myAccount/1";

  const handleOnClickEdit = () => {
    navigate(`/items/edit/${props.id}`);
  };

  async function deleteItem() {
    try {
      axios.delete(`${urlItems}/${props.id}`).then(() => {
        customAlert();
      });
      Swal.fire({
        text: "Anunțul a fos șters.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire("Eroare", "error");
      navigate(`../myAccount/1`);
    }
  }

  return (
    <Container >
      <Paper
        elevation={3}
        sx={{ height: "400px", width: "280px", margin: "15px" }}
      >
        {/* <ItemBox> */}
        <CardContent
          sx={{
            display: "flex",
            padding: "1px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Link to={buildLink()}>
            <CardMedia
                component="img"
                image={props.photo}
                alt="Product"
                style={{
                  objectFit: "cover",
                  height: "200px",
                  maxWidth: "230",
                }}
              />
          </Link>
        </CardContent>
        <ItemDetails>
          <ItemNameBox>
            <ItemName to={buildLink()}>{props.name}</ItemName>
          </ItemNameBox>
          <Divider />
          <ItemPricesBox>
            <ItemPrice to={buildLink()}>
              {props.dayPrice / 10 < 1 ? (
                <>
                  <pre></pre>
                  {props.dayPrice}
                </>
              ) : (
                props.dayPrice
              )}{" "}
              RON/zi
            </ItemPrice>
            {props.weekPrice ? (
              <ItemPrice to={buildLink()}>
                {props.weekPrice} RON/saptamana
              </ItemPrice>
            ) : null}
            {props.monthPrice ? (
              <ItemPrice to={buildLink()}>
                {props.monthPrice} RON/luna
              </ItemPrice>
            ) : null}
          </ItemPricesBox>
          <p style={{ color: "gray", fontWeight: "bold" }}>{props.location}</p>
        </ItemDetails>
        {/* </ItemBox> */}
        
      </Paper>

      {isSpecificRoute && (
        <Paper  elevation={1}
        sx={{ height: "50px", width: "280px", margin: "-10px 15px 0 15px" }}>
        <div style={{display: "flex", marginLeft:"45px"}}>
            <Button
            variant="outlined"
              size="medium"
              sx={{marginRight: "30px",
            marginTop: "10px"}}
              color="error"
              onClick={() =>
                customConfirm(
                  () => deleteItem(),
                  `Dorești să ștergi acest anunț?`,
                  "Șterge"
                )
              }
            >
              Șterge
            </Button>
            <Button
            variant="outlined"
              size="medium"
              color="success"
              onClick={handleOnClickEdit}
              style={{ display: "flex", marginTop: "10px" }}
            >
              Editează
            </Button>
            </div>
            </Paper>
      )}
      
    </Container>
  );
}

const ItemBox = styled(Paper)`
  height: 407px;
  width: 280px;
  margin: 15px;
  background-color: #fff;
`;

const Container = styled.div`
  display: block;
  margin: 0;
`;
