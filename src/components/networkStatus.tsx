import { useEffect, useState } from "react";
import { useNetworkStatus } from "react-adaptive-hooks";

enum NetworkStatusThreshold {
  Offline = "Offline",
  Bad = "Bad",
  Decent = "Decent",
  Great = "Great",
}

export const NetworkStatus = () => {
  const { effectiveConnectionType } = useNetworkStatus();
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<NetworkStatusThreshold>(
    NetworkStatusThreshold.Offline
  );

  useEffect(() => {
    console.log("effectiveConnectionType", effectiveConnectionType);
    switch (effectiveConnectionType) {
      case "slow-2g":
      case "2g":
        setStatus(NetworkStatusThreshold.Bad);
        break;
      case "3g":
        setStatus(NetworkStatusThreshold.Decent);
        break;
      case "4g":
        setStatus(NetworkStatusThreshold.Great);
        break;
      default:
        setStatus(NetworkStatusThreshold.Offline);
        break;
    }
    setIsReady(true);
  }, [effectiveConnectionType]);

  return <div className="status">{isReady ? status : "..."}</div>;
};
