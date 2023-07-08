module.exports = {
  get: {
    tags: ["Rooms"],
    summary: "Get all rooms",
    security: [
      {
        jwt: []
      }
    ],
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/GetAllRoomsResponse"
            }
          }
        }
      }
    }
  },
}