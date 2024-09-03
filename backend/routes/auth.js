const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt= require('jsonwebtoken')

const JWT_Secret = 'VijenderSingh';

//Create a user using: POST "/api/auth/createuser" . Doesnt require authentication

router.post('/createuser',[ 

    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{

        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ errors: [{msg: 'User already exists'}]})
        }
        // create user
        const salt = await bcrypt.genSalt(10);

        const secPass= await bcrypt.hash(req.body.password, salt);

       user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data= {
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
        const authtoken= await jwt.sign(data,JWT_Secret)

        res.json({"Nice":" Vijender user is created"})
    }catch (e){
        console.error(e.message)
    }
    //Check if user already exists
})

module.exports = router;