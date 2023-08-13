import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const subscriptionwebhook = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // server.js
  //
  // Use this sample code to handle webhook events in your integration.
  //
  // 1) Paste this code into a new file (server.js)
  //
  // 2) Install dependencies
  //   npm install stripe
  //   npm install express
  //
  // 3) Run the server on http://localhost:4242
  //   node server.js

  // The library needs to be configured with your account's secret key.
  // Ensure the key is kept out of any version control system you might be using.
  const stripe = require("stripe")("sk_test_...");

  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  const endpointSecret =
    "whsec_980bd593e2b52428d577a3d6085e2ec74a7dd4669e83074ae1cd92e585d8cb56";

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

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
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 res to acknowledge receipt of the event
  // res.send();
  console.log("subscription webhook!");
  console.log(event?.data?.object);
};
export default subscriptionwebhook;
