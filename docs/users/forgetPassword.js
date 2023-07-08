module.exports = {
    post: {
        tags:["Users"],
        summary: "Forgot Password",
        description: "Send password reset token to user's email.",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ForgotPassword",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Password reset token sent successfully.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ForgotPasswordResponse",
                        },
                    },
                },
            },
            404: {
                description: "Email not found.",
            },
            500: {
                description: "Internal server error.",
            },
        },
    },
}