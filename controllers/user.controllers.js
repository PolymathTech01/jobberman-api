const { newJobSeeker, checkUser } = require("../models/user.models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { asyncErrorHandler, isEmpty } = require("../utils/utils");
const saltRounds = 10;
const hashMyPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve([salt, hash]);
      });
    });
  });
};

const createJobSeeker = async (req, res) => {
  const JobSeekerValidation = Joi.object({
    firstname: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string(),
    DateOfBirth: Joi.date().required(),
    password: Joi.string().required(),
    Nationality: Joi.string().required(),
    location: Joi.string().required(),
    CountryCode: Joi.string().required(),
    phone: Joi.string().required(),
    HighestQualification: Joi.string().valid(
      "BSC",
      "OND",
      "SSCE",
      "MSC",
      "PhD"
    ),
    CurrentJobFunction: Joi.string().required(),
    YearsExperience: Joi.number().required(),
    Availability: Joi.string().required(),
    SubscribeForAds: Joi.boolean(),
    category: Joi.string().valid("Software", "Accounting", "Medicine"),
  });
  const responseJobSeekerValidation = JobSeekerValidation.validate(req.body);
  console.log(JobSeekerValidation)
  if (responseJobSeekerValidation.error) {
    res.status(422).send({
      status: false,
      message: responseJobSeekerValidation.error.details[0].message
    });
  } else {
    const {
      firstname,
      surname,
      email,
      password,
      DateOfBirth,
      gender,
      Nationality,
      location,
      CountryCode,
      phone,
      HighestQualification,
      CurrentJobFunction,
      YearsExperience,
      Availability,
      SubscribeForAds,
      category,
    } = req.body;
    const passwordHashed = await hashMyPassword(password);
    const job_seeker_id = uuidv4();
    checkUser(email, job_seeker_id)
      .then((checkUserResult) => {
        if (checkUserResult != "") {
          throw new Error("Customer exist");
        }
        //console.log("got here 1");
        return newJobSeeker(
          job_seeker_id,
          firstname,
          surname,
          email,
          passwordHashed[1],
          DateOfBirth,
          gender,
          Nationality,
          location,
          CountryCode,
          phone,
          HighestQualification,
          CurrentJobFunction,
          YearsExperience,
          Availability,
          SubscribeForAds,
          category
        );
      })
      .then((newUserResult) => {
        console.log("new user", newUserResult);
        if (newUserResult) {
          res.status(200).send({
            status: true,
            message: "customer created successfully",
          });
        }
      })

      .catch((error) => {
        res.status(422).send({
          status: false,
          message: error.message,
        });
      });
  }
};

// const createJobSeeker = async(req, res) => {
//     const {firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category} = req.body
//     const job_seeker_id = uuidv4()
//     try{
//         const [err, checkIfUserExists] = await asyncErrorHandler(checkUser(email, job_seeker_id))
//         if(err)
//         {
//             console.log("error, ", err)
//             throw new Error("Try again please,this is on us, something happened")
//         }
//         if (!isEmpty(checkIfUserExists)) {
//             console.log("here: ", checkIfUserExists)
//             throw new Error("User with Email/Phone exists")
//         }
//         const passwordHashed = await hashMyPassword(password)
//         const [error, responseNewUser] = await asyncErrorHandler(newUser(job_seeker_id,firstname, lastname, email, passwordHashed[1], DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category))
//         if(error){
//             throw new Error(error)
//         }

//         res.status(200).send({
//             status: true,
//             message: "customer successfully created",
//             data: []
//         })
//     }catch(e){
//         return res.status(400).send({
//              status: false,
//              message: e.message || "It has happened."

//          })
//      }

// }
module.exports = {
  createJobSeeker,
};
