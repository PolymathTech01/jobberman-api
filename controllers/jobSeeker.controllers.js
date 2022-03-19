const {
  newJobSeeker,
  checkUser,
  checkEmployeer,
  newEmployer,
  newAdmin,
  checkAdmin,
  insertOtpJobSeeker,
  getOtp,
  deleteOtpById,
  updateOtpStatus,
  checkUserById
} = require("../models/jobSeeker.models");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
// const { doSomeAsyncMagik, isEmpty } = require("../utils/utils"
const emailServies = require("../services/email.services");
const { hashMyPassword, generateOTP } = require("../shared/shared")



const createJobSeeker = async (req, res) => {
  const JobSeekerValidation = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string(),
    DateOfBirth: Joi.date().required(),
    password: Joi.string().required(),
    nationality: Joi.string().required(),
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
    Availabity: Joi.string().required(),
    SubscribeForAds: Joi.boolean(),
    category: Joi.string().valid("Software", "Accounting", "Medicine"),
  });
  const otp = generateOTP()
  const responseJobSeekerValidation = JobSeekerValidation.validate(req.body);
  if (responseJobSeekerValidation.error) {
    res.status(422).send({
      status: false,
      message: responseJobSeekerValidation.error.details[0].message,
    });
  } else {
    const {
      firstname,
      lastname,
      email,
      password,
      DateOfBirth,
      gender,
      nationality,
      location,
      CountryCode,
      phone,
      HighestQualification,
      CurrentJobFunction,
      YearsExperience,
      Availabity,
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
          lastname,
          email,
          passwordHashed[1],
          DateOfBirth,
          gender,
          nationality,
          location,
          CountryCode,
          phone,
          HighestQualification,
          CurrentJobFunction,
          YearsExperience,
          Availabity,
          SubscribeForAds,
          category
        );
      })
      .then(newUserResult =>{
        return insertOtpJobSeeker(job_seeker_id, otp)
      })
      .then((otpResult) => {
        console.log("new user", otpResult);
        if (otpResult) {
          const userFullname = `${firstname} ${lastname}`;
          const dataReplacement = {
            fullname: userFullname,
            otp: otp,
          };
          return emailServies.readFileAndSendEmail(
            email,
            "OTP VERIFICATION",
            dataReplacement,
            "otp"
          );
        }
      })
      .then((sentEmail) => {
        
          res.status(200).send({
            status: true,
            message: "customer created successfully"
          });
      
      })

      .then(() => {
       
        const userFullname = `${firstname} ${lastname}`
        const dataReplacement = {
          "fullname": userFullname,
        }
        emailServies.readFileAndSendEmail(email, "OTP VERIFICATION", dataReplacement, 'otp')
      })

      .catch((error) => {
        res.status(422).send({
          status: false,
          message: error.message,
        });
      });
  }
};

const verifyOtp = (req, res) =>{
  const {job_seeker_id, otp } = req.params   


  getOtp(job_seeker_id, otp)
  .then(otpResult =>{ 
    if (otpResult === ""){
      res.status(400).send({
        status:false,
        message: "otp mismatch"
      })
    }
    // console.log("date", new Date())
    // console.log("created ", otpResult)
    const elapsedTime = Date.now() - otpResult[0].created_at
    if ((Math.floor(elapsedTime/ 60000) >
    1000)){
      throw new Error("Otp Expired")
    }
    deleteOtpById(job_seeker_id)
    updateOtpStatus(job_seeker_id)
  })
  .then(()=>{
    return checkUserById(job_seeker_id)
  })
  .then(responseCheckUser=>{
    
   
    const firstname = responseCheckUser[0].firstname
    const lastname = responseCheckUser[0].lastname
    const email = responseCheckUser[0].email
    const name = `${firstname} ${lastname}`
    const dataToUpdate ={
      "fullname": name
    }
    emailServies.readFileAndSendEmail(email, "WELOME ON BOARD", dataToUpdate, 'welcome')

    res.status(200).send({
      status: true,
      message: "OTP verification successfull, you can now log in"
    })
  })
  .catch(err =>{
    res.status(400).send({
      status:false,
      message: err.message
    })
  })
}

// const createEmployer = async(req, res) => {
//     const {firstname, lastname, work_email, gender, password, CountryCode, PositionInCompany, website, WhereDoYouHearAboutUs, ContactPerson } = req.body
//     const employeer_id = uuidv4()
//     try{
//         const [err, checkEmployeerResult] = await doSomeAsyncMagik(checkEmployeer(work_email, employeer_id))
//         if(err)
//         {
//             console.log("error, ", err)
//             throw new Error("Try again please,this is on us, something happened")
//         }
//         if (!isEmpty(checkEmployeerResult)) {
//             console.log("here: ", checkEmployeerResult)
//             throw new Error("User with Email/Phone exists")
//         }
//         const passwordHashed = await hashMyPassword(password)
//         const [error, responseNewUser] = await doSomeAsyncMagik(newEmployer(employeer_id, firstname, lastname, passwordHashed[1], work_email, gender, PositionInCompany, website, CountryCode, WhereDoYouHearAboutUs, ContactPerson))
//         console.log("resposne from new user", responseNewUser)
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
  verifyOtp
};
