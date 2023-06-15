import { useContext, useEffect, useState } from "react";
import { landingPageDTO } from "../items/items.model";
import ItemsList from "../items/ItemsList";
import axios, { AxiosResponse } from "axios";
import { urlItems } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import AuthenticationContext from "../security/AuthentictionContext";
import {Container, Box, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = styled(Box)`
  align-items: center;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 8px;
  width: 570px;
  margin: 100px;
`;

const SearchTextField = styled(TextField)`
  width: 500px;
  margin-right: 8px;
  border-radius: 15px;
`;

export default function LandingPage() {

  const { claims } = useContext(AuthenticationContext);
  const [items, setItems] = useState<landingPageDTO>({});
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    loadData();
  }, []);

  function getUserName(){
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }

  function loadData() {
    try{
      axios.get(urlItems).then((response: AxiosResponse<landingPageDTO>) => {
        setItems(response.data);
      });
    }catch(error: any){
      console.log(error.response.data)
    }
    
  }

  function handleSearch() {
    // Redirecționare către pagina FilterItems cu parametrul de căutare
    navigate(`/items/filter/${searchText}`);
  }

  return (
    <Container>
       <SearchBox display="flex">
        <SearchTextField
          label="Caută un obiect"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button >
        <SearchIcon onClick={handleSearch}/>
        </Button>
      </SearchBox>
      <h3>Ultimele adaugate</h3>
      <AlertContext.Provider
        value={() => {
          loadData();
        }}
      >
        <ItemsList listOfItems={items.lastItemsAdded} />
      </AlertContext.Provider>
    </Container>
  );
}
