import { TRPCError, initTRPC } from '@trpc/server';
import superjson from "superjson";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
// Base router and procedure helpers
import { Context } from "./context";
export const t = initTRPC.create({ transformer: superjson });
export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;


