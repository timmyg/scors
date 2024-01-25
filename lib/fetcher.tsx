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
  const url = `${getBaseUrl()}/api/scores/${sport}${
    search ? `?search=${search}` : ""
  }`;
  const response = await wretch(url)
    .options({ cache: "no-store" })
    .get()
    .json();
  return (response as any)?.data?.games || [];
};
