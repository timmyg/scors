import { useGetNetworkStatus } from "hooks/useGetNetworkStatus";

export const NetworkStatus = () => {
  const { status, isLoading } = useGetNetworkStatus();
  return (
    <div className="text-sm">{isLoading ? `Connection: ${status}` : "..."}</div>
  );
};
