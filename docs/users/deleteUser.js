module.exports = {
    delete: {
        tags:["Users"],
        summary: "Delete User by ID",
        description: "Delete user by ID.",
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                description: "The ID of the user to delete.",
                schema: {
                    $ref: "#/components/schemas/id",
                },
            },
        ],
        responses: {
            204: {
                description: "User deleted successfully.",
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