import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/stores');
        const data = response.data;
        setStores(data);
      } catch (error) {
        console.error('Unable to fetch stores', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {stores.map((store) => (
        <div key={store.id}>
          <Link href={`/api/${store.id}/cars`}>
          <p>{store.name}</p>           
          </Link>
        </div>
      ))}
    </div>
  );
}
