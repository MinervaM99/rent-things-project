import React, { useEffect, useState } from 'react';
import './App.css';
import { itemDTO, landingPageDTO } from './items/items.model';
import ItemsList from './items/ItemsList';

function App() {

  const [items, setItems] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId =setTimeout(() => {
      setItems({
        sportsAndRelax: [
          {
            id: 1,
            title: 'Idiotul',
            description: 'Dostoievsky',
            priece: 5,
            itemImage: 'https://upload.wikimedia.org/wikipedia/ro/0/06/Idiotul.jpg'
          },
          {
            id: 2,
            title: 'Crima si pedeapsa',
            description: 'Dostoievsky',
            priece: 4,
            itemImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Cover_of_the_first_edition_of_Crime_and_Punishment.jpg/200px-Cover_of_the_first_edition_of_Crime_and_Punishment.jpg'
          }
        ],
        transport: [
        {
          id: 3,
          title: 'Remorca auto',
          description: 'Remorca 2 roti',
          priece: 40,
          itemImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Baset_trailer.jpg/220px-Baset_trailer.jpg'
        },
        {
          id: 4,
          title: 'Bicicleta de munte',
          description: 'Foarte buna',
          priece: 20,
          itemImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hardtail-mountain-bike.jpg/220px-Hardtail-mountain-bike.jpg'
        }
      ]
      })
    },4000);

    return (() => clearTimeout(timerId));
  });

  return (
    <div className='container'>
      <h3>Sport si Relaxare</h3>
      <ItemsList items={items.sportsAndRelax}/>
    

      <h3>Transport</h3>
      <ItemsList items={items.transport}/>
    </div>
  );
}

export default App;