module.exports = {
    post: {
        tags: ["Colleges"],
        summary: "Create multiple colleges",
        security: [
            {
                jwt: [],
            },
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/College",
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    description: "The status of the response.",
                                    example: "success",
                                },
                                data: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/College",
                                    },
                                    description: "An array of newly created college objects.",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}