module.exports = {
    patch: {
        tags: ["Rooms"],
        summary: "Update room",
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID of the room",
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
                            $ref: "#/components/schemas/UpdateRoomResponse"
                        }
                    }
                }
            }
        }
    },
}