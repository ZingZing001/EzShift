# EzShift

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) 
![EJS](https://img.shields.io/badge/EJS-%23A91E50.svg?style=for-the-badge&logo=ejs&logoColor=white) 
![Better-SQLite3](https://img.shields.io/badge/sqlite3-%23003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) 
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white) 
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) 

## Overview
EzShift is a shift management web application designed to help users manage their work schedules and payroll efficiently.

## Features
- User registration and authentication
- Shift scheduling
- Payroll management
- User settings and profile management

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/EzShift.git
   ```
2. Navigate into the project directory:
   ```sh
   cd EzShift
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Project Progress
```mermaid
gantt
title EzShift Development Progress
dateFormat  YYYY-MM-DD
section Backend Development
Setup Database :done, des1, 2025-02-25, 2025-02-27
User Authentication :done, des2, 2025-02-28, 2025-03-02
Session Management :done, des3, 2025-03-03, 2025-03-05
Shift & Payroll API :active, des4, 2025-03-06, 2025-03-10
section Frontend Development
Login & Register UI :done, des5, 2025-03-01, 2025-03-03
Dashboard UI :active, des6, 2025-03-04, 2025-03-09
Shift Management UI : des7, 2025-03-10, 2025-03-15
section Deployment
Cloud Deployment : des8, 2025-03-16, 2025-03-18
Testing & Debugging : des9, 2025-03-19, 2025-03-22
Final Release : des10, 2025-03-23, 2025-03-25
```

## API Endpoints
- `POST /register` - Registers a new user
- `POST /login` - Authenticates user and sets session cookie
- `GET /logout` - Clears session cookie and logs out user

## License
This project is licensed under the MIT License.
 
