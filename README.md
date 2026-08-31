# Music Album Review Platform (MARP)

## Project Overview
Music listeners often want to know whether an album is worth purchasing. However, information and opinions about the album are often scattered across platforms, including social media. Therefore, listeners need a platform where they can browse and rate albums, read reviews, and share their opinions. 

## User roles
### Admin
Login, Browse albums, view album details, Add/ Edit album. 

### Listener
Register, Login, Browse albums,view album details, write review, submit review, edit own review. 

## Main features:
Register
Login
Add album
View album detail
Browse Albums
Edit album 
Add review 
Edit review

## System Architecture
Frontend -- React
-Login /register
-Album list 
-Album detail
-Submit / Edit review
-Admin Album Management

Frontend uses Axios to send API requests to the backend

Backend handles application logic
Backend -- node.js + Express
-Authentication 
-check listener /Admin role
-album operations
-review operations
-validation

Database -- MongoDB Atlas
MongoDB provides to persistent storage 
-users
-albums
-reviews

## Technologies Used
# Jira
project planning
# Draw.io
visualise system 
# Figma
UX/UI design
# React
frontend
# Axios
Send API request
# Node.js
backend 
# Express
backend
# MongoDB Atlas
persistent storage
# Git
Version control 
# GitHub
repository
# AWS EC2
cloud deployment

## Local start 
Clone the github repository to enter the project directory

git clone <repository-url>
cd music-album-review-platform

Enter backend folder, install dependencies, start backend

cd backend
npm install
node server.js

.env is required for the backend 

MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your secret>
PORT=<backend port>

Frontend setup, install frontend dependencies and start the React application.

cd frontend 
npm install
npm start

Frontend uses Axios to send API requests to the backend

## Deployment
- The applcation is deployed on AWS EC2
- The react frontend runs on port 3000, while the Node.js and Expreess - backend runs on port 5000
- The backend connects to MongoDB Atlas for persistent data storage
- The frontend communicates with the backend through Axios and API requests
- Public URL: [To be confirmed before submission]

## Limitations
- The current version only supports manual EC2 deployment, the system does not support CI/CD. 
- The system only provides very basic implementation UI, the UX design is mainly represented in Figma prototype
- The current version only supports URLs for album cover images and does not support direct image uploads.

## Repository Structure

music-album-review-platform/
├── backend/
├── frontend/
└── README.md

- backend contains server functions, login authentication、API、MongoDB、Album/Review operations

- frontend contains the react user interface and communicates with backend through API request

- README.md contains the project informations


