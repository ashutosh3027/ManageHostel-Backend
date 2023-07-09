module.exports = {
    post: {
        tags: ["Rooms"],
        summary: "Book a room",
        security: [
            {
                jwt: []
            }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            roomNumber: {
                                type: "string",
                                description: "The room number.",
                            },
                            buildingId: {
                                type: "string",
                                description: "The ID of the building.",
                            },
                            userId: {
                                type: "string",
                                description: "The ID of the user.",
                            },
                        },
                        required: ["roomNumber", "buildingId", "userId"],
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
                            $ref: "#/components/schemas/BookRoomResponse"
                        }
                    }
                }
            }
        }
    }
}