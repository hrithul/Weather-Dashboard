import { useWeather } from '../../context/WeatherContext';
import { WiHumidity, WiStrongWind, WiDaySunny } from 'react-icons/wi';
import { FaExchangeAlt } from 'react-icons/fa';
import SearchBar from './SearchBar';

// Helper function to process forecast data into daily forecasts
const processForecast = (forecastData) => {
  if (!forecastData || !forecastData.list) return [];
  
  // Group forecast data by day
  const forecastByDay = {};
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
    
    // Skip today
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    if (day === today) return;
    
    if (!forecastByDay[day]) {
      forecastByDay[day] = [];
    }
    
    forecastByDay[day].push(item);
  });
  
  // Process each day's data
  return Object.entries(forecastByDay).slice(0, 6).map(([day, items]) => {
    // Calculate average temperature
    const avgTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;
    
    // Get most common weather condition
    const weatherCounts = {};
    items.forEach(item => {
      const weather = item.weather[0].main;
      weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
    });
    
    let mostCommonWeather = null;
    let maxCount = 0;
    
    Object.entries(weatherCounts).forEach(([weather, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonWeather = weather;
      }
    });
    
    // Get icon from the most common weather condition
    const iconItem = items.find(item => item.weather[0].main === mostCommonWeather);
    const icon = iconItem ? iconItem.weather[0].icon : '';
    const description = iconItem ? iconItem.weather[0].description : '';
    
    return {
      day,
      temp: avgTemp,
      icon,
      description
    };
  });
};

const WeatherCard = () => {
  const { weatherData, forecast, unit, toggleUnit, city } = useWeather();

  if (!weatherData) return null;

  // Extract data from weatherData
  const {
    name,
    main: { temp, humidity, feels_like },
    weather,
    wind,
    sys: { country },
  } = weatherData;

  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  
  // Format temperature
  const formatTemp = (temperature) => {
    return Math.round(temperature);
  };

  // Get current day and date
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfMonth = currentDate.getDate();
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
   <>
      {/* Search Bar at the top */}
      <SearchBar />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="text-2xl font-light tracking-wider mb-1">Weather</div>
        <div className="text-right text-sm opacity-90">
          <div className="font-medium">{name}</div>
          <div>{formattedTime}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-center">
          <img 
            src={iconUrl} 
            alt={weather[0].description} 
            className="w-50 h-50 filter brightness-110 opacity-80"
          />
        </div>

      {/* Weather Label */}
      <div className="flex items-center text-sm mb-5 opacity-80 tracking-widest">
        <WiDaySunny className="text-xl mr-2 text-yellow-300" />
        WEATHER
      </div>
      
      {/* Main Weather Display */}
      <div className="flex items-center justify-start mb-8">
        {/* Temperature Section */}
        <div className="mr-8">
          <div className="text-8xl font-light">
            {formatTemp(temp)}<sup className="text-4xl align-super relative -top-4">°</sup>
          </div>
          <div className="text-lg opacity-90">
            {dayOfWeek} {dayOfMonth}<sup className="text-xs">th</sup>
          </div>
        </div>
        
        {/* Weather Icon */}
        <div className="flex flex-col items-center justify-center">
        <div className="">
          <img 
            src={iconUrl} 
            alt={weather[0].description} 
            className="w-20 h-20 filter brightness-80 opacity-80"
          />
        </div>
        
        {/* Wind Info */}
        <div className="text-md text-center font-light opacity-80">
          <div className="text-center middle">{Math.round(wind.speed)} {unit === 'metric' ? 'ms' : 'mph'} / {Math.round(wind.deg)}°</div>
        </div>
        </div>
      {/* </div> */}

      {/* Forecast Row */}
      {/* <div className="grid grid-cols-6 gap-2 border-t border-white/20 pt-5"> */}
        {forecast && processForecast(forecast).map((day, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center ms-5 border-l ps-5">
            <div className="text-base mb-0">{day.day}</div>
            <div className="text-xl mb-0">
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                alt={day.description}
                className="w-15 h-15 inline-block filter brightness-80"
              />
            </div>
            <div className="text-lg">{Math.round(day.temp)}°</div>
          </div>
        ))}
      {/* </div> */}
      
    </div>
    
    </>
  );
};


export default WeatherCard;
