import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { event } from "sst/event";

const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.Notes.name,
    Key: {
      user_id: "123",
      note_id: event.pathParameters?.note_id,
    },
  };

  const result = await dynamodb.send(new GetCommand(params));
  if (!result.Item) {
    throw new Error("Item not found");
  }

  return JSON.stringify(result.Item);
});
