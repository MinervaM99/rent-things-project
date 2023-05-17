// import ItemForm from "./ItemForm";

// export default function CreateItem() {
//   const containerStyles = {
//     maxWidth: "600px",
//     marginTop: "50px",
//     marginBottom: "30px",
//     marginLeft: "auto",
//     marginRight: "auto",
//   };
//   return (
//     <>
//       <div style={containerStyles}>
//         <h3>Inchiriaza un produs</h3>
//       </div>

//       <ItemForm
//         model={{
//           title: "",
//           description: "",
//           condition: 0,
//           photo: "",
//           age: 0,
//           location: "",
//           dayPrice: 0,
//           monthPrice: 0,
//           weekPrice: 0,
//           available: true,
//           userId: "0421cd4b-ebaf-4fb5-a903-33e68218f527",
//           categoryId: 0,
//         }}
//         onSubmit={async (value) => {
//           await new Promise((r) => setTimeout(r, 1000));
//           console.log(value);
//         }}
//         selectedCategory={[
//           { id: 1, name: "Bucatarie" },
//           { id: 2, name: "Gradina" },
//           { id: 3, name: "Sport" },
//           { id: 4, name: "Haine" },
//         ]}
//       />
//     </>
//   );
// }

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import DisplayErrors from '../utils/DisplayErrors';
import { itemCreationDTO} from './items.model';
import { urlItems } from '../endpoints';

export default function CreateItem() {
  const navigate = useNavigate();
  const containerStyles = {
    maxWidth: '600px',
    marginTop: '50px',
    marginBottom: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const [errors, setErrors] = useState<string[]>([]);

  async function create(item: itemCreationDTO) {
    try {
      await axios.post(urlItems, item);
      navigate('../');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 400 &&
          error.response?.data.code === 'ITEM_ALREADY_EXIST'
        ) {
          setErrors(error.response.data);
          console.log('Item already exists');
        }
      } else {
        console.log('Unexpected error', error);
      }
    }
  }

  return (
    <>
      <div style={containerStyles}>
        <h3>Inchiriaza un produs</h3>
      </div>

      <DisplayErrors errors={errors} />
      <ItemForm
        model={{
          title: "",
          description: "",
          condition: 0,
          photo: "",
          age: 0,
          location: "",
          dayPrice: 0,
          monthPrice: 0,
          weekPrice: 0,
          available: true,
          userId: "0421cd4b-ebaf-4fb5-a903-33e68218f527",
          categoryId: 0,
        }}
        onSubmit={async (value) => {
          await create(value);
        }}
        selectedCategory={[
          { id: 1, name: 'Bucatarie' },
          { id: 2, name: 'Gradina' },
          { id: 3, name: 'Sport' },
          { id: 4, name: 'Haine' },
        ]}
      />
    </>
  );
}
