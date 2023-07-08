module.exports = {
    post: {
        tags: ["Buildings"],
        summary: "Create a new building",
        security: [{ jwt: [] }],
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateBuildingResponse"
                        }
                    }
                }
            }
        }
    }
}