module.exports = {
    post: {
        tags: ["Rooms"],
        summary: "Make all rooms in a building vacant",
        parameters: [
            {
                name: "buildingId",
                in: "path",
                description: "ID of the building",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
        security: [
            {
                jwt: []
            }
        ],
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/VacantRoomsResponse"
                        }
                    }
                }
            }
        }
    }
}