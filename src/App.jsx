import { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import clear_icon from '../src/assets/clear.png';
import cloud_icon from '../src/assets/cloud.png';
import drizzle_icon from '../src/assets/drizzle.png';
import rain_icon from '../src/assets/rain.png';
import snow_icon from '../src/assets/snow.png';
import axios from 'axios';

const App = () => {
 
   const inputRef = useRef();
   const [weatherData, setWeatherData] = useState(false);

   const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
   }

   const search = async (city) => {
    if(city === ""){
       alert("Enter city name");
       return;
    }
     try{
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

       const response = await fetch(url);
       const data = await response.json();
       if(!response.ok){
         alert(data.message);
         return;
       }
       console.log(data);
       const icon = allIcons[data.weather[0].icon] || clear_icon;
       setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
       })

     } catch (error) {
       setWeatherData(false);
       console.error("Error in fetching weather data");
       
     }
   }

   useEffect(()=>{
    search('dhaka')
   },[])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 to-black text-white'>
      {/* search bar */}
      <div className='flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg'>
        <input
         ref={inputRef} 
         type="text" 
         placeholder='Search'
         className='text-gray-900 flex-1 outline-none px-2'
         onKeyDown={(e) => e.key === 'Enter' && search(inputRef.current.value)}
         />
        <FaSearch onClick={()=>search(inputRef.current.value)} className='text-gray-500 cursor-pointer'/>
      </div>
      {weatherData?<>
      {/* weather icon */}
      <img src={weatherData.icon} alt=""  className='w-20 h-20 mb-4'/>

      {/* temperature and city name */}
      <h1 className='text-4xl font-bold'>{weatherData.temperature}°C</h1>
      <h2 className='text-2xl mt-2 font-semibold'>{weatherData.location}</h2>

      {/* humidity and wind speed */}
       <div className='w-full max-w-md mt-7 flex flex-col md:flex-row items-center justify-between md:items-start'>
         <div className='flex flex-col items-center'>
          <WiHumidity className='text-3xl'/>
          <span className='text-lg font-medium'>{weatherData.humidity} %</span>
          <p className='text-sm'>Humidity</p>
         </div>
         <div className='flex flex-col items-center'>
          <WiStrongWind className='text-3xl'/>
          <span className='text-lg font-medium'>{weatherData.windSpeed} km/h</span>
          <p className='text-sm'>Wind Speed</p>
         </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default App
