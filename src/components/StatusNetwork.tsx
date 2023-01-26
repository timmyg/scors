import { useGetNetworkStatus } from "hooks/useGetNetworkStatus";

export const NetworkStatus = () => {
  const { status, isLoading } = useGetNetworkStatus();
  return (
    <div className="px-4 text-sm">
      {isLoading ? `Connection: ${status}` : "..."}
    </div>
  );
};
