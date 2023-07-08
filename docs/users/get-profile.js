module.exports = {
    get: {
        tags:["Users"],
        summary: "User Profile",
        description: "Get the profile of the authenticated user.",
        security: [
            {
                bearerAuth: [],
            },
        ],
        responses: {
            200: {
                description: "User profile retrieved successfully.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserProfileResponse",
                        },
                    },
                },
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