import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from 'react';

import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import superjson from 'superjson';
import { trpc } from '@/utils/trpc';
import useFetch from "@/components/hooks/useFetch";

export default function TrpcProvider({ children }: { children: ReactNode }) {
    const fetchFunction = useFetch();
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                // adds pretty logs to your console in development and logs errors in production
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' && opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `/api/trpc`,
                    fetch: fetchFunction,
                }),
            ],
            transformer: superjson,
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
}