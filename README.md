
# Task 13 - Authentication & User Profile Management App

## Project Overview

A React Native mobile application built using Expo and TypeScript.

The application implements user authentication, profile management,
protected navigation and local session persistence using DummyJSON API.

## Features

- User login with username and password
- Form validation
- DummyJSON authentication API integration
- User dashboard
- Display logged-in user information
- Separate profile screen
- Edit profile information
- Profile form validation
- Context API authentication management
- AsyncStorage session persistence
- Protected navigation
- Logout functionality
- Access token and refresh token management
- Loading and API error handling
- Reusable UI components

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- AsyncStorage
- Fetch API

## API Details

Base URL:

https://dummyjson.com

### Authentication

POST /auth/login

GET /auth/me

POST /auth/refresh

### Profile

PATCH /users/{id}

## Demo Credentials

Username: emilys

Password: emilyspass

## Project Setup

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project:

cd Task13AuthApp

Install dependencies:

npm install

Start Expo:

npx expo start

Scan the QR code using Expo Go or run on an Android emulator.

## Project Structure

src/components - Reusable UI components

src/screens - Application screens

src/navigation - Navigation and protected routes

src/context - Authentication state management

src/services - API integration

src/storage - AsyncStorage functionality

src/types - TypeScript interfaces

src/utils - Validation functions

src/constants - Common application values

## Authentication Flow

1. User enters login credentials.
2. Credentials are validated.
3. Login API is called.
4. Authentication tokens and user information are stored locally.
5. AuthContext updates the authentication state.
6. Protected navigation displays the dashboard.
7. Session is restored when the app is reopened.
8. User can view and edit profile information.
9. Logout clears locally stored authentication data.

## Note

DummyJSON is a mock API. Profile update operations simulate
server updates and do not permanently modify the database.
Local profile changes are persisted using AsyncStorage.

## Author

Jaswanth
