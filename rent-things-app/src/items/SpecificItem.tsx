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
  Typography,
} from "@mui/material";
import { urlItems } from "../endpoints";
import axios from "axios";
import Swal from "sweetalert2";
import customConfirm from "../utils/customConfirm";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import styled from "styled-components";

export default function SpecificItem(props: itemDTO) {
  const buildLink = () => `/item/${props.id}`;
  const navigate = useNavigate();
  const customAlert = useContext(AlertContext);
  const location = useLocation();
  const isSpecificRoute = location.pathname === "/myAccount";

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
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`../myAccount`); // Navigăm doar dacă butonul "OK" a fost apăsat
        }
      });
    } catch (error) {
      Swal.fire("Eroare", "error");
      navigate(`../myAccount`);
    }
  }

  return (
    <Container>
      <Box
        sx={{
          // display: "flex",
          // flexWrap: "wrap",
          "& > :not(style)": {
            width: 750,
            height: 290,
          },
        }}
      >
        <Card sx={{ maxWidth: 270, margin: 1, height: 200 }}>
          <CardActionArea>
            <CardContent>
              <Link to={buildLink()}>
                <CardMedia
                  component="img"
                  image={props.photo}
                  alt="Product"
                  style={{
                    objectFit: "cover",
                    height: "170px",
                    width: "auto",
                  }}
                />
              </Link>
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Link to={buildLink()}>{props.name}</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link to={buildLink()}>{props.dayPrice}</Link>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      {isSpecificRoute && (
        <Card sx={{ maxWidth: 270, margin: 1, height: 40 }}>
          <CardActions>
            <Button
              size="medium"
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
            <Button size="medium" color="inherit" onClick={handleOnClickEdit}>
              Editează
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: block;
  padding: 0;
`;
