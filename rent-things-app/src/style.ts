import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormButton = styled(Button)`
  margin: 10px 0 0px 0px;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  background: #3b8c6e;
  color: #fff;
  text-align: center;
  padding: 5px;
  height: 30px;
  &:hover,
  &:focus {
    background: #3b8c6ec2;
  }
  width: 100%;
`;

export const FormCancelButton = styled(Link)`
  margin: 6px 0 10px 0px;
  border-radius: 5px;
  font-size: 13px;
  text-align: center;
  border: none;
  background: #1e5959;
  color: #fff;
  padding: 5px;
  height: 30px;
  &:hover,
  &:focus {
    background: #1e5959d1;
  }
`;

export const AuthLink = styled.div`
  position: relative;

  display: flex;
  flex-direction: row-reverse;
`;

export const FormContainer = styled(Container)`
  display: grid;
  border-radius: 15px;
  box-shadow: -1px -1px 5px #1e595910, 4px 6px 8px #3b8c6e;
  padding: 15px 15px 20px 15px;
`;
