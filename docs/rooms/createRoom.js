module.exports = {
    post: {
        tags: ["Rooms"],
        summary: "Create new room",
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
                            $ref: "#/components/schemas/CreateNewRoomResponse"
                        }
                    }
                }
            }
        }
    }
}