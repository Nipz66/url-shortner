# URL Shortener

A comprehensive URL shortener application built with a **React frontend** and a **Node.js backend** with **MongoDB** for data storage. This project allows users to shorten long URLs and retrieve them using a unique short link.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## **Project Overview**

This URL shortener project provides an easy-to-use interface for users to shorten long URLs. The application leverages React for the frontend and Node.js with MongoDB for the backend. Users can paste a long URL, generate a short link, and access the short URL to redirect them to the original URL.

---

## **Technologies Used**

- **Frontend**:  
  - React.js
  - Axios (for API requests)
  - React Toastify (for notifications)
  - Tailwind CSS (for styling)

- **Backend**:  
  - Node.js
  - Express.js
  - MongoDB (for storing URLs)

- **Hosting/Deployment**:  
  - Frontend: [Vercel](https://vercel.com) / [Netlify](https://www.netlify.com)
  - Backend: [Render](https://render.com) / [Heroku](https://www.heroku.com)

---

## **Features**

- Shorten any URL into a compact version
- Copy the shortened URL with a single click
- View a list of previously shortened URLs
- Responsive design for mobile and desktop users
- Toast notifications for success and error messages
- URL validation to ensure proper formatting
- Tracks click counts for each shortened URL
- Recent URLs display with timestamp

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### **Backend Setup (Node.js + Express + MongoDB)**

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**:

   ```sh
   cd backend
   npm install express mongoose cors dotenv
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` folder and add the following:

   ```bash
   MONGO_URI=<your-mongo-db-connection-string>
   PORT=5000
   ```

4. **Backend code structure**:

   - **server.js**: Main server file
   - **models/Url.js**: Database schema for URLs

5. **Run the backend**:

   ```sh
   node server.js
   ```

   The backend will be running at `http://localhost:5000`.

---

### **Frontend Setup (React)**

1. **Navigate to the frontend directory**:

   ```sh
   cd frontend
   ```

2. **Install dependencies**:

   ```sh
   npm install react react-dom axios react-toastify
   ```

3. **Set the backend API URL**:

   Create a `.env` file in the `frontend` folder and add:

   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_BASE_URL=http://localhost:5000
   ```

4. **Frontend code structure**:

   - **App.js**: Main React component
   - **App.css**: Styles for the application

5. **Run the frontend**:

   ```sh
   npm start
   ```

   The frontend will be running at `http://localhost:3000`.

---

## **API Endpoints**

### **POST** `/api/shorten`

- **Description**: Shortens a URL
- **Request Body**:  
  ```json
  {
    "originalUrl": "https://www.example.com/long/path/to/resource"
  }
  ```
- **Response**:  
  ```json
  {
    "shortUrl": "abcd1234"
  }
  ```

### **GET** `/api/urls`

- **Description**: Returns a list of recently shortened URLs
- **Response**:  
  ```json
  [
    {
      "originalUrl": "https://www.example.com/long/path/to/resource",
      "shortUrl": "abcd1234",
      "clicks": 5,
      "createdAt": "2025-03-13T12:00:00.000Z"
    }
  ]
  ```

---

## **Contributing**

If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
