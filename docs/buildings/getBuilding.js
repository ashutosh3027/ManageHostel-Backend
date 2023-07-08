module.exports = {
    get: {
        tags: ["Buildings"],
        summary: "Get a building by ID",
        security: [{ jwt: [] }],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "Building ID",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GetBuildingByIdResponse"
                        }
                    }
                }
            }
        }
    }
}