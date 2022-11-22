import './List.css';
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, update } from "firebase/database";

export default function WishList() {
  const [ListItems, setListItems] = useState([]);
  const firebaseConfig = {
    apiKey: "AIzaSyDs_CICOO1ymVmLyo5Q8zT6SukzmY8cvus",
    authDomain: "db-agustin-baby-wish-list.firebaseapp.com",
    projectId: "db-agustin-baby-wish-list",
    storageBucket: "db-agustin-baby-wish-list.appspot.com",
    messagingSenderId: "675708194625",
    appId: "1:675708194625:web:1c5860b9e8cc06ff909bc0"
  };
  const app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase(app));

  if (ListItems.length === 0) {
    get(child(dbRef, `items/`)).then((snapshot) => {
      if (snapshot.exists()) {
        setListItems(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const [option, setOptions] = useState(true);
  const [fin, setFin] = useState(true);
  const [checkedState, setCheckedState] = useState(
    new Array(ListItems.length).fill(false)
  );

  ListItems.map((item, index) => {
    checkedState[index] = item.checked;
  });

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const newList = ListItems;
    newList[position].checked = !newList[position].checked;
    setListItems(newList);
  };

  const handleButtonOnChange = () => {
    setOptions(!option);
  }

  const handleFin= () => {
    setFin(!fin);
  }

  const handleFinalizar = () => {
    const newList = ListItems
    newList.forEach(item => 
      item.checked && item.invitado.length === 0? item.invitado = datos.name : ""
    );
    const db = getDatabase();
    newList.forEach((item, index) =>
    {
      update(ref(db, 'items/' + index), item)
     .then(() => {
       setFin(false);
     })
     .catch((error) => {
       console.log('The write failed...');
     });
    }
    );
  }

  // Manejo Invitado

  const [datos, setDatos] = useState({
    name: ''
  })

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="Header">
      { fin ?
      <div className='Wish-list'>
        <div>
          <p className='Title'>Baby Shower Wish List</p>
          <p className='Explicacion'>
            Mi mami y mi papi me dijeron que estas cosas puedo necesitar puedes seleccionar cuantas quieras
          </p>
        </div>
        <div className='List'>
          {option ?
            <div className="checkbox-list">
              <p className='List-title'>Opciones</p>
              <ul className="ListItems-list">
                {ListItems.map(({ name, checked, invitado }, index) => {
                  return (
                    invitado.length === 0 ? 
                    <li key={index}>
                      <div className="ListItems-list-item">
                        <div className="left-section">
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                          />
                          <label htmlFor={`custom-checkbox-${index, invitado.length}`}>{name}</label>
                        </div>
                      </div>
                    </li> : null
                  );
                })}
                <li>
                </li>
              </ul>
              <button className="button-6" onClick={() => handleButtonOnChange()}>Confirmar</button>
            </div>
            :
            <div className="checkbox-list">
              <p className='List-title'>Seleccion</p>
              <ul className="ListItems-list">
                {ListItems.map(({ name, checked, invitado }, index) => {
                  return checked && invitado.length === 0? (
                    <li key={index}>
                      <div className="ListItems-list-item">
                        <div className="left-section">
                          <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>
                      </div>
                    </li>
                  ) : null;
                })}
                <li>
                </li>
              </ul>
              <label className='nombre-invitado'>
                Nombre invitado
                <input type="text" placeholder="Nombre" onChange={handleInputChange} name="name" className='input-invitado' />
              </label>
              <div className='button-div'>
                <button className="button-6" onClick={() => handleButtonOnChange()}>Editar</button>
                <button className="button-6" onClick={() => handleFinalizar()}>Confirmar</button>
              </div>

            </div>
          }
        </div>
      </div>
      :
      <div className='Wish-list'>
      <div>
          <p className='Title'>Gracias</p>
          <p className='Explicacion'>
            Te esperamos
          </p>
        </div>
      </div> }
    </div>
  );
}
