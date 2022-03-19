const {
    
    checkEmployeer,
    newEmployer,
   
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
  
          const response = newEmployer(
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
          console.log("response", response);
          return response;
        })
        .then((resultNewEmployer) => {
          console.log("new employeer", resultNewEmployer);
          if (resultNewEmployer) {
            res.status(200).send({
              status: true,
              message: "Employer created successfully",
            });
          }
        })
        .catch((err) => {
          res.status(422).send({
            status: false,
            message: err.message,
          });
        });
    }
  };

  module.exports = {
    createEmployer  
  }