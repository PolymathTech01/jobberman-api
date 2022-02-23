require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid') 
const { getUSerDetailsByEmail_JobSeeker, getUserDetailsByEmail_Employer,getUserDetailsByEmail_Admin} = require('../models/users.models')
const { reject } = require('bcrypt/promises')
const res = require('express/lib/response')



const Login = async(req, res)=> {
    const {email, password } = req.query

let DetailsPayload

getUSerDetailsByEmail_JobSeeker(email) || getUserDetailsByEmail_Employer(email) || getUserDetailsByEmail_Admin(email)
.then(responseFromlogin =>{
    if(!responseFromlogin) {
        throw new Error ("Invalid Credentials")
    }

    DetailsPayload = responseFromlogin[0]

    // Remember to install bcrypt
    return bcrypt.compare(password, DetailsPayload.password)
})
.then(responseFromCompare => {
    if(responseFromCompare == false){
        throw new Error ("Invalid Email or password")
    }
})

const DataToAddInPayload = {
    email: DetailsPayload.email,
    Identity: false
    }
        jwt.sign(DataToAddInPayload, process.env.JWT_SECRET, { ExpirationtTime: process.env.JWT_EXPIRE_TIME },
            (err, token) => {
                if (err) {
                    throw new Error("Big Big errors, Try later!!!")
                }

                res.setHeader('token', token).status(200).send({
                    status: true,
                    message: "Successfully logged in"
                })
            }
            
            
        )

.catch (err => {

        res.status(400).send({
            status: false,
            message: err.message || "Something went wrong"  
            })
        })  
    
    
    }    

module.exports ={ Login}