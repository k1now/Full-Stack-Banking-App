var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

/////// middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

////// Defining API Routes

//creating a new account
app.post('/account/create/', function (req, res) {
    dal.create(req.body.name, req.body.email, req.body.password).then((doc) => {
        console.log(doc);
        res.send(doc);
    });
});

// Logging in a new user
app.post('/account/login/', function (req, res) {
    dal.login(req.body.email, req.body.password)
        .then(user => {
            console.log(user);
            res.send(user);
        })
        .catch(error => { // This catches any error from the login process
            console.error(error);
            res.status(500).send("Error logging in");
        });
});


// Update Account Balance using POST
app.post('/account/updatebalance/', function (req, res) {
    
    dal.updateBalance(req.body.email, Number(req.body.amount)) // Ensure amount is treated as a number
        .then(result => {
            console.log(result);
            res.send(result); // Send back the updated user or balance information
        })
        .catch(error => {
            console.error("Error updating balance:", error);
            res.status(500).send("Error updating balance");
        });
});


//viewing all accounts
app.get('/account/all/', function (req, res) {
    dal.all()
        .then((users) => {
            console.log(users);
            res.send(users);
        })
        .catch((err) => {
            console.error('Error fetching all accounts:', err);
            res.status(500).send('Internal server error');
        });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});