const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_Secret = 'VijenderSingh';

//Create a user using: POST "/api/auth/createuser" . Doesnt require authentication
//ROUTE:1
router.post('/createuser', [

    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        // create user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        //adding the data in token
        const data = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
        const authtoken = await jwt.sign(data, JWT_Secret)
        res.json({ authtoken })
    } catch (e) {
        console.error(e.message)
    }
    //Check if user already exists
})

//Authenticate a user using: POST "/api/auth/login". No login required
//ROUTE:2
router.get('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User not found' }] })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "User not found" });
        }
        //adding the data in token
        const data = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
        const authtoken = await jwt.sign(data, JWT_Secret)

        res.json({ authtoken })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ msg: 'Server error' })
    }
})

//ROUTE:3
//Get logged in user detail: POST "/api/auth/getUser". legin required
router.get('/getUser', fetchuser, async (req, res) => {

try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal ServerError");
}
});

module.exports = router;