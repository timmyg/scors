import TimeAgo from "./TimeAgo";

interface Props {
  timestamp: string;
}

export const LastUpdated = (props: Props) => {
  return (
    <span style={{ padding: "1rem", fontSize: "0.875rem" }}>
      updated <TimeAgo timestamp={props?.timestamp} />
    </span>
  );
};
