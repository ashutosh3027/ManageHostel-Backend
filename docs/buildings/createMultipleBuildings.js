module.exports = {
    post: {
        tags: ["Buildings"],
        summary: "Create multiple buildings",
        security: [{ jwt: [] }],
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateMultipleBuildingsResponse"
                        }
                    }
                }
            }
        }
    }
}