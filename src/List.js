import './List.css';
import { ListIntems } from "./utils/items-array";
import { useState } from "react";

export default function WishList() {
  const [checkedState, setCheckedState] = useState(
    new Array(ListIntems.length).fill(false)
  );
  const [agregados, setAgregados] = useState([]);
  const [option, setOptions] = useState(true);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    setAgregados(agregados.concat(ListIntems[position]));
  };

  const handleButtonOnChange = () => {
    setOptions(!option);
  }

  const handleFinalizar = () => {
    console.log("Hola mundo");
  }

  return (
    <div className="Header">
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
              <ul className="ListIntems-list">
                {ListIntems.map(({ name }, index) => {
                  return (
                    <li key={index}>
                      <div className="ListIntems-list-item">
                        <div className="left-section">
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                          />
                          <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>
                      </div>
                    </li>
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
              <ul className="ListIntems-list">
                {ListIntems.map(({ name }, index) => {
                  if (checkedState[index]) {
                    return (
                      <li key={index}>
                        <div className="ListIntems-list-item">
                          <div className="left-section">
                            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
                <li>
                </li>
              </ul>
              <label className='nombre-invitado'>
                Nombre invitado
                <input type="text" name="name" className='input-invitado'/>
              </label>
              <div className='button-div'>
              <button className="button-6" onClick={() => handleButtonOnChange()}>Editar</button>
              <button className="button-6" onClick={() => handleFinalizar()}>Confirmar</button>
              </div>
              
            </div>
          }
        </div>
      </div>
    </div>
  );
}
