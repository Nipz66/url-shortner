# URL Shortener

A simple URL shortener application built with a **React frontend** and a **Node.js backend** with **MongoDB** for data storage. This project allows users to shorten long URLs and retrieve them using a unique short link.

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

- Shorten any URL into a compact version.
- Copy the shortened URL with a single click.
- View a list of previously shortened URLs.
- Responsive design for mobile and desktop users.
- Toast notifications for success and error messages.

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### **Backend Setup (Node.js + Express + MongoDB)**

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
