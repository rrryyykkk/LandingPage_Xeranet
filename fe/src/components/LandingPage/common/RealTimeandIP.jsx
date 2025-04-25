import axios from "axios";
import React, { useEffect, useState } from "react";

const RealTimeandIP = () => {
  const [time, setTime] = useState("");
  const [ip, setIp] = useState("");

  // Get current time in HH:MM:SS format
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  // Fetch IP once
  const getIp = async () => {
    const response = await axios.get("https://api.ipify.org?format=json");
    setIp(response.data.ip);
  };

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch IP on mount
  useEffect(() => {
    getIp();
  }, []);

  return (
    <div className="flex flex-col items-start gap-8 ">
      <div className="text-5xl">{time}</div>
      <div className="text-lg">IP: {ip ? ip : "Loading..."}</div>
    </div>
  );
};

export default RealTimeandIP;
