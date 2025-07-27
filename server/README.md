# Student Feedback Management System - Backend

A Node.js Express server with MongoDB for managing student feedback.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the server directory with:

```
MONGODB_URI=mongodb://localhost:27017/student_feedback
JWT_SECRET=your-secret-key-here
PORT=5000
```

## API Endpoints

### Public Routes
- `POST /feedback` - Submit student feedback

### Admin Routes
- `POST /admin/login` - Admin login (returns JWT token)
- `GET /admin/feedbacks` - Get all feedbacks (requires JWT token)

## Admin Credentials

- Email: admin@school.com
- Password: admin123

## Database

The application uses MongoDB with Mongoose ODM. The feedback collection stores:
- name (String, required)
- email (String, required)
- course (String, required)
- rating (Number, 1-5, required)
- comments (String, required)
- timestamps (createdAt, updatedAt)