module.exports = {
    get: {
        tags: ["Rooms"],
        summary: "Get rooms by building ID",
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
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GetRoomsByBuildingIdResponse"
                        }
                    }
                }
            }
        }
    }
}