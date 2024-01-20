"use client";

import { useGetNetworkStatus } from "hooks/useGetNetworkStatus";

export const NetworkStatus = () => {
  const { status, isLoading } = useGetNetworkStatus();
  return (
    <div
      style={{
        fontSize: "0.875rem",
        textAlign: "center",
        paddingTop: "24px",
        paddingBottom: "12px",
      }}
    >
      {isLoading ? `Connection: ${status}` : "..."}
    </div>
  );
};
