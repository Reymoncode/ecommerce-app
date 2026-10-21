import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,                    // retry a failed request once
      refetchOnWindowFocus: false, // don't refetch every time you switch tabs
      staleTime: 60 * 1000,        // data counts as fresh for 1 minute
    },
  },
});