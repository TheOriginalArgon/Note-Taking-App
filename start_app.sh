#!/bin/bash

# Start the backend
echo "Starting backend..."
cd backend
node server.js &
cd -

# Start the frontend
echo "Starting frontend..."
cd frontend
npm start
