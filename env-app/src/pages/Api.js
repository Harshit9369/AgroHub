import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have Axios installed

export default function Api() {
  const [data, setData] = useState(null);
  const apiKey = '579b464db66ec23bdd000001cc624656fefe4e706d0c8b92b26415bf'; // Replace 'YOUR_API_KEY' with your actual API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cc624656fefe4e706d0c8b92b26415bf&format=json', {
        //   params: {
        //     apiKey: apiKey
        //   }
        });
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiKey]);

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
