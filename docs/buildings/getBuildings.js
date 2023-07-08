module.exports = {
    get: {
        tags: ["Buildings"],
        summary: "Get all buildings",
        security: [{ jwt: [] }],
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GetAllBuildingsResponse"
                        }
                    }
                }
            }
        }
    }
}