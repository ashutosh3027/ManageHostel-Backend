module.exports = {
    post: {
        tags: ["Users"],
        summary: "User Login",
        description: "Authenticate user and generate JWT token for login.",
        operationId: "login",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserLogin",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "User login successful.",
                headers: {
                    SetCookie: {
                        description: "JWT token cookie",
                        schema: {
                            type: "string",
                            example:"jwt=0IjoxNjIyMzEzMjI4LCJleHAiOjE2MjIzMTY4Mjh9.LXKZmJW1mUyoHOsmhYdFni8mcEhON4dPAxAtSKoEqCo; Path=/; HttpOnly; Secure; SameSite=None",
                        },
                    },
                },
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserLoginResponse",
                        },
                    },
                },
            },
            400: {
                description: "Invalid request payload or missing credentials.",
            },
            401: {
                description: "Unauthorized access.",
            },
            500: {
                description: "Internal server error.",
            },
        },
    }
}