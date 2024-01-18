import { useGetNetworkStatus } from "hooks/useGetNetworkStatus";

export const NetworkStatus = () => {
  const { status, isLoading } = useGetNetworkStatus();
  return (
    <span style={{ fontSize: "0.875rem" }}>
      {isLoading ? `Connection: ${status}` : "..."}
    </span>
  );
};
