# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Project Description

The WTWR project helps user decide what to wear based on weather conditions

## Functionality

- ** Weather-Based Recommendations**: The server processes weather data and provides clothing recommendations to users.
- ** Database Management**: User data and clothing items are stored in MongoDB database.
- ** API Endppoints**: Provides endpoints for user actions such as adding, updating, and deleting clothing items, and retrieving recommendations.
- ** Testing and Deployment**: Includes testing for various functionalities and deployment configurations for remote servers.

## Production Domain

The production server is accessible at:

**`https://api.w2w.jumpingcrab.com`**

All API requests in production shoukld use this base URL.

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **MongoDBCompass**
- **Mongoose**
- **nodemon**
- **ESLint**
- **Prettier**
- **Postman**

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
