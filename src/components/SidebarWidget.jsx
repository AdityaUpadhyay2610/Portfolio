import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  MapPin,
  Droplets,
  Calendar,
  RefreshCw,
} from "lucide-react";

// WMO weather code to description and icon mapping
function getWeatherDetails(code, isDay) {
  // WMO Code references: https://open-meteo.com/en/docs
  const day = isDay !== 0;

  if (code === 0) {
    return {
      description: "Clear Sky",
      icon: day ? (
        <Sun className="h-5 w-5 text-amber animate-spin-slow" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-400" />
      ),
    };
  }
  if (code === 1 || code === 2 || code === 3) {
    return {
      description: code === 1 ? "Mainly Clear" : code === 2 ? "Partly Cloudy" : "Overcast",
      icon: day ? (
        <CloudSun className="h-5 w-5 text-amber" />
      ) : (
        <CloudMoon className="h-5 w-5 text-blue-300" />
      ),
    };
  }
  if (code === 45 || code === 48) {
    return {
      description: "Foggy",
      icon: <CloudFog className="h-5 w-5 text-mute" />,
    };
  }
  if (code === 51 || code === 53 || code === 55) {
    return {
      description: "Drizzle",
      icon: <CloudDrizzle className="h-5 w-5 text-teal" />,
    };
  }
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) {
    return {
      description: "Rainy",
      icon: <CloudRain className="h-5 w-5 text-teal animate-bounce-slow" />,
    };
  }
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
    return {
      description: "Snowy",
      icon: <CloudSnow className="h-5 w-5 text-sky-200 animate-pulse" />,
    };
  }
  if (code === 95 || code === 96 || code === 99) {
    return {
      description: "Thunderstorm",
      icon: <CloudLightning className="h-5 w-5 text-amber animate-pulse" />,
    };
  }

  // Fallback
  return {
    description: "Cloudy",
    icon: <Cloud className="h-5 w-5 text-mute" />,
  };
}

