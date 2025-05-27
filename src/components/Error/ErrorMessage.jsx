import { FaExclamationTriangle } from 'react-icons/fa';
import { useWeather } from '../../context/WeatherContext';

const ErrorMessage = () => {
  const { error } = useWeather();
  
  if (!error) return null;
  
  return (
    <div className="flex items-center bg-red-500/10 rounded-lg py-4 px-5 my-5 mx-auto max-w-lg border-l-4 border-red-500 backdrop-blur-md">
      <div className="text-red-500 text-2xl mr-4 flex items-center">
        <FaExclamationTriangle />
      </div>
      <p className="text-white m-0 text-base">{error}</p>
    </div>
  );
};

export default ErrorMessage;
