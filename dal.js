const { MongoClient } = require('mongodb');

// Updated MongoDB URI to use host.docker.internal
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let db = null;

// Connect to MongoDB
MongoClient.connect(url)
    .then(client => {
        console.log("Connected to MongoDB Server!");
        // Connect to the 'bankdb' database
        db = client.db('bankdb');
        console.log("Connected to bankdb!");
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB:", error);
    });

// Function to create a new user
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('usercollection');
        const user = { name, email, password, balance: 0 };

        collection.insertOne(user)
            .then(result => {
                console.log("User created:", user);
                resolve(user);
            })
            .catch(error => {
                console.error("Error creating user:", error);
                reject(error);
            });
    });
};

// Function for user login
function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('usercollection');

        // Directly find the user by email and password
        collection.findOne({ email: email, password: password })
        .then(user => {
            if (user) {
                console.log("Login successful for user", user);
                resolve(user); // Resolve with user data
            } else {
                console.log("Login failed: User not found or password incorrect", email);
                reject("Login failed: User not found or password incorrect");
            }
        })
        .catch(err => {
            console.error("Error during login", err);
            reject(err);
        });
    });
};

// Function to update balance based on email
function updateBalance(email, amount) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('usercollection');
        collection.findOne({ email: email })
            .then(user => {
                if (!user) {
                    reject("User not found");
                    return;
                }
                
                return collection.findOneAndUpdate(
                    { email: email },
                    { $set: { balance: amount } },
                    { returnOriginal: false }
                );
            })
            .then(result => {
                if (!result) {
                    reject("Update failed");
                } else {
                    resolve(result); // Return the updated document
                }
            })
            .catch(error => {
                console.error("Error updating balance:", error);
                reject(error);
            });
    });
};

// Function to retrieve all users
function all() {
    return new Promise((resolve, reject) => {
        const collection = db.collection('usercollection');
        collection.find({}).toArray()
            .then(users => {
                console.log("All users:", users);
                resolve(users);
            })
            .catch(error => {
                console.error("Error retrieving users:", error);
                reject(error);
            });
    });
}

module.exports = { create, login, all, updateBalance };
