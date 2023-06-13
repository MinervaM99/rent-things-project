import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import styled from "styled-components";
import Button from "../utils/Button";
import { transactionCreationDTO } from "./transactions.model";
import { differenceInDays, isTomorrow, nextDay } from "date-fns";

const DatePickerInput = styled(DatePicker)`
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  max-width: 150px;
  .react-datepicker__month-container {
    width: 500px; /* Ajustează dimensiunea calendarului în funcție de nevoile tale */
  }
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

export default function RentForm(props: rentFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numDays, setNumDays] = useState<number>(0);

  const handleSubmit = (
    values: transactionCreationDTO,
    action: FormikHelpers<transactionCreationDTO>
  ) => {
    const { startDate, endDate } = values;
    if (startDate && endDate && props.dayPrice) {
      if (props.weekPrice && numDays >= 7) {
        const numWeeks = Math.floor(numDays / 7);
        const remainingDays = numDays % 7;
        const earnings =
          numWeeks * props.weekPrice + remainingDays * props.dayPrice;
        values.earnings = earnings; // Set the earnings field in the values object
      } else if (props.monthPrice && numDays >= 30) {
        const numMonths = Math.floor(numDays / 30);
        const remainingDays = numDays % 30;
        const earnings =
          numMonths * props.monthPrice + remainingDays * props.dayPrice;
        values.earnings = earnings; // Set the earnings field in the values object
      } else {
        const earnings = numDays * props.dayPrice;
        values.earnings = earnings; // Set the earnings field in the values object
      }
    }
    props.onSubmit(values, action);
  };

  const today = new Date();
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={(values, action) => handleSubmit(values, action)}
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
                  dateFormat="dd/MM/yyyy"
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  minDate={today}
                  endDate={endDate}
                  onChange={(date: Date) => {
                    setStartDate(date);
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setMilliseconds(0);
                    formikProps.setFieldValue("startDate", date);
                  }}
                ></DatePickerInput>
                <CalendarIcon />
              </DatePickerWrapper>
              <DatePickerWrapper>
                pana in data de
                <DatePickerInput
                  dateFormat="dd/MM/yyyy"
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  onChange={(date: Date) => {
                    setEndDate(date);
                    formikProps.setFieldValue(
                      "endDate",
                      new Date(date.setHours(23, 59, 59, 999))
                    ); // Actualizează valoarea câmpului invizibil "endDate"
                    if (startDate && date) {
                      const days = differenceInDays(date, startDate) + 1;
                      setNumDays(days);
                    } else {
                      setNumDays(0);
                    }
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

            <p>
              {numDays == 0 ? (
                <></>
              ) : numDays == 1 ? (
                <>1 zi selectată</>
              ) : (
                <p>{numDays} zile selectate</p>
              )}
            </p>

            {/* Câmpurile invizibile pentru a reține valorile startDate și endDate */}
            <Field type="hidden" name="startDate" />
            <Field type="hidden" name="endDate" />

            <Button type="submit" onClick={() => formikProps.isSubmitting}>
              Trimite cererea de împrumut
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface rentFormProps {
  dayPrice: number | undefined;
  weekPrice: number | undefined;
  monthPrice: number | undefined;
  model: transactionCreationDTO;
  onSubmit(
    values: transactionCreationDTO,
    action: FormikHelpers<transactionCreationDTO>
  ): void;
}
