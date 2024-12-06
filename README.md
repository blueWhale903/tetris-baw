# Tetris Game

A feature-rich Tetris game built with **React**, **Next.js**, and **Prisma**. This project showcases a combination of front-end gameplay development and back-end user management, including a leaderboard, user profiles, and game history.
demo page: https://tetris-baw-848b-9ti75fk6q-hoang-gia-longs-projects.vercel.app/
## Features
- **Tetris Game Mechanics**: Playable Tetris with classic controls.
- **Leaderboard**: View global rankings based on high scores.
- **User Profiles**: Users can sign up, log in, and view their profile.
- **Game History**: Track your past games and achievements.
- **Secure Authentication**: User credentials are safely managed with proper security practices.

## Technologies Used
- **Frontend**: React, Next.js
- **Backend**: Prisma (for database management)
- **Authentication**: NextAuth
- **Database**: PostgreSQL (or any preferred DB with Prisma)

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Prisma (make sure Prisma is set up for your project)

### Steps to Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/tetris-game.git
   cd tetris-game
   ```
1. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
4. Run the app
   ```bash
   npm run dev
   ```

## Usage

Play the Tetris game directly in the browser.
Create an account or log in to save your high scores and game history.
View your rank on the leaderboard.
