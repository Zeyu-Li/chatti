import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "~/server/db";
import { stripe } from "~/server/stripe/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

const subscription = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  // The library needs to be configured with your account's secret key.
  // Ensure the key is kept out of any version control system you might be using.

  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  const endpointSecret = "whsec_DVArRQjSbA5STsYX0yr7xUDFbl8FbcWh";

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig as string, endpointSecret);
    // Handle the event
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted: any = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        console.log("checkoutSessionCompleted: ", checkoutSessionCompleted);
        // update user's subscription status and associate email with customer

        // expires in 1 month or 1 year depending on plan
        const dateExpires =
          checkoutSessionCompleted.amount_total === 1000
            ? new Date(new Date().setMonth(new Date().getMonth() + 1))
            : new Date(new Date().setFullYear(new Date().getFullYear() + 1));

        // update user from db where email = checkoutSessionCompleted.customer.email
        await prisma.user.update({
          where: {
            email: checkoutSessionCompleted.customer_details.email,
          },
          data: {
            stripeCustomerId: checkoutSessionCompleted.id,
            dateSubscribed: new Date(),
            isSubscribed: true,
            dateExpires: dateExpires,
          },
        });

        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    console.log("err", err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Return a 200 res to acknowledge receipt of the event
  // res.send();
  return res.status(200).json({ received: true });
};
export default subscription;
