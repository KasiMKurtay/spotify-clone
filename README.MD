# Spotify Clone

The Spotify Clone application is a music streaming platform that mimics the core features of Spotify. It includes an admin panel where the admin user can add and delete music and albums. The application offers key functionalities like music playback, playlist creation, and search features similar to Spotify.

## Features

- **Admin Dashboard**: Admin users can add or delete music and albums.
- **Music Playback**: Users can listen to songs and view albums.
- **Playlist Creation**: Users can create their own playlists.
- **Search**: Users can search for songs, albums, and artists.
- **Real-time Features**: Interactions between users and admins are updated in real-time using **Socket.io**.

## Technologies

- **Backend**:
  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - Socket.io (for real-time data transmission)
  - Cloudinary (for media management)
- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - Zustand (for state management)
  - Radix UI (for accessible UI components)
  - Axios (for API calls)
  - React Router (for routing)

## Installation

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

Install the dependencies:

npm install

Add your database connection settings to the .env file. Example .env:

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url

Start the application in development mode:

npm run dev

### Frontend

Navigate to the frontend folder:

cd frontend

Install the dependencies:

npm install

Start the application in development mode:

npm run dev

Open your browser and go to http://localhost:3000 to view the application.

Usage

After logging in as an admin, you can access the admin panel to add or delete music and albums.

Users can browse songs and albums, create playlists, and listen to music.

Contributing

If you would like to contribute to this project, please create an issue first.

Leave a comment on the related issue with your suggestions for solutions.

You can submit your changes as a pull request.
