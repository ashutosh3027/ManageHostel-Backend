module.exports = {
    post: {
        tags: ["Rooms"],
        summary: "Make a room vacant",
        parameters: [
            {
                name: "roomId",
                in: "path",
                description: "ID of the room",
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
                            $ref: "#/components/schemas/VacantRoomResponse"
                        }
                    }
                }
            }
        }
    }
}