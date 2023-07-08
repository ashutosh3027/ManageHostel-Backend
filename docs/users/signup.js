module.exports = {
    post: {
        tags: ["Users"],
        summary: "User Signup",
        description: "Create a new user account.",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserSignup",
                    },
                },
            },
        },
        responses: {
            201: {
                description: "User signup successful.",
                headers: {
                    SetCookie: {
                        description: "JWT token cookie",
                        schema: {
                            type: "string",
                            example: "jwt=0IjoxNjIyMzEzMjI4LCJleHAiOjE2MjIzMTY4Mjh9.LXKZmJW1mUyoHOsmhYdFni8mcEhON4dPAxAtSKoEqCo; Path=/; HttpOnly; Secure; SameSite=None",
                        },
                    },
                },
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserSignupResponse",
                        },
                    },
                },
            },
            400: {
                description: "Invalid request payload or missing required fields.",
            },
            500: {
                description: "Internal server error.",
            },
        },
    },
}