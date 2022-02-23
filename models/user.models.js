const mysqlConnection = require("../config/mysql")


const newJobSeeker = async(job_seeker_id, firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into job_seeker(job_seeker_id, firstname, lastname, email, passwordHash, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            values: [job_seeker_id, firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category]
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

module.exports = {
    checkUser,
    newJobSeeker
}