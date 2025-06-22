# 🏫 SchoollyDoo - School Management System

![Alt text](./utils/Facebook_post.jpg)

Welcome to **SchoollyDoo**, a comprehensive School Management System designed to empower administrators, teachers, students, and parents with seamless educational management tools.

---

## 🚀 Overview

SchoollyDoo is a robust web application that streamlines school operations, from user management to scheduling, notifications, and media uploads. Built with Node.js, Express, and MongoDB, it provides a secure, scalable, and user-friendly backend for modern educational institutions.

---

## 🌟 Features

- **Admin Dashboard**: Manage all school activities with ease.
- **Teacher & Student Management**: Add, edit, and organize users, assign roles, and track progress.
<!-- - **Exams & Grading**: Create exams, input grades, and generate reports. -->
- **Document & Media Management**: Upload and store important files and images.
<!-- - **Attendance Tracking**: Monitor and analyze attendance patterns. -->
- **Announcements & Notifications**: Communicate instantly with all stakeholders.
- **Authentication & Authorization**: Secure, role-based access using JWT.
- **AWS S3 Integration**: Store and retrieve user profile images and post media.

---

![Alt text](./utils/them_purple.jpg)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **File Storage**: AWS S3
- **Other**: Multer, Express Validator, dotenv

---

## 📚 API Endpoints

### Auth

- `POST /api/v1/auth/signup` – Register a new user
- `POST /api/v1/auth/login` – User login
- `POST /api/v1/auth/addstudents` – Bulk add students
- `GET /api/v1/auth/myprofile` – Get current user profile

### Users

- `POST /api/v1/users/` – Create user
- `GET /api/v1/users/` – List all users
- `GET /api/v1/users/:id` – Get user by ID
- `PUT /api/v1/users/:id` – Update user
- `DELETE /api/v1/users/:id` – Delete user
- `POST /api/v1/users/uploadprofilepicture` – Upload profile image

### Schools

- `POST /api/v1/Schools/` – Create school
- `GET /api/v1/Schools/` – List all schools
- `GET /api/v1/Schools/unactive` – List unactive schools (manager only)
- `GET /api/v1/Schools/myschool` – Get schools for current user
- `GET /api/v1/Schools/:id` – Get school by ID
- `PUT /api/v1/Schools/unactive/:id` – Update unactive school
- `DELETE /api/v1/Schools/unactive/:id` – Delete unactive school

### Posts

- `POST /api/v1/Posts/` – Create post with media
- `GET /api/v1/Posts/GetPostsRelateToSchool` – Get posts for user's school
- `POST /api/v1/Posts/GetFile` – Get post media file
- `POST /api/v1/Posts/AddLike/:id` – Like a post
- `POST /api/v1/Posts/RemoveLike/:id` – Remove like from post
- `GET /api/v1/Posts/:id` – Get post likes
- `PUT /api/v1/Posts/:id` – Update post
- `DELETE /api/v1/Posts/:id` – Delete post

### Notifications

- `POST /api/v1/Notifications/` – Create notification
- `GET /api/v1/Notifications/` – List all notifications
- `GET /api/v1/Notifications/AllNotificationsForThisUser` – Get notifications for user
- `PUT /api/v1/Notifications/AllNotificationsForThisUser` – Mark notifications as read
- `PUT /api/v1/Notifications/OneNotificationsForThisUser/:id` – Mark one notification as read

### Apply (Applications)

- `POST /api/v1/Applies/` – Apply to a school
- `GET /api/v1/Applies/unactive` – List unactive applications
- `PUT /api/v1/Applies/unactive/:id` – Update application
- `DELETE /api/v1/Applies/unactive/:id` – Delete application

### Schedules

- `POST /api/v1/GenerateSchedules/` – Generate and download schedules (image)

---

## 📦 Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `config.env` and fill in your values.
4. **Run the server**
   ```sh
   npm run dev
   ```

> Made with ❤️ for education.
