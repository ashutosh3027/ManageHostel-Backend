module.exports={
    patch: {
        tags:["Users"],
        summary: "Reset Password",
        description: "Reset user's password using the reset token.",
        parameters: [
          {
            in: "path",
            name: "token",
            required: true,
            description: "The password reset token.",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResetPassword",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password reset successful.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ResetPasswordResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid password reset token.",
          },
          500: {
            description: "Internal server error.",
          },
        },
      },
}