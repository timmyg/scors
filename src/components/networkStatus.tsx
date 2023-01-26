import { useGetNetworkStatus } from "hooks/useGetNetworkStatus";

export const NetworkStatus = () => {
  const { status, isLoading } = useGetNetworkStatus();
  return (
    <div className="status">
      {isLoading ? `Connection: ${status} (${status})` : "..."}
    </div>
  );
};
