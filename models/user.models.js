const mysqlConnection = require("../config/mysql")


const newJobSeeker = async(job_seeker_id, firstname, surname, email, password, DateOfBirth, gender, Nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availability, SubscribeForAds, category) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into job_seeker(job_seeker_id, firstname, surname, email, passwordHash, DateOfBirth, gender, Nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availability, SubscribeForAds, category)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            values: [job_seeker_id, firstname, surname, email, password, DateOfBirth, gender, Nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availability, SubscribeForAds, category]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}


const checkUser = async(email, job_seeker_id) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where email=? or job_seeker_id=?`,
            values: [email, job_seeker_id]
        },
        (err, results, fields)=>{
            if (err){reject(err)}
            resolve(results)
        })
    })
}


const getUSerDetailsByEmail_JobSeeker = async (email) =>{
    return new Promise ((resolve, reject) =>{
        mysqlConnection.query({
            sql: `select * from job_seeker where email=?`,
            values: [email]
        },
          (err, results, fields) => {
              if(err) {
                reject(err)
              }
              resolve(results)
          })
    })
}


const getUserDetailsByEmail_Employer = async (email) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from Employer where email=?`,
            values: [email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


const getUserDetailsByEmail_Admin = async (email) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from Admin where email=?`,
            values: [email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}





module.exports = {
    checkUser,
    newJobSeeker,
    getUSerDetailsByEmail_JobSeeker,
    getUserDetailsByEmail_Employer,
    getUserDetailsByEmail_Admin,
}