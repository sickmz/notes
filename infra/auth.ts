import { api } from "./api";
import { bucket } from "./storage";

const region = aws.getRegionOutput().name;

export const user_pool = new sst.aws.CognitoUserPool("UserPool", {
  usernames: ["email"],
});

export const user_pool_client = user_pool.addClient("UserPoolClient");

export const identityPool = new sst.aws.CognitoIdentityPool("IdentityPool", {
  userPools: [
    {
      userPool: user_pool.id,
      client: user_pool_client.id,
    },
  ],
  permissions: {
    authenticated: [
      {
        actions: ["s3:*"],
        resources: [
          $concat(
            bucket.arn,
            "/private/${cognito-identity.amazonaws.com:sub}/*"
          ),
        ],
      },
      {
        actions: ["execute-api:*"],
        resources: [
          $concat(
            "arn:aws:execute-api:",
            region,
            ":",
            aws.getCallerIdentityOutput({}).accountId,
            ":",
            api.nodes.api.id,
            "/*/*/*"
          ),
        ],
      },
    ],
  },
});
