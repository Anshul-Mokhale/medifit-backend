# Medifit Backend

Medifit is an online medical store that provides efficient delivery services and other healthcare-related features. This backend is built using **Node.js** and **Express.js**, ensuring a robust and scalable architecture for handling various functionalities.

## Tech Stack

The following technologies and libraries are used in this project:

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling routes and middleware.
- **MySQL**: Database for storing and managing data.
- **bcryptjs**: For hashing passwords securely.
- **dotenv**: For managing environment variables.
- **cors**: To enable Cross-Origin Resource Sharing.
- **joi**: For data validation.
- **multer**: For handling file uploads.
- **nodemon**: For development, enabling automatic server restarts on file changes.

## Installation and Setup

Follow these steps to set up and run the Medifit Backend on your local machine:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager, comes with Node.js)
- **MySQL** (Ensure you have a running MySQL server)

### Steps

1. **Clone the Repository**  
   Clone the project to your local machine using the following command:
   ```bash
   git clone https://github.com/your-repo/medifit-backend.git
   cd medifit-backend
2. **Install Dependencies**  
    Install the required dependencies by running:  
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**  
    Create a `.env` file in the root directory and configure the following variables:  
    ```env
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    JWT_SECRET=your-jwt-secret
    ```

4. **Run Database Migrations**  
    Ensure your database is set up correctly by running any necessary migrations or scripts.

5. **Start the Server**  
    Start the development server using:  
    ```bash
    npm start
    ```

6. **Test the API**  
    Use tools like Postman or cURL to test the API endpoints.

Your backend should now be up and running on `http://localhost:3000` (or the port specified in your `.env` file).  