/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "notes",
      home: "aws",
      region: "eu-central-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      providers: {
        aws: {
          profile: input.stage === "production" ? "prod" : "dev",
        },
      },
    };
  },
  async run() {
    await import("./infra/storage");
    await import("./infra/api");

    const auth = await import("./infra/auth");

    return {
      UserPool: auth.user_pool.id,
      Region: aws.getRegionOutput().name,
      IdentityPool: auth.identityPool.id,
      UserPoolClient: auth.user_pool_client.id,
    };
  },
});
