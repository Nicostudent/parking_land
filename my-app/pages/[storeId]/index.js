import { useState, useEffect } from 'react'
import axios from 'axios'
import AddCarForm from './AddCarForm'

export default function Cars({ initialCars }) {
  const [cars, setCars] = useState(initialCars)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await axios.get(`http://localhost:4000/stores/${initialCars[0]?.storeId}/cars`);
      const updatedCars = response.data.map((car) => {
        const elapsedTimeInSeconds = Math.floor((Date.now() - Date.parse(car.createdAt)) / 1000);
        const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);
        const elapsedTimeInHours = Math.floor(elapsedTimeInMinutes / 60);

        return {
          ...car,
          elapsedTime: {
            hours: elapsedTimeInHours,
            minutes: elapsedTimeInMinutes % 60,
            seconds: elapsedTimeInSeconds % 60,
          },
        };
      });
      setCars(updatedCars);
    }, 500);
    return () => clearInterval(intervalId);
  }, [initialCars]);


  const addCar = async (newCar) => {
    const response = await axios.post(`http://localhost:4000/stores/${newCar.storeId}/cars`, newCar)
    setCars([...cars, response.data])
  }

  const deleteCar = async (carId) => {
    const car = cars.find((c) => c.id === carId);
    if (!car) {
      return;
    }
  
    const elapsedTimeInSeconds = Math.floor((Date.now() - Date.parse(car.createdAt)) / 1000);
    const elapsedTimeInHours = Math.floor((elapsedTimeInSeconds - (15 * 60)) / 3600); // subtract 15 minutes (0.25 hours) from the elapsed time
    
    let cost;
    switch (car.type) {
      case "auto":
        cost = elapsedTimeInHours * 1;
        break;
      case "camioneta":
        cost = elapsedTimeInHours * 3;
        break;
      case "pickUp":
        cost = elapsedTimeInHours * 5;
        break;
      case "bicicleta":
        cost = elapsedTimeInHours * 10;
        break;
      default:
        cost = elapsedTimeInHours * 1;
    }
  
    const response = await axios.delete(`http://localhost:4000/stores/${initialCars[0]?.storeId}/cars/${carId}`)
    if (response.status === 200) {
      setCars(cars.filter((c) => c.id !== carId))
  
      // show the cost
      alert(`The ${car.type} was parked for ${elapsedTimeInHours} hours and the cost is $${cost}.`);
    }
  }
  
  

  return (
    <div className='border-2 m-2 border-blue-500'>
      <div className='border-2 w-10/12 flex flex-col justify-center align-middle border-green-700'>
        {cars.length && cars.map((c) => (
          <div key={c.id} className="">
            <div className="flex justify-between m-2 border-b-2 border-red-300">
              <p>{c.type}</p>
              <p>{c.carPlate}</p>
              <p>{new Date(c.createdAt).toLocaleString("en-US", { timeStyle: "short", hour12: false })}</p>
              <p>{c.elapsedTime && `${c.elapsedTime.hours}h ${c.elapsedTime.minutes}m ${c.elapsedTime.seconds}s`}</p>
              <button onClick={() => deleteCar(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

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
