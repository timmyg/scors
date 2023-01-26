import TimeAgo from "@/atoms/TimeAgo";

interface Props {
  timestamp: string;
}

export const LastUpdated = (props: Props) => {
  return (
    <p className="px-4 text-sm">
      updated <TimeAgo timestamp={props?.timestamp} />
    </p>
  );
};
