module.exports = {
    get: {
        tags:["Users"],
        summary: "Get User by ID",
        description: "Get user details by ID.",
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                description: "The ID of the user to retrieve.",
                schema: {
                    $ref: "#/components/schemas/id",
                },
            },
        ],
        responses: {
            200: {
                description: "User retrieved successfully.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GetUserByIdResponse",
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