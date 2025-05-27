const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-white">
      <div className="w-10 h-10 border-4 border-white/30 rounded-full border-t-white animate-spin mb-4"></div>
      <p className="m-0 text-base">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
