const TransactionStatus = {
  1: "in process",
  2: "accepted",
  3: "rejected",
};

export const conditionOptions = [
  { label: "Nou", value: 1 },
  { label: "Aproape nou", value: 2 },
  { label: "In stare bună", value: 3 },
  { label: "Utilizat", value: 4 },
];

export const ageOptions = [
  { label: "Mai putin de un an", value: 1 },
  { label: "Mai putin de 2 ani", value: 2 },
  { label: "Mai putin de 5 ani", value: 3 },
  { label: "Mai putin de 10 ani", value: 4 },
  { label: "Nu stiu", value: 5 },
];

const ItemAvailability ={
  1: "yes",
  0: "no"
}