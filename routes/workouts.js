var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const userShouldBeLoggedIn = require('../client/src/guards/userShouldBeLoggedIn.cjs');
const saltRounds = 10;


const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  // Get username, password, firstname, and email from req.body
  const { username, password, firstname, email } = req.body;

  try {
    // hash password to store in database
    const hash = await bcrypt.hash(password, saltRounds);
    // insert data into database
    await db(
      `INSERT INTO users (firstname, email, username, password) VALUES ("${firstname}", "${email}", "${username}", "${hash}")`
    );
      // send back message
    res.send({ message: "Registration successful!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



router.post ("/login", async (req, res) => {
  // get username and password from req.body
  const { username, password} = req.body;

  try {
    const results = await db(
      // check if a user exists
      `SELECT * FROM users WHERE username = "${username}"`
    );

    const user = results.data[0];
    
    if (user) {
      // store user id in a variable
      const user_id = username;
      // if user exists, check if password is correct
      const correctPassword = await bcrypt.compare(password, user.password);
      // if password is wrong, throw error
      if (!correctPassword) throw new Error("Incorrect password!");
      // if password is correct, create a token
      var token = jwt.sign({user_id}, supersecret);
      res.send({ message: "Login successful, here is your token", token});
    }else {
      // if user does not exist, throw error
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message});
  }
}); 

router.get('/profile', userShouldBeLoggedIn, function (req, res, next) {
  const username = req.username;

  // Perform a database query to retrieve workout data based on the username
  const sql = `SELECT * FROM workouts w JOIN users u ON w.user_id = u.id WHERE u.username = "${username}"`;
  db(sql, function (error, results) {
    if (error) {
      console.error('Error retrieving workout data:', error);
      res.status(500).send({ message: 'Error retrieving workout data' });
    } else {
      res.send({
        message: `Here is the protected data for user ${req.user_id}`,
        workouts: results,
      });
    }
  });
});








// get workouts
router.get('/', async (req, res, next) => {
  try {
    const result = await db(
      `SELECT * FROM workouts;`
      );
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//insert a new lowerbody workout
router.post('/', async (req, res, next) => {
  try {
    await db(
      `INSERT INTO workouts (type, workout, reps, sets) VALUES ("${req.body.type}", "${req.body.workout}", "${req.body.reps}", "${req.body.sets}");`
    );
    const result = await db("SELECT * FROM workouts ORDER by id ASC");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get workout by id
router.get("/:id", async (req, res, next) => {
  try {
    const result = await db(
      `SELECT * FROM workouts WHERE id = ${req.params.id};`
    );
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
}); 


module.exports = router;
