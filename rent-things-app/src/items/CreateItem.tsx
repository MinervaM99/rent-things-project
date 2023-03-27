import ItemForm from "../forms/ItemForm";

export default function CreateItem() {
  return (
    <>

      <h3>Create Item</h3>
      <ItemForm
        model={{ id: 100,title: "", description: "",  price: 0, categoryIds: 0}}
        onSubmit={async (value) => {
          await new Promise((r) => setTimeout(r, 1000));
          console.log(value);
        }}
        selectedCategory = {[{id: 1, name: "Bucatarie"}, {id:2, name: "Gradina"},  {id:3, name: "Sport"},  {id:4, name: "Haine"}]}
      />

    </>
  );
}
