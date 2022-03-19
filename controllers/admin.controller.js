const {
    
    checkAdmin,
    newAdmin,
   
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
    } else {
      const {
        firstname, lastname, email, password ,DateOfBirth, gender, nationality, location, CountryCode,  phone
      } = req.body;
      const passwordHashed = await hashMyPassword(password);
      const admin_id = uuidv4();
      checkAdmin(email, admin_id)
        .then((checkAdminResult) => {
          if (checkAdminResult != "") {
            throw new Error("Admin exist, please sign in");
          }
          //console.log("got here 1");
          return newAdmin(
            admin_id, firstname, lastname, email,passwordHashed[1],DateOfBirth, gender, nationality, location, CountryCode,  phone
          );
        })
        // .then((AdminResult) => {
        //   console.log("new user", AdminResult);
        //   if (AdminResult) {
        //     const adminFullname = `${firstname} ${lastname}`;
        //     const dataReplacement = {
        //       fullname: adminFullname,
        //       otp: generateOTP(),
        //     };
        //     return emailServies.readFileAndSendEmail(
        //       email,
        //       "OTP VERIFICATION",
        //       dataReplacement,
        //       "otp"
        //     );
        //   }
        // })
        .then((AdminResult) => {
          if (AdminResult) {
            res.status(200).send({
              status: true,
              message: "Admin created successfully"
            });
          }
        })
  
        // .then(() => {
        //   const userFullname = `${firstname} ${lastname}`
        //   const dataReplacement = {
        //     "fullname": userFullname,
        //   }
        //   emailServies.readFileAndSendEmail(email, "OTP VERIFICATION", dataReplacement, 'otp')
        // })
  
        .catch((error) => {
          res.status(422).send({
            status: false,
            message: error.message,
          });
        });
    }
  };

  
module.exports = {
    createAdmin
}