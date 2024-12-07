import { table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  // By "transform" we want the given props to be applied to all the routes in our API.
  transform: {
    route: {
      handler: {
        link: [table],
      },
    },
  },
});

api.route("POST /notes", "packages/functions/src/create.main");
api.route("PUT /notes/{note_id}", "packages/functions/src/update.main");
api.route("DELETE /notes/{note_id}", "packages/functions/src/delete.main");
api.route("GET /notes", "packages/functions/src/list.main");
api.route("GET /notes/{note_id}", "packages/functions/src/get.main");
