import { table, secret } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, secret],
      },
      args: {
        auth: { iam: true },
      },
    },
  },
});

// POST requests
api.route("POST /notes", "packages/functions/src/create.main");
api.route("POST /billing", "packages/functions/src/billing.main");

// PUT requests
api.route("PUT /notes/{note_id}", "packages/functions/src/update.main");

// DELETE requests
api.route("DELETE /notes/{note_id}", "packages/functions/src/delete.main");

// GET requests
api.route("GET /notes", "packages/functions/src/list.main");
api.route("GET /notes/{note_id}", "packages/functions/src/get.main");
