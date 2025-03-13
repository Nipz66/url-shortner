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

   - **server.js**:
   ```javascript
   // server.js - Main backend file for the URL shortener
   const express = require("express");
   const mongoose = require("mongoose");
   const cors = require("cors");
   const dotenv = require("dotenv");
   const urlSchema = require("./models/Url");

   dotenv.config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   // Connect to MongoDB
   mongoose.connect(process.env.MONGO_URI, { 
     useNewUrlParser: true, 
     useUnifiedTopology: true 
   })
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.log("Error connecting to MongoDB", err));

   // URL model
   const Url = mongoose.model("Url", urlSchema);

   // API endpoint for shortening the URL
   app.post("/api/shorten", async (req, res) => {
     const { originalUrl } = req.body;
     
     // Validate URL
     if (!originalUrl || !isValidUrl(originalUrl)) {
       return res.status(400).json({ error: "Invalid URL provided" });
     }
     
     try {
       // Check if URL already exists in database
       const existingUrl = await Url.findOne({ originalUrl });
       if (existingUrl) {
         return res.status(200).json({ shortUrl: existingUrl.shortUrl });
       }
       
       // Generate a unique short URL code
       const shortUrl = generateShortUrl();
       
       // Create new URL record
       const newUrl = new Url({
         originalUrl,
         shortUrl
       });
       
       await newUrl.save();
       res.status(201).json({ shortUrl });
     } catch (err) {
       console.error("Error shortening URL:", err);
       res.status(500).json({ error: "Failed to shorten URL" });
     }
   });

   // API endpoint for fetching all shortened URLs
   app.get("/api/urls", async (req, res) => {
     try {
       const urls = await Url.find().sort({ createdAt: -1 }).limit(10);
       res.status(200).json(urls);
     } catch (err) {
       console.error("Error fetching URLs:", err);
       res.status(500).json({ error: "Failed to fetch URLs" });
     }
   });

   // Redirect to original URL when short URL is visited
   app.get("/:shortUrl", async (req, res) => {
     try {
       const { shortUrl } = req.params;
       const url = await Url.findOne({ shortUrl });

       if (!url) {
         return res.status(404).json({ error: "Short URL not found" });
       }

       res.redirect(url.originalUrl);
     } catch (err) {
       console.error("Error redirecting:", err);
       res.status(500).json({ error: "Failed to redirect" });
     }
   });

   // Helper function to validate URLs
   function isValidUrl(string) {
     try {
       new URL(string);
       return true;
     } catch (_) {
       return false;
     }
   }

   // Helper function to generate a random short URL
   function generateShortUrl() {
     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     let result = '';
     for (let i = 0; i < 6; i++) {
       result += chars.charAt(Math.floor(Math.random() * chars.length));
     }
     return result;
   }

   // Start server
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

   - **models/Url.js**:
   ```javascript
   const mongoose = require("mongoose");

   const urlSchema = new mongoose.Schema({
     originalUrl: {
       type: String,
       required: true,
       trim: true
     },
     shortUrl: {
       type: String,
       required: true,
       unique: true,
       trim: true
     },
     clicks: {
       type: Number,
       default: 0
     },
     createdAt: {
       type: Date,
       default: Date.now
     }
   });

   module.exports = urlSchema;
   ```

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

4. **Frontend code (React)**:

   - **App.js**:
   ```jsx
   import React, { useState, useEffect } from "react";
   import axios from "axios";
   import { ToastContainer, toast } from "react-toastify";
   import "react-toastify/dist/ReactToastify.css";
   import "./App.css";

   function App() {
     const [originalUrl, setOriginalUrl] = useState("");
     const [shortUrl, setShortUrl] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const [urls, setUrls] = useState([]);
     const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
     const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

     // Fetch existing URLs when component mounts
     useEffect(() => {
       fetchUrls();
     }, []);

     // Fetch all shortened URLs
     const fetchUrls = async () => {
       try {
         const response = await axios.get(`${API_BASE_URL}/urls`);
         setUrls(response.data);
       } catch (error) {
         console.error("Error fetching URLs:", error);
       }
     };

     // Handle form submission
     const handleSubmit = async (e) => {
       e.preventDefault();
       
       if (!originalUrl) {
         toast.error("Please enter a URL");
         return;
       }
       
       try {
         setIsLoading(true);
         const response = await axios.post(`${API_BASE_URL}/shorten`, { originalUrl });
         setShortUrl(response.data.shortUrl);
         toast.success("URL shortened successfully!");
         fetchUrls(); // Refresh the URL list
         setOriginalUrl(""); // Clear the input field
       } catch (error) {
         console.error("Error:", error);
         toast.error(error.response?.data?.error || "Failed to shorten URL");
       } finally {
         setIsLoading(false);
       }
     };

     // Copy shortened URL to clipboard
     const copyToClipboard = (url) => {
       navigator.clipboard.writeText(`${BASE_URL}/${url}`).then(
         () => {
           toast.success("Copied to clipboard!");
         },
         () => {
           toast.error("Failed to copy!");
         }
       );
     };

     return (
       <div className="container mx-auto px-4 py-8 max-w-3xl">
         <ToastContainer position="top-right" autoClose={3000} />
         
         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">URL Shortener</h1>
         
         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
           <form onSubmit={handleSubmit} className="flex flex-col">
             <div className="mb-4">
               <label htmlFor="originalUrl" className="block text-gray-700 mb-2">
                 Enter a long URL
               </label>
               <input
                 type="url"
                 id="originalUrl"
                 placeholder="https://example.com/very/long/url/that/needs/shortening"
                 value={originalUrl}
                 onChange={(e) => setOriginalUrl(e.target.value)}
                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required
               />
             </div>
             
             <button
               type="submit"
               className={`bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
               disabled={isLoading}
             >
               {isLoading ? "Shortening..." : "Shorten URL"}
             </button>
           </form>

           {shortUrl && (
             <div className="mt-6 p-4 bg-blue-50 rounded-md">
               <p className="text-gray-700 mb-2">Your shortened URL:</p>
               <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md">
                 <a
                   href={`${BASE_URL}/${shortUrl}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline break-all"
                 >
                   {`${BASE_URL}/${shortUrl}`}
                 </a>
                 <button
                   onClick={() => copyToClipboard(shortUrl)}
                   className="ml-4 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 text-sm whitespace-nowrap"
                 >
                   Copy
                 </button>
               </div>
             </div>
           )}
         </div>

         {/* URL History */}
         {urls.length > 0 && (
           <div className="bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent URLs</h2>
             <div className="overflow-x-auto">
               <table className="w-full table-auto">
                 <thead>
                   <tr className="bg-gray-100">
                     <th className="px-4 py-2 text-left">Original URL</th>
                     <th className="px-4 py-2 text-left">Short URL</th>
                     <th className="px-4 py-2 text-left">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {urls.map((url) => (
                     <tr key={url.shortUrl} className="border-t border-gray-200">
                       <td className="px-4 py-3 truncate max-w-xs" title={url.originalUrl}>
                         {url.originalUrl}
                       </td>
                       <td className="px-4 py-3">
                         <a
                           href={`${BASE_URL}/${url.shortUrl}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline"
                         >
                           {`${BASE_URL}/${url.shortUrl}`}
                         </a>
                       </td>
                       <td className="px-4 py-3">
                         <button
                           onClick={() => copyToClipboard(url.shortUrl)}
                           className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 text-sm"
                         >
                           Copy
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         )}
       </div>
     );
   }

   export default App;
   ```

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
