# ManageHostel Backend

This repo is the backend of the ManageHostel project. It provides various APIs to the client.

## Tech Stack

- [NodeJs](https://nodejs.org/en/about/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/introduction)

# Getting Started

## Set up in Your local system

1. You must have git, nodejs and mongoDB installed in your local system.
2. Run MongoDB on PORT 27017.
3. Fork this repo and then clone the forked repo.
   ```sh
   git clone 'YOUR REPO LINK'
   ```
4. install dependencies and run the server
   ```sh
   npm install
   npm start
   ```
   This will make the server run at `http://localhost:8000/`


## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

### ./config.env

`PORT`

`NODE_ENV`

`DATABASE`

`DATABASE_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`JWT_COOKIE_EXPIRES_IN`

`EMAIL_USERNAME`

`EMAIL_PASSWORD`

`EMAIL_HOST`

`EMAIL_PORT`

## Database Schema

### User Schema

| Field    | Data Type | Required | Default |
| -------- | --------- | -------- | ------- |
| name     | String    | true     |    -    |
| email    | String    | true     |    -    |
| role     | String    | false    | student |
| isRoomAlloted| Boolean | false  | false   |
| RoomNumber | String  | false    |    -    |

### Room Schema

|    Field    | Data Type | Required  |
|    ------   | --------- | --------  |
| allocatedTo | ObjectId  |   true    |
| roomNumber  | String    |   true    |
| allcoatedBy | String    |   --      |

### Request Schema

|    Field    | Data Type | Required  |
|    ------   | --------- | --------  |
|    user     | ObjectId  |   true    |
|    room     | ObjectId  |   true    |
| requestedAt | Date      |   false   |
|requestStatus| Boolean   |   false   |

## APIs

| Routes | parameters | body | Description |
| -------- | -------- | -------- | -------- |
| `GET` /api/v1/users/profile/ | id | - | Retrieves the data of the logged in user |
| `POST` /api/v1/users/signup/ | | email, passwordConfirm, password, name| Registers a user by taking name, email, password and passwordConfirm as input |
| `POST` /api/v1/users/login/ | | email, password | Take the email and password as input and returns the token if the credentials are valid |
| `POST` /api/v1/users/updateMyPassword/ |  |passwordConfirm, newPassword, newPasswordConfirm  | Verify and update the password of the user |
| `patch` /api/v1/users/ | id | | Verify and update the data of the user (not implemented yet) |
| `DELETE` /api/v1/users/ | id | | Verify and delete the data of the user(not implemented yet) |
| `GET` /api/v1/users/ | id | | Get user by given id |
| `POST` /api/v1/users/forgotPassword/ | | email | For sending password updation link using email. |
| `patch`  /api/v1/users/resetPassword/ | token | | verify the token and user after then reset the password |


### Get Method

- Home Page `("/")`
- Get Profile `("/profile")` Fetches the profile of a user.

### Post Method

- Register `("/signup")` : Registers the user and adds the data to mongoDB.
- Login `("/login")` : logins the user after verifying email and password.

## Access Tokens
For each login, a user session is created using an access token. The access token is a JWT (JSON Web Token) with a expiration time of 7 days. For each request to a protected route, the client-side sends an access token to verify the user identity.
- Verify access token  : verify the existing access token, by sending it in the authorization header as
```
headers: {
   "Authorization":"Bearer <YOUR_ACCESS_TOKEN>",
} 
```

## Authentication
When a user is logged in or registered a 256 byte token is sent to access any methods in the api the token has to be sent in the x-access-headers while sending the request