module.exports = {
    components: {
        schemas: {
            id: {
                type: "string",
                description: "An id of a model",
                example: "64724a6542da269ab8f62058",
            },
            User: {
                type: "object",
                properties: {
                    _id: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the user.",
                    },
                    name: {
                        type: "string",
                        description: "The name of the user.",
                        example: "John Doe",
                    },
                    email: {
                        type: "string",
                        format: "email",
                        description: "The email address of the user.",
                        example: "johndoe@example.com",
                    },
                    role: {
                        type: "string",
                        enum: ["student", "admin"],
                        default: "student",
                        description: "The role of the user.",
                    },
                    isRoomAlloted: {
                        type: "boolean",
                        default: false,
                        description: "Indicates if a room is allocated to the user.",
                    },
                    RoomNumber: {
                        type: "string",
                        description: "The room number allocated to the user.",
                        example: "101",
                        nullable: true,
                    },
                    collegeId: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the college the user belongs to.",
                    },
                    buildingId: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the building the user is associated with.",
                    },
                },
                required: ["name", "email"],
            },
            Room: {
                type: "object",
                properties: {
                    _id: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the room.",
                    },
                    roomNumber: {
                        type: "string",
                        description: "The room number.",
                        example: "101",
                    },
                    isAllocated: {
                        type: "boolean",
                        default: false,
                        description: "Indicates if the room is allocated to a user.",
                    },
                    allocatedTo: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the user to whom the room is allocated.",
                    },
                    allocatedAt: {
                        type: "string",
                        format: "date-time",
                        description: "The date and time when the room was allocated.",
                    },
                    buildingId: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the building to which the room belongs.",
                    },
                },
                required: ["roomNumber"],
            },
            College: {
                type: "object",
                properties: {
                    _id: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the college.",
                    },
                    collegeName: {
                        type: "string",
                        description: "The name of the college.",
                    },
                },
                required: ["collegeName"],
            },
            Building: {
                type: "object",
                properties: {
                    _id: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the building.",
                    },
                    buildingName: {
                        type: "string",
                        description: "The name of the building.",
                    },
                    collegeId: {
                        $ref: "#/components/schemas/id",
                        description: "The unique identifier of the college to which the building belongs.",
                    },
                },
                required: ["buildingName", "collegeId"],
            },
            UserLogin: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        description: "The email address of the user.",
                        example: "johndoe@example.com"
                    },
                    password: {
                        type: "string",
                        description: "The password of the user."
                    }
                },
                required: ["email", "password"]
            },
            UserLoginResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    token: {
                        type: "string",
                        description: "The JWT token for authentication."
                    },
                    user: {
                        $ref: "#/components/schemas/User",
                        description: "The user information."
                    }
                }
            },
            UserSignup: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "The name of the user.",
                        example: "John Doe"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        description: "The email address of the user.",
                        example: "johndoe@example.com"
                    },
                    password: {
                        type: "string",
                        description: "The password of the user."
                    },
                    passwordConfirm: {
                        type: "string",
                        description: "The confirmation password of the user."
                    }
                },
                required: ["name", "email", "password", "passwordConfirm"]
            },
            UserSignupResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    token: {
                        type: "string",
                        description: "The JWT token for authentication."
                    },
                    user: {
                        $ref: "#/components/schemas/User",
                        description: "The user information."
                    }
                }
            },
            UserProfileResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    user: {
                        $ref: "#/components/schemas/User",
                        description: "The user information."
                    }
                }
            },
            ForgotPassword: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        description: "The email address of the user.",
                        example: "johndoe@example.com"
                    }
                },
                required: ["email"]
            },
            ForgotPasswordResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    message: {
                        type: "string",
                        description: "The message indicating the result of the forgot password request."
                    }
                }
            },
            ResetPassword: {
                type: "object",
                properties: {
                    password: {
                        type: "string",
                        description: "The new password for the user."
                    },
                    passwordConfirm: {
                        type: "string",
                        description: "Confirmation of the new password."
                    }
                },
                required: ["password", "passwordConfirm"]
            },
            ResetPasswordResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    message: {
                        type: "string",
                        description: "The message indicating the result of the reset password request."
                    }
                }
            },
            UpdatePassword: {
                type: "object",
                properties: {
                    currentPassword: {
                        type: "string",
                        description: "The current password of the user."
                    },
                    newPassword: {
                        type: "string",
                        description: "The new password for the user."
                    },
                    newPasswordConfirm: {
                        type: "string",
                        description: "Confirmation of the new password."
                    }
                },
                required: ["currentPassword", "newPassword", "newPasswordConfirm"]
            },
            GetAllUsersResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    results: {
                        type: "integer",
                        description: "The number of users returned in the response."
                    },
                    data: {
                        type: "object",
                        properties: {
                            users: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/User"
                                },
                                description: "The array of user objects."
                            }
                        }
                    }
                }
            },
            GetUserByIdResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    user: {
                        $ref: "#/components/schemas/User",
                        description: "The user object."
                    }
                }
            },
            UpdateUserResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    user: {
                        $ref: "#/components/schemas/User",
                        description: "The updated user object."
                    }
                }
            },
            GetAllRoomsResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    results: {
                        type: "integer",
                        description: "The number of rooms returned in the response."
                    },
                    data: {
                        type: "object",
                        properties: {
                            rooms: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Room"
                                },
                                description: "An array of room objects."
                            }
                        }
                    }
                }
            },
            CreateNewRoomResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        $ref: "#/components/schemas/Room",
                        description: "The newly created room object."
                    }
                }
            },
            GetRoomByIdResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    room: {
                        $ref: "#/components/schemas/Room",
                        description: "The room object."
                    }
                }
            },
            UpdateRoomResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    room: {
                        $ref: "#/components/schemas/Room",
                        description: "The updated room object."
                    }
                }
            },
            DeleteRoomResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    message: {
                        type: "string",
                        description: "A message indicating the success of the deletion.",
                        example: "Room deleted successfully."
                    }
                }
            },
            GetRoomsByBuildingIdResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    results: {
                        type: "integer",
                        description: "The number of rooms returned in the response."
                    },
                    data: {
                        type: "object",
                        properties: {
                            rooms: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Room"
                                },
                                description: "An array of room objects."
                            }
                        }
                    }
                }
            },
            BookRoomResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        type: "object",
                        properties: {
                            booking: {
                                $ref: "#/components/schemas/Booking",
                                description: "The booking object for the room."
                            }
                        }
                    }
                }
            },
            VacantRoomResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        type: "object",
                        properties: {
                            room: {
                                $ref: "#/components/schemas/Room",
                                description: "The vacant room object."
                            }
                        }
                    }
                }
            },
            VacantRoomsResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        type: "object",
                        properties: {
                            rooms: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Room"
                                },
                                description: "An array of vacant room objects."
                            }
                        }
                    }
                }
            },
            CreateBuildingResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        $ref: "#/components/schemas/Building",
                        description: "The newly created building object."
                    }
                }
            },
            CreateMultipleBuildingsResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Building"
                        },
                        description: "An array of newly created building objects."
                    }
                }
            },
            GetAllBuildingsResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    results: {
                        type: "integer",
                        description: "The number of buildings returned in the response."
                    },
                    data: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Building"
                        },
                        description: "An array of building objects."
                    }
                }
            },
            GetBuildingByIdResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        $ref: "#/components/schemas/Building",
                        description: "The building object."
                    }
                }
            },
            CreateCollegeResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                    },
                    data: {
                        $ref: "#/components/schemas/College",
                        description: "The newly created college object."
                    }
                }
            },
            // error model
            Error: {
                type: "object", //data type
                properties: {
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Not found", // example of an error message
                    },
                    statusCode: {
                        type: "number", // data type
                        description: "Error internal code", // desc
                        example: 500, // example of an error internal code
                    },
                    status: {
                        type: "string",
                        description: "error status",
                        example: "error",
                    },
                },
            },
        },


        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
            CookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "jwt",
            },
        },
    },
};
