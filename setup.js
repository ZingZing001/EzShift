const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Generate a random JWT secret
const jwtSecret = crypto.randomBytes(32).toString("hex");

// Define the .env content
const envContent = `JWT_SECRET=${jwtSecret}\nPORT=3000\n`;

// Path to .env file
const envPath = path.join(__dirname, ".env");

// Check if .env already exists
if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent, { flag: "wx" });
    console.log(".env file created successfully!");
} else {
    console.log(".env file already exists, skipping creation.");
}
