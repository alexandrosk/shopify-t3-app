import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/routers/_app';
import { createContext } from "@/server/context";
import withMiddleware from "@/utils/middleware/withMiddleware";

// export API handler
// @see https://trpc.io/docs/api-handler
const handler = trpcNext.createNextApiHandler({
    router: appRouter,
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            // send to bug reporting
            console.error('Something went wrong', error);
        }
    },

    batching: {
        enabled: true,
    },
});

export default withMiddleware("verifyRequest")(handler);