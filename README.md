# Idea_Suggestions_App
The Idea Management App is a web application that allows users to create, manage, and explore ideas and sub-ideas. Users can enter their main ideas and use angle brackets (<>) to trigger the recommendation of related sub-ideas.

## Features

- Enter main ideas and trigger sub-idea suggestions using angle brackets.
- Sleek and modern user interface with dynamic card layout.
- Suggestions for sub-ideas are fetched from the backend API.
- Sub-ideas are stored in a MongoDB database.
- Backend built using Node.js and Express framework.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/your-username/idea-management-app.git`
2. Navigate to the project directory: `cd idea-management-app`
3. Install dependencies: `npm install`
4. Configure your MongoDB database connection in `app.js`.
5. Start the backend server: `npm start`
6. Open the `index.html` file in your browser or serve the frontend using a server of your choice.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB

## API Endpoints

- `GET /api/sub-ideas/suggestions?query={inputText}`: Fetch sub-idea suggestions based on input text.

## Acknowledgements

This project was inspired by the idea of managing thoughts and brainstorming using a user-friendly web interface.

## Contact

For any questions or feedback, please reach out to [dheerajkumar84176@gmail.com ].
