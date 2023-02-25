import CategoryForm from "../forms/CategoryForm";

export default function CreateCategory() {
  return (
    <>
      <h3>Adauga o categorie</h3>
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await new Promise((r) => setTimeout(r, 1000));
          console.log(value);
        }}
      />

      
    </>
  );
}
