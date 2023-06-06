import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { RentDTO } from "./rent.model";
import { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import styled from "styled-components";
import Button from "../utils/Button";

const DatePickerInput = styled(DatePicker)`
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  max-width: 150px;
`;

const CalendarIcon = styled(CalendarMonthOutlinedIcon)`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #555;
  cursor: pointer;
`;
const DatePickerWrapper = styled.div`
  position: relative;
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
  max-width: fit-content;
`;

export default function RentForm(props: categoryFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          startDate: Yup.date()
            .nullable()
            .required("Selectați intervalul de timp"),
          endDate: Yup.date()
            .nullable()
            .required("Selectați intervalul de timp"),
        })}
      >
        {/* desable the subscribe button */}

        {(formikProps) => (
          <Form>
            <DatePickerContainer>
              <DatePickerWrapper> 
                din data de
                <DatePickerInput
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    formikProps.setFieldValue("startDate", date);
                  }}
                >
                </DatePickerInput>
                <CalendarIcon />
              </DatePickerWrapper>
              <DatePickerWrapper>
                pana in data de
                <DatePickerInput
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  onChange={(date: Date) => {
                    setEndDate(date);
                    formikProps.setFieldValue("endDate", date); // Actualizează valoarea câmpului invizibil "endDate"
                  }}
                />
                <CalendarIcon />
              </DatePickerWrapper>
            </DatePickerContainer>

            {<ErrorMessage
              name="startDate"
              component="div"
              className="error-message"
            /> ? (
              <ErrorMessage
                name="endDate"
                component="div"
                className="error-message"
              />
            ) : null}

            {/* Câmpurile invizibile pentru a reține valorile startDate și endDate */}
            <Field type="hidden" name="startDate" />
            <Field type="hidden" name="endDate" />

            <Button disabled={formikProps.isSubmitting} type="submit">
              Inchiriază
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
interface categoryFormProps {
  model: RentDTO;
  onSubmit(values: RentDTO, action: FormikHelpers<RentDTO>): void;
}
