const {
    
    newAdmin,
    checkAdmin,
    deleteOtpById,
    getOtpAdmin,
    updateOtpStatus,
    insertOtpAdmin,
    getAdminDetailsByEmail,
    checkAdminById

  } = require("../models/admin.models");
  const Joi = require("joi");
  const { v4: uuidv4 } = require("uuid");
  const emailServies = require("../services/email.services");
  const { hashMyPassword, generateOTP } = require("../shared/shared")
  
  

  const createAdmin = async (req, res) => {
    const AdminValidation = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      DateOfBirth: Joi.date().required(),
      gender: Joi.string(),
      nationality: Joi.string().required(),
      location: Joi.string().required(),
      CountryCode: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const responseAdminValidation = AdminValidation.validate(req.body);
    if (responseAdminValidation.error) {
      res.status(422).send({
        status: false,
        message: responseAdminValidation.error.details[0].message,
      });
    } 
      const {
        firstname, lastname, email, password ,DateOfBirth, gender, nationality, location, CountryCode,  phone
      } = req.body;
      const admin_id = uuidv4()
      const passwordHashed = await hashMyPassword(password);
      const otp = generateOTP()
      try{
        console.log("i got here")
        const checkAdminResult =  await checkAdmin(email)
        console.log("result", checkAdminResult)
        if (checkAdminResult != "") {
          throw new Error("Admin exist, please sign in");
        }
        //console.log("got here 1");
          await newAdmin(
            admin_id, firstname, lastname, email,passwordHashed[1], DateOfBirth, gender, nationality, location, CountryCode, phone)
          
          

        const adminOtpResult = await insertOtpAdmin(admin_id, otp)
        console.log("admin otp result => ", adminOtpResult)
        if (adminOtpResult){
          const userFullname = `${firstname} ${lastname}`
          const dataReplacement = {
            fullname: userFullname,
            otp: otp
          }
          await emailServies.readFileAndSendEmail(email, "OTP VERIFICATION", dataReplacement, 'otp')
          res.status(200).send({
            status: true,
            message: "Admin created successfully Please check your mail and verify your OTP"
          });
        }
    }
  catch(err){
    res.status(422).send({
      status: false,
      message: err.message
  })
}
}


const verifyOtp = async (req, res) => {
  const { admin_id, otp } = req.params

try{
  const responseGetOtp = await getOtpAdmin(admin_id, otp)
  if (responseGetOtp === ""){
    res.status(400).send({
      status: false,
      message: "Invalid otp"
    })
  }

  const elapsedTime = Date.now() - responseGetOtp[0].createdAt
  if((Math.floor(elapsedTime / 60000) > 1000)){
    throw new Error("Otp Expired")
  }
  await deleteOtpById(admin_id)
  await updateOtpStatus(admin_id)

  const employerDetails = await checkAdminById(admin_id)
  const firstname = employerDetails[0].firstname
  const lastname = employerDetails[0].lastname
  const email = employerDetails[0].email
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
  const {  email } = req.params
  const otp = generateOTP()

  try{
    const adminDetails = await getAdminDetailsByEmail(email)
    const fullname = `${adminDetails[0].firstname} ${adminDetails[0].lastname}`
    const dataReplacement = {
      fullname: fullname
    }
    await deleteOtpById(adminDetails[0].admin_id)
    await insertOtpAdmin(adminDetails[0].admin, otp)
    await emailServies.readFileAndSendEmail(email, "OTP VERIFICATION", dataReplacement, 'otp')
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
    createAdmin,
    verifyOtp,
    resendOtp
}
