module.exports={
    get: {
        tags:["Users"],
        summary: "Get All Users",
        description: "Get a list of all users.",
        responses: {
          200: {
            description: "Users retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GetAllUsersResponse",
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
          },
        },
      },
}