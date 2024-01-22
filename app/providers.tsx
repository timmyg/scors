// app/providers.jsx

"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import PostHogPageView from "./PostHogPageview";

const posthogKey =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  "phc_EEKOBDG7mtbAJV4kuv1uigqrcaku9pqsCJT4Y0ugMUK";

if (typeof window !== "undefined") {
  posthog.init(posthogKey, {
    // api_host: 'https://app.posthog.com',
  });
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView />
      <ThemeProvider>{children}</ThemeProvider>
    </PostHogProvider>
  );
}
