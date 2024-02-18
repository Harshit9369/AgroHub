import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have Axios installed

export default function WeatherApi() {
  const [data, setData] = useState(null);
  //const apiKey = '579b464db66ec23bdd000001cc624656fefe4e706d0c8b92b26415bf'; // Replace 'YOUR_API_KEY' with your actual API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=26.8393&longitude=80.9231&hourly=temperature_2m,precipitation_probability&forecast_days=16', {
        //   params: {
        //     apiKey: apiKey
        //   }
        });
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();},[])
//   }, [apiKey]);

  return (
    <div className='bg-white'>
      {data ? (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}