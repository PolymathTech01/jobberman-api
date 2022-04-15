require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getUSerDetailsByEmail_JobSeeker, getUserDetailsByEmail_Employer,getUserDetailsByEmail_Admin} = require('../models/user.models')
const { reject } = require('bcrypt/promises')
const { v4: uuidv4 } = require('uuid') 

    // THIS IS JOB-SEEKER'S LOGIN FUNCTION
    const Login_JobSeeker = async(req, res)=> {

        const {email, password } = req.body

        let DetailsPayload = null

    getUSerDetailsByEmail_JobSeeker(email)
    .then(responseFromlogin => {
        if(responseFromlogin =="") {
            throw new Error ("Invalid Credentials")
        }

        DetailsPayload = responseFromlogin[0]
        
        return bcrypt.compare(password, DetailsPayload.passwordHash)
    })
    .then(responseFromCompare => {
        if(responseFromCompare == false){
            throw new Error ("Invalid Email or password")
        }

    const DataToAddInPayload = {
        email: DetailsPayload.email,
        _isAdmin:false,
        Identity: uuidv4
        }
            jwt.sign(DataToAddInPayload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME },
                (err, token) => {
                    if (err) {
                        console.log("err", err)
                        throw new Error("Big Big errors, Try later!!!")
                    }
                    res.status(200).send({
                        status: true,
                        token: token,
                        message: "Successfully logged in"
                    })
                }   
            )
    })
    .catch (err => {
            res.status(400).send({
                status: false,
                message: err.message || "Something went wrong"  
                })
            })  
    }
    
    // THIS IS EMPLOYER'S LOGIN FUNCTION
    const Login_Employer = async(req, res)=> {

        const {email, password } = req.body

        let DetailsPayload = null
    getUserDetailsByEmail_Employer(email)
    .then(responseFromlogin => {
        if(responseFromlogin =="") {
            throw new Error ("Invalid Credentials")
        }

        DetailsPayload = responseFromlogin[0]
        console.log("i got here: ", DetailsPayload)
        
        return bcrypt.compare(password, DetailsPayload.passwordHash)
    })
    .then(responseFromCompare => {
        if(responseFromCompare == false){
            console.log("ccevv:",responseFromCompare)
            throw new Error ("Invalid Email or password")
        }

    const DataToAddInPayload = {
        email: DetailsPayload.email,
        _isAdmin:false,
        Identity: uuidv4
        }
            jwt.sign(DataToAddInPayload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME },
                (err, token) => {
                    if (err) {
                        console.log("err", err)
                        throw new Error("Big Big errors, Try later!!!")
                    }
                    res.status(200).send({
                        status: true,
                        token: token,
                        message: "Successfully logged in"
                    })
                }   
            )
    })
    .catch (err => {
            res.status(400).send({
                status: false,
                message: err.message || "Something went wrong"  
                })
            })  
    } 
    
    // THIS IS ADMIN'S LOGIN FUNCTION
    const Login_Admin = async(req, res)=> {

        const {email, password } = req.body

        let DetailsPayload = null

    getUserDetailsByEmail_Admin(email)
    .then(responseFromlogin => {
        if(responseFromlogin =="") {
            throw new Error ("Invalid Credentials")
        }

        DetailsPayload = responseFromlogin[0]
        
        return bcrypt.compare(password, DetailsPayload.passwordHash)
    })
    .then(responseFromCompare => {
        if(responseFromCompare == false){
            throw new Error ("Invalid Email or password")
        }

    const DataToAddInPayload = {
        email: DetailsPayload.email,
        _isAdmin:true,
        Identity: uuidv4
        }
            jwt.sign(DataToAddInPayload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME },
                (err, token) => {
                    if (err) {
                        console.log("err", err)
                        throw new Error("Big Big errors, Try later!!!")
                    }
                    res.status(200).send({
                        status: true,
                        token: token,
                        message: "Successfully logged in"
                    })
                }   
            )
    })
    .catch (err => {
            res.status(400).send({
                status: false,
                message: err.message || "Something went wrong"  
                })
            })  
    }    




module.exports = {
    Login_JobSeeker,
    Login_Employer,
    Login_Admin
}