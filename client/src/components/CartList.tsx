import React, { useState, useEffect } from "react";
import axios from "axios";



const CartList = () => {
    const [cars, setCars] = useState<{ id: number; carPlate: string; type: string }[]>([]);
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get("/cars");
          setCars(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchCars();
    }, []);
  
    return (
      <div>
        {cars.map((car) => (
          <div key={car.id}>
            <h2>{car.carPlate}</h2>
            <p>{car.type}</p>
          </div>
        ))}
      </div>
    );
  };


export default CartList;
