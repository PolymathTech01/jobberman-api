
const { reject } = require('bcrypt/promises')
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

const forgetPasswordModel = async (email, hash) => {
    return new Promise ((resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `insert into forget_Password(email, hash)values(?,?) `,
                values:[email, hash]
            },
            (err,results,fields) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
          })
    })
}

const updatePassword = async (password, email) => {
    return new Promise ((resolve, reject) => {
        mysqlConnection.query (
            {
                sql:`update users set password=? where email=? `,
                values:[password, email]
            },
            (err, results,fields) => {
                if (err){
                    reject(err);
                }
                resolve(results);
            })
        })
}

const validateHash = async (hash, email) => {
    return new Promise((reject, resolve) => {
        mysqlConnection.query (
            {
                sql:`select * from forget_Password where email=?`,
                values:[hash]
            },
            (err, results, fields) => {
                if (err){
                    reject(err)
                }
                resolve(results)
            })
    })

}

const deletePasswordResetRecord = async (password, email) => {
    return new Promise ((resolve, reject) =>{
        mysqlConnection.query(
            {
            sql:`delete from forget_password where email=?`,
            values: [passsword]
            },
            (err, results, fields) => {
                if (err){
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
    forgetPasswordModel,
    updatePassword,
    validateHash
}