# Weather Dashboard

A modern, responsive weather dashboard built with React and Vite that provides real-time weather information and forecasts for City. This application showcases the use of Tailwind CSS for styling, React Context for state management, and the OpenWeatherMap API for real-time weather data.

## Features

- **Current Weather Display**: Shows temperature, wind speed, and weather conditions
- **Weather Icons**: Dynamic weather icons that represent current conditions
- **5-Day Forecast**: Displays a 5-day weather forecast
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Real-time Updates**: Auto-refreshes weather data every 30 seconds
- **Error Handling**: User-friendly error messages for failed API requests
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Modern UI**: Clean, gradient-based interface with Tailwind CSS and refined visual elements

## Technology Stack

- **React.js**: Frontend library for building the user interface
- **Vite**: Build tool and development server
- **Context API**: For global state management
- **Tailwind CSS**: For utility-first styling approach
- **React Icons**: For weather and UI icons
- **Axios**: For making API requests
- **OpenWeatherMap API**: For fetching weather data

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:5173

## API Configuration

This application uses the OpenWeatherMap API. The API key is stored in the `.env` file as an environment variable:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

If you need to use your own API key, simply replace the value in the .env file. The application accesses this value through Vite's environment variable system using `import.meta.env.VITE_OPENWEATHER_API_KEY`.

## Project Structure

```
src/
├── components/
│   ├── Error/
│   │   └── ErrorMessage.jsx    # Error display component
│   └── Weather/
│       ├── LoadingSpinner.jsx  # Loading indicator
│       └── WeatherCard.jsx     # Current weather component with forecast
├── context/
│   └── WeatherContext.jsx      # Global state management
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles with Tailwind directives
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration for Tailwind
```

## UI Design

The application features a modern, clean interface with several thoughtful design elements:

- **Gradient Background**: A beautiful gradient from dark blue to light teal creates a calming atmosphere
- **Weather Icons**: Icons with adjusted brightness and opacity for a more refined look
- **Typography**: Clean, readable text hierarchy with the Poppins font family
- **Layout**: Intuitive layout that showcases current weather and forecast information
- **Visual Refinements**: Subtle design touches like opacity adjustments and brightness filtering

## Features Implemented

- [x] React functional components with hooks
- [x] Tailwind CSS for utility-first styling
- [x] City-focused weather display
- [x] Weather details (temperature, wind speed, conditions)
- [x] Weather icons from OpenWeatherMap with visual refinements
- [x] API polling every 30 seconds for real-time updates
- [x] Error handling for API requests
- [x] Modern UI with gradient background and thoughtful design elements
- [x] Component structure using Tailwind classes
- [x] Context API for state management
- [x] 5-day weather forecast embedded in main weather card
- [x] Temperature unit toggle (Celsius/Fahrenheit)
- [x] Environment variables for secure API key management

## License

This project is open source and available under the MIT License.
