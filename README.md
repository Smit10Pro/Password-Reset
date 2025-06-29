# Password Reset API - Secure and Reliable Authentication System 🔐

![Password Reset](https://img.shields.io/badge/Password%20Reset-API-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.0-orange.svg)
![Express](https://img.shields.io/badge/Express-v4.17.1-red.svg)

## Overview

Welcome to the **Password Reset** repository. This project provides a secure backend for password reset functionalities, built using **Node.js**, **Express**, **MongoDB**, and **Nodemailer**. It includes essential features for modern web applications, such as:

- JWT-based token generation
- Email verification
- Secure password updates via RESTful APIs

These features make it a vital component for authentication workflows.

You can find the latest releases [here](https://github.com/Smit10Pro/Password-Reset/releases). Download the necessary files and execute them to get started.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Token Generation](#token-generation)
- [Email Verification](#email-verification)
- [Password Update](#password-update)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Authentication**: Implements JWT for secure token generation.
- **Email Notifications**: Uses Nodemailer to send verification emails.
- **Password Management**: Allows users to securely update their passwords.
- **RESTful APIs**: Provides clear and straightforward API endpoints for interaction.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to simplify API development.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Nodemailer**: Module for sending emails.
- **Bcrypt**: Library for hashing passwords.
- **JWT**: JSON Web Tokens for secure user authentication.

## Installation

To set up the Password Reset API on your local machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Smit10Pro/Password-Reset.git
   cd Password-Reset
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and set the following variables:
   ```plaintext
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Run the Application**:
   Start the server with:
   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

Once the server is running, you can interact with the API endpoints. Use tools like Postman or cURL to send requests.

## API Endpoints

Here are the main API endpoints available in this application:

### 1. Request Password Reset

- **Endpoint**: `POST /api/password-reset/request`
- **Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

### 2. Verify Token

- **Endpoint**: `GET /api/password-reset/verify/:token`
- **Description**: Verify the password reset token.

### 3. Update Password

- **Endpoint**: `POST /api/password-reset/update`
- **Body**:
  ```json
  {
    "token": "your_jwt_token",
    "newPassword": "new_secure_password"
  }
  ```

## Token Generation

The application uses JWT for secure token generation. After a user requests a password reset, a token is created and sent to their email. This token must be included in the password update request.

### Example Token Generation Code

```javascript
const jwt = require('jsonwebtoken');

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
```

## Email Verification

Nodemailer is used to send verification emails. The email contains a link with the JWT token for password reset.

### Example Email Sending Code

```javascript
const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click the link to reset your password: http://localhost:3000/reset/${token}`,
    };

    await transporter.sendMail(mailOptions);
}
```

## Password Update

Users can securely update their passwords using the provided API endpoint. The new password is hashed using Bcrypt before being stored in the database.

### Example Password Hashing Code

```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
```

## Testing

To ensure the application works as expected, run the tests included in the repository. Make sure to install testing libraries like Mocha and Chai.

### Running Tests

```bash
npm test
```

## Contributing

Contributions are welcome. If you want to improve the project, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

For more information, visit the [Releases section](https://github.com/Smit10Pro/Password-Reset/releases) to download the latest version.