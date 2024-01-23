import wretch from "wretch";

const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:4141`;
};

export const fetcher = async ({
  sport,
  search,
}: {
  sport: string;
  search?: string;
}) => {
  // console.log({ baseUrl: getBaseUrl() });
  const response = await wretch(`${getBaseUrl()}/api/scores/${sport}`)
    .options({ cache: "no-store" })
    .get()
    .json();
  return (response as any)?.data?.games || [];
};
