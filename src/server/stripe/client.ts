import Stripe from "stripe";
import { env } from "~/env.mjs";

// Only used to verify webhook signatures, which doesn't depend on the API version, so the SDK's
// pinned default version is used.
export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
