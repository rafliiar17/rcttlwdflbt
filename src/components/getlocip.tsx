import { useState, useEffect, useCallback } from "react";

// Define types for the data structures
interface LocationData {
  ip: string;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
}

interface WeatherData {
  location: string;
  description: string;
  temperature: number;
  iconUrl: string;
}

const weatherapi = import.meta.env.VITE_WEATHER_APIKEY;
const ipapikey = import.meta.env.VITE_IPAPI_DATA_KEY2;

export const getUserIP = async (): Promise<string> => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip || "Unknown IP";
    } catch (error) {
        // Return a default value if fetching IP fails
        return "Unknown IP";
    }
};

export const getLocationData = async (ip: string): Promise<LocationData | null> => {
    if (!ip) throw new Error("IP address is undefined or invalid.");
    try {
        const response = await fetch(`https://api.ipdata.co/${ip}?api-key=${ipapikey}`);
        const data = await response.json();

        if (data && data.latitude && data.longitude) {
            return {
                ip,
                latitude: data.latitude,
                longitude: data.longitude,
                city: data.city || "Unknown City",
                region: data.region || "Unknown Region",
                country: data.country_name || "Unknown Country"
            };
        } else {
            return null; // Return null if no valid location data
        }
    } catch (error) {
        return null; // Return null if there is an error fetching location data
    }
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherapi}&units=metric&lang=id`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.weather) {
            return formatWeatherData(data);
        } else {
            return null; // Return null if no valid weather data
        }
    } catch (error) {
        return null; // Return null if there is an error fetching weather data
    }
};

const formatWeatherData = (data: any): WeatherData => {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    return {
        location: `${data.name}, ${data.sys.country}`,
        description: data.weather[0].description,
        temperature: data.main.temp,
        iconUrl
    };
};

// Custom hook to fetch weather
export const useFetchWeather = (): WeatherData | string | null => {
    const [weather, setWeather] = useState<WeatherData | string | null>(null);

    const fetchWeather = useCallback(async () => {
        try {
            const ip = await getUserIP();
            const locationData = await getLocationData(ip);

            if (locationData) {
                const { latitude: lat, longitude: lon } = locationData;
                const weatherData = await getWeatherData(lat, lon);

                if (weatherData) {
                    const completeData = { ...locationData, ...weatherData };
                    setWeather(completeData);
                } else {
                    setWeather("Unable to fetch weather data");
                }
            } else {
                setWeather("Unable to determine location from IP address");
            }
        } catch (error) {
            setWeather("Unable to fetch weather data");
        }
    }, []);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return weather;
};

export default useFetchWeather;
