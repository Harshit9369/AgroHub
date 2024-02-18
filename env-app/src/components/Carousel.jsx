import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cc624656fefe4e706d0c8b92b26415bf&format=json');
                setData(response.data.records); // Adjust this according to your API response structure
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(()=>{
        setTimeout(()=>{
            nextSlide();
        }, 5000);
        
    },[currentIndex])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
  
  <div className="bg-[#00df9a] text-xl font-bold">
    <div key={currentIndex} className="slide active flex justify-between items-center">
      <p className='m-1 mx-5'>District: {data[currentIndex].district}</p>
      <p className='m-1'>Commodity: {data[currentIndex].commodity}</p>
      <p className='m-1'>Variety: {data[currentIndex].variety}</p>
      <p className='m-1'>Min Price: {data[currentIndex].min_price}</p>
      <p className='m-1 mx-5'>Max Price: {data[currentIndex].max_price}</p>
    </div>
  </div>
</div>
    );
};

export default Carousel;
