import { useState } from "react";
import axios from "axios";
import React from "react";

const CartForm = () => {
  const [carPlate, setCarPlate] = useState("");
  const [type, setType] = useState("auto");

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    try {
      const response = await axios.post("/cars", { carPlate, type });
      console.log(response.data);
      // do something with the response
    } catch (error) {
      console.error(error);
      // handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car Plate:
        <input
          type="text"
          value={carPlate}
          onChange={(event) => setCarPlate(event.target.value)}
        />
      </label>
      <br />
      <label>
        Type:
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="auto">Auto</option>
          <option value="camioneta">Camioneta</option>
          <option value="pick up">Pick Up</option>
          <option value="bicicleta">Bicicleta</option>
        </select>
      </label>
      <br />
      <button type="submit">Create Car</button>
    </form>
  );
}

export default CartForm;
