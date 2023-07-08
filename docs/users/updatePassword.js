module.exports = {
    patch: {
        tags:["Users"],
        summary: "Update Password",
        description: "Update the password of the authenticated user.",
        security: [
            {
                bearerAuth: [],
            },
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UpdatePassword",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Password updated successfully.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    description: "The status of the response.",
                                    example: "success"
                                },
                                message: {
                                    type: "string",
                                    description: "The message indicating the result of the update password request."
                                }
                            }
                        },
                    },
                },
            },
            400: {
                description: "Invalid request payload or incorrect current password.",
            },
            401: {
                description: "Unauthorized access.",
            },
            500: {
                description: "Internal server error.",
            },
        },
    },
}