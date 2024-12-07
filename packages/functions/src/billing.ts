import Stripe from "stripe";
import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { Billing } from "@notes/core/billing";

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = Billing.compute(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: "2024-11-20.acacia",
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "eur",
  });

  return JSON.stringify({ status: true });
});
