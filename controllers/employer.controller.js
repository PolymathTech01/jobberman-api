const { 
  newEmployer,
  checkEmployeer,
  checkEmployerById,
  getEmployerDetailsByEmail,
  insertOtpEmployer,
  getOtpEmployer,
  updateOtpStatus,
  deleteOtpById
  } = require("../models/employer.models");
  const Joi = require("joi");
  const { v4: uuidv4 } = require("uuid");
  const emailServies = require("../services/email.services");
  const { hashMyPassword, generateOTP } = require("../shared/shared")
  
  
  


const createEmployer = async (req, res) => {
    const employeer_schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      work_email: Joi.string().email().required(),
      gender: Joi.string(),
      password: Joi.string().required(),
      CountryCode: Joi.string().required(),
      PositionInCompany: Joi.string().valid("CEO", "HR").required(),
      website: Joi.string().required(),
      WhereDoYouHearAboutUs: Joi.string()
        .valid("Facebook", "Whatsapp", "Twitter", "Intagram")
        .required(),
      ContactPerson: Joi.string().required(),
    });
    const otp = generateOTP()
    responseEmployerValidation = employeer_schema.validate(req.body);
    if (responseEmployerValidation.error) {
      res.status(422).send({
        status: false,
        message: responseEmployerValidation.error.details[0].message,
      });
    } else {
      const {
        firstname,
        lastname,
        work_email,
        gender,
        password,
        CountryCode,
        PositionInCompany,
        website,
        WhereDoYouHearAboutUs,
        ContactPerson,
      } = req.body;
  
      const passwordHashed = await hashMyPassword(password);
      const employeer_id = uuidv4();
      checkEmployeer(work_email, employeer_id)
        .then((checkEmployeerResult) => {
          if (checkEmployeerResult != "") {
            throw new Error("Employer Exists, please sign in");
          }
  
          return newEmployer(
            employeer_id,
            firstname,
            lastname,
            gender,
            work_email,
            passwordHashed[1],
            CountryCode,
            PositionInCompany,
            website,
            ContactPerson,
            WhereDoYouHearAboutUs
          );
          // console.log("response", response);
          // return response;
        })
        .then(()=>{
          return insertOtpEmployer(employeer_id, otp)
        })
        .then(otpResult  =>{
          console.log("otpResult is: ", otpResult)
          if (otpResult){
            const userFullname = `${firstname} ${lastname}`
            const dataReplacement = {
              fullname: userFullname,
              otp: otp
            }
            return emailServies.readFileAndSendEmail(work_email, "OTP VERIFICATION", dataReplacement, 'otp')
          }
        })
        .then(() => {
  
          
            res.status(200).send({
              status: true,
              message: "Employer created successfully Please check your mail and verify your OTP",
            });
          
        })
       
        .catch((err) => {
          res.status(422).send({
            status: false,
            message: err.message,
          });
        });
    }
  };

  const verifyOtp = async (req, res) => {
    const { employeer_id, otp } = req.params

  try{
    const responseGetOtp = await getOtpEmployer(employeer_id, otp)
    if (responseGetOtp === ""){
      res.status(400).send({
        status: false,
        message: "Invalid otp"
      })
    }

    const elapsedTime = Date.now() - responseGetOtp[0].created_at
    if((Math.floor(elapsedTime / 60000) > 1000)){
      throw new Error("Otp Expired")
    }
    await deleteOtpById(employeer_id)
    await updateOtpStatus(employeer_id)

    const employerDetails = await checkEmployerById(employeer_id)
    const firstname = employerDetails[0].firstname
    const lastname = employerDetails[0].lastname
    const email = employerDetails[0].work_email
    const name = `${firstname} ${lastname}`
    const dataToUpdate = {
      fullname: name
    }
    await emailServies.readFileAndSendEmail(email, "WELOME ON BOARD", dataToUpdate, 'welcome')

    res.status(200).send({
      status: true,
      message: "OTP verification successfull, you can now log in"
    })

  }
  catch(error) {
    res.status(400).send({
      status:false,
      message: error.message
    })
  }

  }

  const resendOtp = async (req, res) => {
    const {  work_email } = req.params
    const otp = generateOTP()

    try{
      const employerDetails = await getEmployerDetailsByEmail(work_email)
      const fullname = `${employerDetails[0].firstname} ${employerDetails[0].lastname}`
      const dataReplacement = {
        fullname: fullname
      }
      await deleteOtpById(employerDetails[0].employeer_id)
      await insertOtpEmployer(employerDetails[0].employeer_id, otp)
      await emailServies.readFileAndSendEmail(work_email, "OTP VERIFICATION", dataReplacement, 'otp')
      res.status(200).send({
        status: true,
        message: "Otp sent successfully pls check your mail"
      }) 
    }catch(error){
      res.status(400).send({
        status: false,
        message: error.message
    })
  }
}

  module.exports = {
    createEmployer,
    verifyOtp,
    resendOtp
  
  }