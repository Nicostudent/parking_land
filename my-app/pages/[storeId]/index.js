import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCarForm from './AddCarForm'

export default function Cars({ initialCars }) {
  const [cars, setCars] = useState(initialCars)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await axios.get(`http://localhost:4000/stores/${initialCars[0].storeId}/cars`)
      setCars(response.data)
    }, 500)
    return () => clearInterval(intervalId)
  }, [initialCars])

  const addCar = async (newCar) => {
    const response = await axios.post(`http://localhost:4000/stores/${newCar.storeId}/cars`, newCar)
    setCars([...cars, response.data])
  }

  return (
    <div>    
      {cars.length && cars.map(c => (
        <div key={c.id} className='flex w-48 border-2 border-slate-300 justify-between'> 
          <p>{c.type}</p>
          <p>{c.carPlate}</p>
        </div>
      ))}

      <div>
        <AddCarForm storeId={initialCars.length > 0 ? initialCars[0].storeId : null} onSubmit={addCar} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { storeId } = context.query

  const response = await axios.get(`http://localhost:4000/stores/${storeId}/cars`)
  const initialCars = response.data

  return { props: { initialCars } }
}
