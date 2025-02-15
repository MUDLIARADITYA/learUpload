const mongoose = require("mongoose");

// Correcting the MongoDB URI to use localhost instead of 12.0.0.1
mongoose.connect('mongodb://localhost:27017/authtestapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.log("Error connecting to the database:", err);
    });

// Define schema for 'user'
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
});

// Export the 'user' model
module.exports = mongoose.model("User", userSchema);
