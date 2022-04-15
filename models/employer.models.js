const mysqlConnection = require("../config/mysql")


const newEmployer = async(employeer_id, firstname, lastname, gender, work_email,passwordHash,CountryCode,  PositionInCompany, website, ContactPerson, WhereDoYouHearAboutUs) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into Employer(employeer_id, firstname, lastname, gender, work_email,passwordHash,CountryCode,  PositionInCompany, website, ContactPerson, WhereDoYouHearAboutUs)values(?,?,?,?,?,?,?,?,?,?,?)`,
            values: [employeer_id, firstname, lastname, gender, work_email,passwordHash,CountryCode,  PositionInCompany, website, ContactPerson, WhereDoYouHearAboutUs]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}

const checkEmployeer = async(work_email, employeer_id) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from Employer where work_email=? or employeer_id=?`,
            values: [work_email, employeer_id]
        },
        (err, results, fields)=>{
            if (err){reject(err)}
            resolve(results)
        })
    })
}

const checkEmployerById = async(employeer_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from Employer where employeer_id=?`,
            values: employeer_id
        },
        (err, results, fields)=>{
            if(err) {reject(err)}
            resolve(results)
        })
    })
}
const getEmployerDetailsByEmail = async(work_email)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from Employer where work_email=?`,
            values: work_email
        },
        (err, results, fields)=>{
            if (err)reject(err)
            resolve(results)
        })
    })
}

const insertOtpEmployer = async (employeer_id, otp) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into otp_employer(employeer_id, otp)values(?,?)`,
            values: [employeer_id, otp]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}
const getOtpEmployer = async (employeer_id, otp)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from otp_employer where employeer_id=? and otp=?`,
            values:[employeer_id, otp]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        })
    })
}
const deleteOtpById = async (employeer_id) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `delete from otp_employer where employeer_id=?`,
            values: employeer_id
        },
        (err, results, fields)=>{
            if (err)reject(err)
            resolve(results)
        })
    })
}

const updateOtpStatus = async (employeer_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `update Employer set isOtpVerified=? where employeer_id=?`,
            values:[1, employeer_id]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}
module.exports = {
    newEmployer,
    checkEmployeer,
    checkEmployerById,
    getEmployerDetailsByEmail,
    insertOtpEmployer,
    getOtpEmployer,
    updateOtpStatus,
    deleteOtpById
    
}