const CACHE_KEY = "portfolio_weather_data";
const CACHE_TIME_KEY = "portfolio_weather_timestamp";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export default function SidebarWidget() {
  // Clock state
  const [time, setTime] = useState(new Date());

  // Weather state
  const [weather, setWeather] = useState({
    temp: null,
    humidity: null,
    description: "Loading...",
    icon: <Cloud className="h-5 w-5 text-mute animate-pulse" />,
    city: "Detecting...",
    loading: true,
    error: false,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  const fetchWeather = async (force = false) => {
    setIsRefreshing(true);
    try {
      // 1. Check local storage cache
      if (!force) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp, 10);
          if (age < CACHE_DURATION) {
            const parsed = JSON.parse(cachedData);
            const details = getWeatherDetails(parsed.code, parsed.isDay);
            setWeather({
              temp: parsed.temp,
              humidity: parsed.humidity,
              description: details.description,
              icon: details.icon,
              city: parsed.city,
              loading: false,
              error: false,
            });
            setIsRefreshing(false);
            return;
          }
        }
      }

      // 2. Detect location using a free IP geolocation API
      let lat = 28.6139; // Default (New Delhi)
      let lon = 77.2090;
      let detectedCity = "New Delhi";

      try {
        const geoResponse = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          if (geoData.latitude && geoData.longitude) {
            lat = geoData.latitude;
            lon = geoData.longitude;
            detectedCity = geoData.city || "My Location";
          }
        }
      } catch (geoErr) {
        console.warn("Location detection failed, using fallback:", geoErr);
        // Fallback to browser geolocation as a secondary backup
        if (navigator.geolocation) {
          const getPosition = () =>
            new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
            });
          try {
            const pos = await getPosition();
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            detectedCity = "My Location";
          } catch (posErr) {
            console.warn("Browser geolocation failed:", posErr);
          }
        }
      }

      // 3. Fetch weather from Open-Meteo
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code`;
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
        throw new Error("Weather request failed");
      }

      const weatherData = await weatherResponse.json();
      const current = weatherData.current;

      const tempVal = Math.round(current.temperature_2m);
      const humidityVal = current.relative_humidity_2m;
      const wCode = current.weather_code;
      const isDay = current.is_day;

      const details = getWeatherDetails(wCode, isDay);

      // Save to cache
      const cacheObject = {
        temp: tempVal,
        humidity: humidityVal,
        code: wCode,
        isDay: isDay,
        city: detectedCity,
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

      setWeather({
        temp: tempVal,
        humidity: humidityVal,
        description: details.description,
        icon: details.icon,
        city: detectedCity,
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Fallback: If cache exists, use it even if stale
      const oldCache = localStorage.getItem(CACHE_KEY);
      if (oldCache) {
        const parsed = JSON.parse(oldCache);
        const details = getWeatherDetails(parsed.code, parsed.isDay);
        setWeather({
          temp: parsed.temp,
          humidity: parsed.humidity,
          description: details.description,
          icon: details.icon,
          city: parsed.city,
          loading: false,
          error: false,
        });
      } else {
        setWeather((prev) => ({
          ...prev,
          loading: false,
          error: true,
          description: "Weather Unavailable",
          icon: <Cloud className="h-5 w-5 text-mute" />,
          city: "Network Error",
        }));
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Format time components
  const hours = time.getHours();
  const rawMinutes = time.getMinutes();
  const rawSeconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const minutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes;
  const seconds = rawSeconds < 10 ? `0${rawSeconds}` : rawSeconds;

  // Format date: "Friday, Jul 24"
  const weekdayName = time.toLocaleDateString("en-US", { weekday: "short" });
  const monthName = time.toLocaleDateString("en-US", { month: "short" });
  const dayOfMonth = time.getDate();

  return (
    <div className="mx-6 md:mx-0 lg:mx-8 mb-6 mt-4 p-4 rounded-2xl border border-line bg-panel2/35 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-amber/40 hover:bg-panel2/50 group select-none">
      {/* Clock section */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold tracking-tight text-paper">
            {displayHours}:{minutes}
          </span>
          <span className="font-mono text-[11px] text-mute font-medium w-4">
            {seconds}
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase text-amber tracking-wider ml-1 bg-amber/10 px-1.5 py-0.5 rounded">
            {ampm}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-mute">
          <Calendar size={12} className="text-amber/80" />
          <span>{weekdayName}, {monthName} {dayOfMonth}</span>
        </div>
      </div>

      {/* Weather section */}
      <div className="flex items-center justify-between border-t border-line/30 pt-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-panel/70 border border-line/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
            {weather.icon}
          </div>
          <div className="flex flex-col leading-none">
            {weather.loading ? (
              <span className="h-3 w-16 bg-line/20 rounded animate-pulse mb-1" />
            ) : (
              <span className="font-display font-medium text-xs text-paper">
                {weather.temp !== null ? `${weather.temp}°C` : "--°C"}
              </span>
            )}
            <span className="text-[10px] text-mute font-medium">
              {weather.description}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end leading-none">
          <div className="flex items-center gap-1 max-w-[90px]">
            <MapPin size={10} className="text-amber shrink-0" />
            <span className="text-[10px] text-paper font-mono font-medium truncate" title={weather.city}>
              {weather.city}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            {weather.humidity !== null && (
              <div className="flex items-center gap-0.5 text-[9px] text-mute font-mono">
                <Droplets size={8} className="text-teal" />
                <span>{weather.humidity}%</span>
              </div>
            )}
            <button
              onClick={() => fetchWeather(true)}
              disabled={isRefreshing}
              aria-label="Refresh Weather"
              className={`p-1 rounded-md text-mute hover:text-amber hover:bg-panel/50 border border-transparent hover:border-line/20 transition-all duration-200 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            >
              <RefreshCw size={9} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
