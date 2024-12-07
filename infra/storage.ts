export const bucket = new sst.aws.Bucket("Uploads");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Notes", {
  fields: {
    user_id: "string",
    note_id: "string",
  },
  primaryIndex: { hashKey: "user_id", rangeKey: "note_id" },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");
