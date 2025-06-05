import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
} as QueryClientConfig);
