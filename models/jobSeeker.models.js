const mysqlConnection = require("../config/mysql")


const newJobSeeker = async(job_seeker_id, firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into job_seeker(job_seeker_id, firstname, lastname, email, passwordHash, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            values: [job_seeker_id, firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}

const checkJobSeeker = async(email, job_seeker_id) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where email=? or job_seeker_id=?`,
            values: [email, job_seeker_id]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}
const checkJobSeekerById = async(job_seeker_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where job_seeker_id=?`,
            values: [job_seeker_id]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}
const getJobSeekerDetailsByEmail = async(email)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where email=?`,
            values: email
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}

const insertOtpJobSeeker = async (job_seeker_id, otp) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into otp_job_seeker(job_seeker_id, otp)values(?,?)`,
            values: [job_seeker_id, otp]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}

const getOtp = async (job_seeker_id, otp)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from otp_job_seeker where job_seeker_id=? and otp=?`,
            values:[job_seeker_id, otp]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}
const deleteOtpById = async (job_seeker_id) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `delete from otp_job_seeker where job_seeker_id=?`,
            values: job_seeker_id
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}

const updateOtpStatus = async (job_seeker_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `update job_seeker set isOtpVerified=? where job_seeker_id=?`,
            values:[1, job_seeker_id]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}



module.exports = {
    checkJobSeeker,
    newJobSeeker,
    insertOtpJobSeeker,
    getJobSeekerDetailsByEmail,
    deleteOtpById,
    getOtp,
    updateOtpStatus,
    checkJobSeekerById

}