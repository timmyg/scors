"use client";

import { useEffect, useState } from "react";

export enum NetworkStatusThreshold {
  Offline = "Offline",
  Online = "Online",
}

type NetworkStatusResponse = {
  status: NetworkStatusThreshold;
  isLoading: boolean;
};

const getOnlineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

export const useGetNetworkStatus = (): NetworkStatusResponse => {
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<NetworkStatusThreshold>(
    getOnlineStatus()
      ? NetworkStatusThreshold.Online
      : NetworkStatusThreshold.Offline
  );

  const setOnline = () => setStatus(NetworkStatusThreshold.Online);
  const setOffline = () => setStatus(NetworkStatusThreshold.Offline);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    setIsReady(true);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return { status, isLoading: isReady };
};
