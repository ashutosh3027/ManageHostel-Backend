module.exports={
    patch: {
        tags:["Users"],
        summary: "Update User by ID",
        description: "Update user details by ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "The ID of the user to update.",
            schema: {
              $ref: "#/components/schemas/id",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateUserResponse",
                },
              },
            },
          },
          404: {
            description: "User not found.",
                 },
          500: {
            description: "Internal server error.",
          },
        },
      },
}