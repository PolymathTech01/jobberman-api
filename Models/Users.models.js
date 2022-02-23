
const mysqlConnection = require('../config/mysql')

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
    getUSerDetailsByEmail_JobSeeker,
    getUserDetailsByEmail_Employer,
    getUserDetailsByEmail_Admin,
    
}