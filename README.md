# Weather Dashboard

A modern, responsive weather dashboard built with React and Vite that provides real-time weather information and forecasts for any city. This application showcases the use of Tailwind CSS for styling, React Context for state management, React Query for data fetching, Supabase for authentication and user data storage, and the OpenWeatherMap API for real-time weather data.

## Features

- **Current Weather Display**: Shows temperature, wind speed, and weather conditions
- **Weather Icons**: Dynamic weather icons that represent current conditions
- **5-Day Forecast**: Displays a 5-day weather forecast
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit with persistent preferences
- **City Search**: Search for weather information for any city worldwide
- **User Authentication**: Sign up and login functionality using Supabase
- **Favorite Cities**: Save and manage favorite cities (requires login)
- **Local Storage**: Remember last searched city and unit preference
- **Real-time Updates**: Auto-refreshes weather data every 30 seconds
- **Error Handling**: User-friendly error messages for failed API requests
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Modern UI**: Clean, gradient-based interface with Tailwind CSS and refined visual elements

## Technology Stack

- **React.js**: Frontend library for building the user interface
- **Vite**: Build tool and development server
- **Context API**: For global state management
- **React Query**: For data fetching, caching, and state management
- **Supabase**: For authentication and database storage
- **Tailwind CSS**: For utility-first styling approach
- **React Icons**: For weather and UI icons
- **Axios**: For making API requests
- **OpenWeatherMap API**: For fetching weather data
- **LocalStorage API**: For persisting user preferences

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Supabase account (for authentication and database)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Set up your Supabase project:
   - Create a new project in Supabase
   - Set up authentication (Email auth enabled by default)
   - Create a `favorite_cities` table with the following schema:
     - `id`: uuid, primary key, default: uuid_generate_v4()
     - `user_id`: uuid, references auth.users.id
     - `city_name`: text, not null
     - `created_at`: timestamp with time zone, default: now()
   - Set up Row Level Security (RLS) policies to ensure users can only access their own data
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to http://localhost:5173

## API Configuration

This application uses the OpenWeatherMap API and Supabase. The API keys are stored in the `.env` file as environment variables:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If you need to use your own API keys, simply replace the values in the .env file. The application accesses these values through Vite's environment variable system.

## UI Design

The application features a modern, clean interface with several thoughtful design elements:

- **Gradient Background**: A beautiful gradient from dark blue to light teal creates a calming atmosphere
- **Weather Icons**: Icons with adjusted brightness and opacity for a more refined look
- **Typography**: Clean, readable text hierarchy with the Poppins font family
- **Layout**: Intuitive layout that showcases current weather and forecast information
- **Visual Refinements**: Subtle design touches like opacity adjustments and brightness filtering
- **Authentication UI**: Clean, minimalist login and signup forms
- **User Profile**: User-friendly interface for managing account and favorites
- **Search Component**: Intuitive search bar with unit toggle button

## Features Implemented

- [x] React functional components with hooks
- [x] Tailwind CSS for utility-first styling
- [x] City search functionality
- [x] Weather details (temperature, wind speed, conditions)
- [x] Weather icons from OpenWeatherMap with visual refinements
- [x] React Query for data fetching, caching, and state management
- [x] API polling every 30 seconds for real-time updates
- [x] Error handling for API requests
- [x] Modern UI with gradient background and thoughtful design elements
- [x] Component structure using Tailwind classes
- [x] Context API for state management
- [x] 5-day weather forecast embedded in main weather card
- [x] Temperature unit toggle (Celsius/Fahrenheit) with persistent preference
- [x] Local storage for saving user preferences and last searched city
- [x] Supabase authentication (signup, login, logout)
- [x] User profile management
- [x] Favorite cities management with database storage
- [x] Environment variables for secure API key management

## Application Flow

1. **Initial Load**:
   - App checks localStorage for the last searched city and unit preference
   - If found, it loads weather data for that city with the saved unit
   - If not found, it defaults to 'Bangalore' and metric units

2. **Authentication**:
   - Users can sign up or log in using the AuthForm component
   - Authentication state is managed by AuthContext using Supabase
   - Logged-in users can view their profile and manage favorite cities

3. **Weather Data Flow**:
   - Weather data is fetched using React Query for efficient caching
   - Data is automatically refreshed every 30 seconds
   - Users can search for new cities using the SearchBar component
   - Temperature unit can be toggled between Celsius and Fahrenheit

4. **Favorites Management**:
   - Logged-in users can save cities to their favorites
   - Favorites are stored in Supabase database
   - Users can view and delete their favorite cities from the profile

## License

This project is open source and available under the MIT License.
