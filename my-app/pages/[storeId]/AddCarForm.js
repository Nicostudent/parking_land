import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddCarForm({ storeId }) {
  const [carPlate, setCarPlate] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/stores/${storeId}/cars`, { carPlate, type });
      console.log('Car added successfully', response);
      // Reset the form after successful submission
      setCarPlate('');
      setType('');
      setErrorMessage('');
    } catch (error) {
      console.error('Unable to add car', error);
      setErrorMessage('Unable to add car');
    }
  };



  return (
    <div className='border-2 border-slate-300 bg-slate-200 m-10'>
      <h2 className='text-center'>Nuevo auto?</h2>
      <form onSubmit={handleSubmit}>
        <div className='p-2'>
          <label htmlFor="car-plate">Patente numer/letras</label>
          <input className="focus:bg-green-300 ml-2 p-2 rounded-lg"
            id="car-plate"
            type="text"
            value={carPlate}
            onChange={(e) => setCarPlate(e.target.value)}
          />
        </div>
        <div className='p-2 flex'>
          <label htmlFor='car-type"' className='block self-center font-medium text-gray-700'>
            Vehiculo
          </label>
          <select
            id='car-type"'
            name='text'
            className='mt-1 block  ml-2 p-2 text-base rounded-md bg-slate-50'
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value=''>Tipo</option>
            <option value='auto'>Auto</option>
            <option value='camioneta'>Camioneta</option>
            <option value='pick up'>Pick Up</option>
            <option value='bicicleta'>Bicicleta</option>
          </select>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Agregar auto</button>
      </form>
    </div>
  );
}
