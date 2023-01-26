import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface Props {
  timestamp: string;
}

function TimeAgo({ timestamp }: Props) {
  const [timeAgo, setTimeAgo] = useState(
    `${Math.floor(
      ((Date.now() - new Date(timestamp).getTime()) as any) / 1000
    )} seconds ago`
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(
        `${Math.floor(
          (Date.now() - new Date(timestamp).getTime()) / 1000
        )} seconds ago`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
