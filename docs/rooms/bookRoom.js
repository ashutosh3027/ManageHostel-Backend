module.exports = {
    post: {
        tags: ["Rooms"],
        summary: "Book a room",
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
                            $ref: "#/components/schemas/BookRoomResponse"
                        }
                    }
                }
            }
        }
    }
}