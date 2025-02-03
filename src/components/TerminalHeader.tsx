import React, { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { getUserIP, getLocationData, getWeatherData } from "./getlocip";

interface WeatherData {
  location: string;
  description: string;
  temperature: number;
  iconUrl: string;
  lastupdate: string;
  city?: string;
  region?: string;
  ip?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
}

export const ASCII: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const dataFetched = useRef<boolean>(false);

  const showDateTime = useCallback(() => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    setDateTime(formattedDateTime);
  }, []);

  const fetchWeather = useCallback(async () => {
    if (dataFetched.current) return;
    dataFetched.current = true;

    try {
      const ip = await getUserIP();
      const locationData: LocationData | null = await getLocationData(ip);
      
      if (!locationData) {
        console.error("Failed to retrieve location data");
        return;
      }

      const { latitude: lat, longitude: lon, city, region } = locationData;
      const visitorId = getOrCreateVisitorId();

      const localWeather = JSON.parse(
        localStorage.getItem("weatherData") || "null"
      ) as WeatherData | null;

      if (localWeather && isWeatherFresh(localWeather.lastupdate)) {
        setWeatherData(localWeather);
        return;
      }

      if (lat && lon) {
        const freshWeather = await getWeatherData(lat, lon);
        const formattedUpdate = new Date().toLocaleString();
        const completeData: WeatherData = {
          location: freshWeather.location || "Unknown",
          description: freshWeather.description || "No description",
          temperature: freshWeather.temperature || 0,
          iconUrl: freshWeather.iconUrl || "",
          city: city || "Unknown",
          region: region || "Unknown",
          ip,
          lastupdate: formattedUpdate,
        };

        setWeatherData(completeData);
        await saveDataToFirebase(completeData, visitorId);
        localStorage.setItem("weatherData", JSON.stringify(completeData));
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, []);

  useEffect(() => {
    showDateTime();
    fetchWeather();

    const timeIntervalId = setInterval(showDateTime, 1000);
    return () => clearInterval(timeIntervalId);
  }, [showDateTime, fetchWeather]);

  return (
    <div className="rounded-lg p-6 w-full max-w-6xl pl-2 mt-[-45px] pb-1">
      <div className="text-center">
        <p className="text-md font-semibold text-white">
          Local Time: {dateTime}
          {weatherData && (
            <>
              {" || "}
              Weather in {weatherData.location}: {weatherData.description}
              {weatherData.iconUrl && (
                <img
                  src={weatherData.iconUrl}
                  alt="Weather Icon"
                  className="inline w-6 h-6 ml-1"
                />
              )}
              {" || Temp: "}
              {weatherData.temperature}°C
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const saveDataToFirebase = async (data: WeatherData, visitorId: string) => {
  try {
    const now = new Date();
    const formattedTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    await setDoc(doc(db, "visitorData", visitorId), {
      ...data,
      lastupdate: formattedTimestamp,
    }, { merge: true });
  } catch (error) {
    console.error("Error saving data to Firebase:", error);
  }
};

const getOrCreateVisitorId = (): string => {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = `visitor-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
};

const isWeatherFresh = (lastUpdate: string): boolean => {
  const lastUpdateTime = new Date(lastUpdate);
  const currentTime = new Date();
  return currentTime.getTime() - lastUpdateTime.getTime() <= 3600000; // 1 hour
};