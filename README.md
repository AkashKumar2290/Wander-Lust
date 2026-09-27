# 🌍 WanderLust — Travel Listing & Exploration Platform

**WanderLust** is a full-stack travel listing web application where users can explore destinations, view detailed property information, interact with listings, and manage their own travel listings through a secure and user-friendly platform.

The project provides complete user authentication, listing management, reviews, search functionality, map integration, and profile management.

---

## ✨ Features

### 🏠 Home / Index Page

* Displays all available travel listings.
* Clean and responsive travel-focused UI.
* Premium Navbar and Footer.
* Functional search box to find listings.
* Easy navigation between listings and user features.

### 🔐 User Authentication

* User Registration / Sign Up
* User Login / Logout
* Change Password
* Session-based authentication
* Protected routes for authenticated users

### 👤 User Profile

* Dedicated profile page for every user.
* Displays the user's own listings.
* Users can manage their listings directly from their profile.
* Profile deletion functionality.
* Deleting a profile also handles the user's associated listing data.

### 🏡 Listing Management

Users can:

* Create new listings
* View listing details
* Edit their own listings
* Delete their own listings
* View listing price
* View location and country
* View listing images
* Search listings

### 🗺️ Map Integration

Every listing has location information.

On the listing details page, users can view:

* 📍 Listing location
* 🗺️ Interactive map
* 💰 Price
* 🌍 Destination information

### ⭐ Reviews & Ratings

* Users can add reviews to listings.
* Reviews are displayed on the listing details page.
* Users can manage their own reviews.
* Review validation is implemented to maintain proper data handling.

### 🔎 Search

* Functional search bar in the Navbar.
* Users can search through available listings.
* Search results are displayed dynamically based on listing information.

### 🎨 UI / UX

* Responsive design
* Modern travel-inspired interface
* Separate CSS files for different pages/components
* Responsive Navbar
* Flash messages for user feedback
* Custom error pages
* Mobile-friendly layout

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js
* RESTful APIs
* MVC Architecture

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Authentication

* Passport.js
* Passport Local Strategy
* Express Session
* Connect-Mongo

### Other Technologies

* Cloudinary
* Multer
* Map Integration
* Method Override
* Connect Flash
* Git & GitHub

---

## 🏗️ Project Architecture

The project follows an **MVC-based architecture** to keep the application organized and maintainable.

```text
WanderLust
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── layouts/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│
├── middleware.js
├── schema.js
├── cloudConfig.js
├── app.js
└── package.json
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
Frontend / EJS
 │
 ▼
Express.js Routes
 │
 ▼
Controllers
 │
 ▼
Mongoose Models
 │
 ▼
MongoDB Atlas
```

For authentication:

```text
User
 │
 ▼
Passport.js
 │
 ▼
Express Session
 │
 ▼
Connect-Mongo
 │
 ▼
MongoDB Atlas
```

---

## 📋 Main Pages

| Page               | Description                          |
| ------------------ | ------------------------------------ |
| 🏠 Home            | Displays all listings                |
| 🔍 Search          | Searches available listings          |
| 🏡 Listing Details | Complete information about a listing |
| ➕ New Listing      | Create a new listing                 |
| ✏️ Edit Listing    | Update an existing listing           |
| 👤 Profile         | Manage user information and listings |
| 🔐 Login           | User authentication                  |
| 📝 Signup          | Create a new account                 |
| 🔑 Change Password | Update account password              |

---

## 🔒 Security & Authorization

WanderLust implements authentication and authorization to protect user data and actions.

* Authentication using Passport.js
* Session management using Express Session
* MongoDB session storage using Connect-Mongo
* Protected listing routes
* Users can edit/delete only their own listings
* Users can manage their own reviews
* Protected profile functionality
* Environment variables for sensitive configuration

---

## ☁️ Database

The application uses **MongoDB Atlas** as the cloud database.

Main collections:

```text
wanderlust
│
├── users
├── listings
├── reviews
└── sessions
```

Relationships:

```text
User
 │
 ├── owns → Listings
 │
 └── creates → Reviews

Listing
 │
 └── contains → Reviews
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/AkashKumar2290/Wander-Lust.git
```

### 2. Move into the project

```bash
cd Wander-Lust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the root directory.

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> Never commit your `.env` file to GitHub.

### 5. Start the application

```bash
node app.js
```

For development with Nodemon:

```bash
nodemon app.js
```

The application will run locally on:

```text
http://localhost:8080
```

---

## 📸 Core Functionality

### Explore Listings

Users can browse available travel destinations directly from the home page.

### Listing Details

Each listing provides detailed information including:

* Title
* Description
* Price
* Location
* Country
* Image
* Map location
* Reviews

### Manage Listings

Authenticated users can create, edit, and delete their own listings.

### Profile Management

Users can access their profile to view and manage their listings and account information.

### Reviews

Users can share their experience by adding reviews to listings.

---

## 🚀 Future Improvements

Some possible future improvements include:

* Advanced filtering by location and price
* Wishlist / Favorites
* Booking functionality
* Image gallery
* Improved recommendation system
* Email notifications
* Advanced admin dashboard
* More advanced search and filtering
* Payment integration

---

## 🎯 Project Objective

The main objective of WanderLust is to build a complete full-stack travel platform that demonstrates practical implementation of:

* Full-stack web development
* MVC architecture
* RESTful APIs
* CRUD operations
* Authentication & Authorization
* Database relationships
* Cloud database integration
* Map integration
* Image handling
* User-generated reviews
* Responsive web design

---

## 👨‍💻 Author

**Akash Kumar**

B.Tech CSE — Data Science
Raj Kumar Goel Institute of Technology, Ghaziabad

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### 🌍 WanderLust

**Explore. Discover. Experience.**

