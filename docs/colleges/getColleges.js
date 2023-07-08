module.exports = {
    get: {
        tags: ["Colleges"],
        summary: "Get all colleges",
        security: [
            {
                jwt: [],
            },
        ],
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
                                    description: "An array of college objects.",
                                },
                            },
                        },
                    },
                },
            },
        },
    }
}