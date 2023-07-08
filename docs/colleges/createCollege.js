module.exports = {
    post: {
        tags: ["Colleges"],
        summary: "Create a new college",
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
                        $ref: "#/components/schemas/College",
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
                            $ref: "#/components/schemas/CreateCollegeResponse",
                        },
                    },
                },
            },
        },
    },
}